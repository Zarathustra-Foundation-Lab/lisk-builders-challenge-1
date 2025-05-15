// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract HertanateContract is ERC2771Context {
    using SafeERC20 for IERC20;

    address payable[] public owners;
    uint8 public fee = 5;
    address private _trustedForwarder;

    struct CreatorDetail {
        string image;
        string name;
        string bio;
        string socials;
    }

    struct Creator {
        address creatorAddress;
        string username;
        CreatorDetail detail;
        uint256 totalReceived;
        bool isActive;
    }

    mapping(string => Creator) private creatorsByUsername;
    mapping(address => string) private usernameByAddress;
    mapping(string => bool) public usernames;
    mapping(address => bool) public allowedTokens;

    event CreatorRegistered(address indexed creator, string username);
    event CreatorProfileUpdated(
        address indexed creator,
        string name,
        string image,
        string bio,
        string socials,
        uint256 timestamp
    );
    event UsernameChanged(
        address indexed creator,
        string oldUsername,
        string newUsername,
        uint256 timestamp
    );
    event FeeChanged(uint8 oldFee, uint8 newFee);
    event TrustedForwarderChanged(address oldForwarder, address newForwarder);
    event DonationSent(
        address indexed from,
        address indexed creator,
        address indexed token,
        uint256 amount,
        uint256 feeAmount,
        string message,
        uint256 timestamp
    );
    event AllowedTokenAdded(address token);

    modifier onlyOwner() {
        require(_msgSender() == owners[0], "Only Initial owner");
        _;
    }

    constructor(
        address initialForwarder,
        address[] memory _initialAllowedTokens,
        address[] memory _initialOwners
    ) ERC2771Context(initialForwarder) {
        require(_initialOwners.length > 0, "At least one owner");
        _trustedForwarder = initialForwarder;

        for (uint i = 0; i < _initialOwners.length; i++) {
            require(_initialOwners[i] != address(0), "Invalid owner");
            owners.push(payable(_initialOwners[i]));
        }

        for (uint i = 0; i < _initialAllowedTokens.length; i++) {
            require(_initialAllowedTokens[i] != address(0), "Invalid token");
            allowedTokens[_initialAllowedTokens[i]] = true;
        }
    }

    /**
     * @dev Allows a creator to register with their profile details
     * @param _username Unique username for the creator
     * @param _name Display name of the creator
     * @param _image URL or hash of creator's profile image
     * @param _bio Short biography of the creator
     * @param _socials Social media links or identifiers
     * Requirements:
     * - Username must not be empty
     * - Username must be unique
     * - Sender must not already be registered
     * Emits a `CreatorRegistered` event on success
     */
    function signupCreator(
        string calldata _username,
        string calldata _name,
        string calldata _image,
        string calldata _bio,
        string calldata _socials
    ) external {
        require(bytes(_username).length > 0, "Username required");
        require(!usernames[_username], "Username taken");
        require(
            bytes(usernameByAddress[_msgSender()]).length == 0,
            "Already registered"
        );

        Creator memory newCreator = Creator({
            creatorAddress: _msgSender(),
            username: _username,
            detail: CreatorDetail(_image, _name, _bio, _socials),
            totalReceived: 0,
            isActive: true
        });

        creatorsByUsername[_username] = newCreator;
        usernameByAddress[_msgSender()] = _username;
        usernames[_username] = true;

        emit CreatorRegistered(_msgSender(), _username);
    }

    /**
     * @dev Allows users to donate to a creator using supported ERC20 tokens
     * @param _creator Address of the creator receiving the donation
     * @param _amount Amount to donate (in token decimals)
     * @param _token Address of the ERC20 token used for donation
     * @param _message Optional message from donor
     * Requirements:
     * - Creator must be registered
     * - Amount must be positive
     * - Token must be in allowedTokens list
     * Emits a `DonationSent` event on success
     */
    function donateToCreator(
        address _creator,
        uint256 _amount,
        address _token,
        string calldata _message
    ) external {
        string memory username = usernameByAddress[_creator];
        require(bytes(username).length > 0, "Creator not registered");
        require(_amount > 0, "Amount must be positive");
        require(allowedTokens[_token], "Token not supported");

        IERC20 token = IERC20(_token);
        token.safeTransferFrom(_msgSender(), address(this), _amount);

        uint256 feeAmount = (_amount * fee) / 100;
        uint256 creatorAmount = _amount - feeAmount;

        token.safeTransfer(_creator, creatorAmount);

        uint256 share = feeAmount / owners.length;
        uint256 remainder = feeAmount % owners.length;

        for (uint i = 0; i < owners.length; i++) {
            uint256 amount = i == 0 ? share + remainder : share;
            token.safeTransfer(owners[i], amount);
        }

        creatorsByUsername[username].totalReceived += creatorAmount;

        emit DonationSent(
            _msgSender(),
            _creator,
            _token,
            _amount,
            feeAmount,
            _message,
            block.timestamp
        );
    }

    /**
     * @dev Returns creator details by their address
     * @param _creator Address of the creator to lookup
     * @return Creator struct containing all profile information
     * Requirements:
     * - Creator must be registered
     */
    function getCreatorByAddress(
        address _creator
    ) external view returns (Creator memory) {
        string memory username = usernameByAddress[_creator];
        require(bytes(username).length > 0, "Not a creator");
        return creatorsByUsername[username];
    }

    /**
     * @dev Returns creator details by their username
     * @param _username Username of the creator to lookup
     * @return Creator struct containing all profile information
     * Requirements:
     * - Creator must exist and be active
     */
    function getCreatorByUsername(
        string memory _username
    ) external view returns (Creator memory) {
        require(creatorsByUsername[_username].isActive, "Creator not found");
        return creatorsByUsername[_username];
    }

    /**
     * @dev Allows creators to update their profile information
     * @param _name New display name
     * @param _image New profile image URL/hash
     * @param _bio New biography text
     * @param _socials New social media links
     * Requirements:
     * - Sender must be a registered creator
     * Emits a `CreatorProfileUpdated` event on success
     */
    function editCreatorProfile(
        string calldata _name,
        string calldata _image,
        string calldata _bio,
        string calldata _socials
    ) external {
        string memory username = usernameByAddress[_msgSender()];
        require(bytes(username).length > 0, "Not registered");

        Creator storage creator = creatorsByUsername[username];
        creator.detail.name = _name;
        creator.detail.image = _image;
        creator.detail.bio = _bio;
        creator.detail.socials = _socials;

        emit CreatorProfileUpdated(
            _msgSender(),
            _name,
            _image,
            _bio,
            _socials,
            block.timestamp
        );
    }

    /**
     * @dev Allows creators to change their username
     * @param _newUsername New unique username
     * Requirements:
     * - New username must not be empty
     * - New username must be available
     * - Sender must be registered
     * Emits a `UsernameChanged` event on success
     */
    function changeUsername(string calldata _newUsername) external {
        require(bytes(_newUsername).length > 0, "Username required");
        require(!usernames[_newUsername], "Username taken");

        string memory oldUsername = usernameByAddress[_msgSender()];
        require(bytes(oldUsername).length > 0, "Not registered");

        Creator memory creator = creatorsByUsername[oldUsername];
        creator.username = _newUsername;

        creatorsByUsername[_newUsername] = creator;
        delete creatorsByUsername[oldUsername];

        usernameByAddress[_msgSender()] = _newUsername;
        usernames[oldUsername] = false;
        usernames[_newUsername] = true;

        emit UsernameChanged(
            _msgSender(),
            oldUsername,
            _newUsername,
            block.timestamp
        );
    }

    /**
     * @dev Adds a new ERC20 token to the allowed tokens list
     * @param _token Address of the ERC20 token to add
     * Requirements:
     * - Only callable by owner
     * - Token address cannot be zero
     * Emits an `AllowedTokenAdded` event on success
     */
    function addAllowedToken(address _token) external onlyOwner {
        require(_token != address(0), "Invalid token");
        allowedTokens[_token] = true;
        emit AllowedTokenAdded(_token);
    }

    /**
     * @dev Updates the platform fee percentage
     * @param _newFee New fee percentage (0-100)
     * Requirements:
     * - Only callable by owner
     * - New fee must be between 1 and 99
     * Emits a `FeeChanged` event on success
     */
    function setFee(uint8 _newFee) external onlyOwner {
        require(_newFee > 0 && _newFee < 100, "Invalid fee range");
        uint8 oldFee = fee;
        fee = _newFee;
        emit FeeChanged(oldFee, _newFee);
    }

    /**
     * @dev Updates the trusted forwarder address for meta-transactions
     * @param newForwarder Address of the new trusted forwarder
     * Requirements:
     * - Only callable by owner
     * - New forwarder cannot be zero address
     * Emits a `TrustedForwarderChanged` event on success
     */
    function setTrustedForwarder(address newForwarder) external onlyOwner {
        require(newForwarder != address(0), "Invalid address");
        address oldForwarder = _trustedForwarder;
        _trustedForwarder = newForwarder;
        emit TrustedForwarderChanged(oldForwarder, newForwarder);
    }

    /**
     * @dev Checks if an address is the trusted forwarder
     * @param forwarder Address to check
     * @return bool True if address is the trusted forwarder
     */
    function isTrustedForwarder(
        address forwarder
    ) public view override returns (bool) {
        return forwarder == _trustedForwarder;
    }

    function _msgSender() internal view override returns (address) {
        return ERC2771Context._msgSender();
    }

    function _msgData() internal view override returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
