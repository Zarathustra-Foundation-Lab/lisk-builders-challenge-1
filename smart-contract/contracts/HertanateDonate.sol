// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract HertanateDonate {
    // using SafeERC20 for IERC20;
    using SafeERC20 for IERC20;

    // core
    address payable[] public owners;
    // note: untuk fee
    uint8 public fee = 5; // for 5% fee
    IERC20 public token;

    // user
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

    // Creator tracking
    mapping(address => Creator) public creators;
    mapping(string => bool) public usernames;

    event CreatorRegistered(address indexed creator, string username);
    event DonationSent(
        address indexed from,
        address indexed creator,
        uint256 amount,
        uint256 feeAmount,
        string message,
        uint256 timestamp
    );

    // constructor
    constructor(address _token, address[] memory _addingOwner) {
        require(_token != address(0), "Invalid token");

        // push the initial owner
        owners.push(payable(msg.sender));

        // push the additional owner
        for (uint i = 0; i < _addingOwner.length; i++) {
            owners.push(payable(_addingOwner[i]));
        }

        // make instance to connect IDRX token with ERC20
        token = IERC20(_token);
    }

    // Creator registration
    function signupCreator(
        string calldata _username,
        string calldata _name,
        string calldata _bio,
        string calldata _socials
    ) external {
        require(!creators[msg.sender].isActive, "Already registered");
        require(!usernames[_username], "Username taken");

        creators[msg.sender] = Creator({
            username: _username,
            detail: CreatorDetail({
                image: "",
                name: _name,
                bio: _bio,
                socials: _socials
            }),
            totalReceived: 0,
            isActive: true
        });

        usernames[_username] = true;
        emit CreatorRegistered(msg.sender, _username);
    }

    // Donation function
    function donateToCreator(
        address _creator,
        uint256 _amount,
        string calldata _message
    ) external payable {
        require(creators[_creator].isActive, "Creator not found");
        require(_amount > 0, "Amount must be positive");

        // Distribute fee and get creator amount
        (uint256 creatorAmount, uint256 feeAmount) = _distributeFee(_amount);

        // Transfer remaining to creator
        token.safeTransferFrom(msg.sender, _creator, creatorAmount);

        // Update stats
        creators[_creator].totalReceived += creatorAmount; // Track amount after fee

        // Emit event with both amounts
        emit DonationSent(
            msg.sender,
            _creator,
            creatorAmount,
            feeAmount,
            _message,
            block.timestamp
        );
    }

    // Get creator info
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

    // Internal fee distribution function
    function _distributeFee(
        uint256 _amount
    ) internal returns (uint256 _creatorAmount, uint256 _feeAmount) {
        require(fee > 0, "Fee must upper than 0");

        uint256 feeAmount = (_amount * fee) / 100;
        uint256 creatorAmount = _amount - feeAmount;

        if (feeAmount > 0) {
            uint256 feePerOwner = feeAmount / owners.length;
            uint256 remainder = feeAmount % owners.length;

            for (uint i = 0; i < owners.length; i++) {
                uint256 amount = i == 0 ? feePerOwner + remainder : feePerOwner;
                token.safeTransferFrom(msg.sender, owners[i], amount);
            }
        }
        return (creatorAmount, feeAmount);
    }

    // Function to update fee percentage
    function setFee(uint8 _newFee) external {
        require(msg.sender == owners[0], "Only owner");
        require(_newFee > 0 && _newFee < 100, "Fee too high");
        fee = _newFee;
    }
}
