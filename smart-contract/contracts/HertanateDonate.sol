// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";

contract HertanateDonate is ERC2771Context {
    using SafeERC20 for IERC20;

    address payable[] public owners;
    uint8 public fee = 5; // 5% fee
    address private _trustedForwarder;

    struct CreatorDetail {
        string image;
        string name;
        string bio;
        string socials;
    }

    struct Creator {
        string username;
        CreatorDetail detail;
        uint256 totalReceived;
        bool isActive;
    }

    mapping(address => Creator) public creators;
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
    event TrustedForwarderChanged(address oldForwader, address newForwarder);

    event DonationSent(
        address indexed from,
        address indexed creator,
        uint256 amount,
        uint256 feeAmount,
        string message,
        uint256 timestamp
    );

    event AllowedTokenAdded(address token);

    modifier onlyOwner() {
        require(_msgSender() == owners[0], "Only owner");
        _;
    }

    /**
     * @notice Initializes the HertanateDonate contract
     * @param initialForwarder Address of the trusted forwarder for meta-transactions
     * @param _initialAllowedTokens List of ERC20 token addresses initially allowed for donations
     * @param _initialOwners List of owner addresses who will receive fee shares
     */
    constructor(
        address initialForwarder,
        address[] memory _initialAllowedTokens,
        address[] memory _initialOwners
    ) ERC2771Context(initialForwarder) {
        require(_initialOwners.length > 0, "At least one owner");

        // set first inital trustedForwarder
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

    // managements Creators
    /**
     * @notice Registers a new content creator
     * @param _username Unique username for the creator
     * @param _name Display name of the creator
     * @param _image URL to creator's profile image
     * @param _bio Short biography of the creator
     * @param _socials Social media links of the creator
     */
    function signupCreator(
        string calldata _username,
        string calldata _name,
        string calldata _image,
        string calldata _bio,
        string calldata _socials
    ) external {
        require(bytes(_username).length > 0, "Username cannot be empty");
        require(!creators[_msgSender()].isActive, "Already registered");
        require(!usernames[_username], "Username taken");

        creators[_msgSender()] = Creator({
            username: _username,
            detail: CreatorDetail({
                image: _image,
                name: _name,
                bio: _bio,
                socials: _socials
            }),
            totalReceived: 0,
            isActive: true
        });

        usernames[_username] = true;
        emit CreatorRegistered(_msgSender(), _username);
    }

    /**
     * @notice Donates to a registered creator
     * @param _creator Address of the creator to donate to
     * @param _amount Amount to donate (in token units)
     * @param _token Address of ERC20 token to use for donation
     * @param _message Optional message to include with donation
     * @dev Takes a fee percentage from donation and distributes to owners
     */
    function donateToCreator(
        address _creator,
        uint256 _amount,
        address _token,
        string calldata _message
    ) external payable {
        require(creators[_creator].isActive, "Creator not found");
        require(_amount > 0, "Amount must be positive");
        require(allowedTokens[_token], "Token not supported");

        // get ERC20 instance token
        IERC20 token = IERC20(_token);

        // Transfer all amount to contract
        token.safeTransferFrom(_msgSender(), address(this), _amount);

        // Calculate fee & split
        uint256 feeAmount = (_amount * fee) / 100;
        uint256 creatorAmount = _amount - feeAmount;

        // Transfer to creator
        token.safeTransfer(_creator, creatorAmount);

        // Distribute fee to owners
        uint256 share = feeAmount / owners.length;
        uint256 remainder = feeAmount % owners.length;

        for (uint i = 0; i < owners.length; i++) {
            uint256 amount = i == 0 ? share + remainder : share;
            token.safeTransfer(owners[i], amount);
        }

        // Add totalRecieved creator
        creators[_creator].totalReceived += creatorAmount;

        emit DonationSent(
            _msgSender(),
            _creator,
            _amount,
            feeAmount,
            _message,
            block.timestamp
        );
    }

    /**
     * @notice Gets creator profile information
     * @param _creator Address of the creator to query
     * @return username Creator's username
     * @return name Creator's display name
     * @return bio Creator's biography
     * @return socials Creator's social media links
     * @return totalReceived Total amount received by creator (after fees)
     */
    function getCreator(
        address _creator
    )
        external
        view
        returns (
            string memory username,
            string memory name,
            string memory bio,
            string memory socials,
            uint256 totalReceived
        )
    {
        require(creators[_creator].isActive, "Creator not found");
        Creator storage c = creators[_creator];
        return (
            c.username,
            c.detail.name,
            c.detail.bio,
            c.detail.socials,
            c.totalReceived
        );
    }

    /**
     * @notice Updates creator profile information
     * @param _name New display name
     * @param _image New profile image URL
     * @param _bio New biography
     * @param _socials New social media links
     */
    function editCreatorProfile(
        string calldata _name,
        string calldata _image,
        string calldata _bio,
        string calldata _socials
    ) external {
        require(creators[_msgSender()].isActive, "Not registered as creator");

        Creator storage creator = creators[_msgSender()];
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
     * @notice Changes a creator's username
     * @param _newUsername New unique username
     * @dev Frees up the old username for others to use
     */
    function changeUsername(string calldata _newUsername) external {
        require(bytes(_newUsername).length > 0, "Username cannot be empty");
        require(creators[_msgSender()].isActive, "Not registered as creator");
        require(!usernames[_newUsername], "Username already taken");

        // Remove old username
        string memory oldUsername = creators[_msgSender()].username;
        usernames[oldUsername] = false;

        // Set new username
        creators[_msgSender()].username = _newUsername;
        usernames[_newUsername] = true;

        emit UsernameChanged(
            _msgSender(),
            oldUsername,
            _newUsername,
            block.timestamp
        );
    }

    // managments contracts
    /**
     * @notice Adds a new ERC20 token to allowed donation tokens list
     * @param _token Address of ERC20 token to allow
     * @dev Only callable by owner
     */
    function addAllowedToken(address _token) external {
        require(_msgSender() == owners[0], "Only owner can add token");
        require(_token != address(0), "Invalid address");
        allowedTokens[_token] = true;

        emit AllowedTokenAdded(_token);
    }

    /**
     * @notice Updates the platform fee percentage
     * @param _newFee New fee percentage (1-99)
     * @dev Only callable by owner
     */
    function setFee(uint8 _newFee) external onlyOwner {
        require(_newFee > 0 && _newFee < 100, "Invalid fee range");
        uint8 oldFee = fee;
        fee = _newFee;

        emit FeeChanged(oldFee, _newFee);
    }

    /**
     * @notice Updates the trusted forwarder address for meta-transactions
     * @param newForwarder Address of new trusted forwarder
     * @dev Only callable by owner
     */
    function setTrustedForwarder(address newForwarder) external onlyOwner {
        require(newForwarder != address(0), "Invalid address");
        address oldForwarder = _trustedForwarder;
        _trustedForwarder = newForwarder;

        emit TrustedForwarderChanged(oldForwarder, newForwarder);
    }

    // just overwrite
    /**
     * @notice Checks if an address is the trusted forwarder
     * @param forwarder Address to check
     * @return bool True if address is trusted forwarder
     */
    function isTrustedForwarder(
        address forwarder
    ) public view override returns (bool) {
        return forwarder == _trustedForwarder;
    }

    /**
     * @notice Gets the message sender (supports meta-transactions)
     * @return address Real sender of the transaction
     * @dev Overrides ERC2771Context._msgSender()
     */
    function _msgSender() internal view override returns (address) {
        return ERC2771Context._msgSender();
    }

    /**
     * @notice Gets the message data (supports meta-transactions)
     * @return bytes calldata Original msg.data
     * @dev Overrides ERC2771Context._msgData()
     */
    function _msgData() internal view override returns (bytes calldata) {
        return ERC2771Context._msgData();
    }
}
