// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    uint256 public constant _price = 0.0001 ether; //  _price is the price of one Crypto Dev NFT
    uint256 public constant maxTokenIds = 20; // Max number of CryptoDevs that can ever exist
    WhiteList whitelist; // Whitelist contract instance

    uint256 public reservedTokens; // Number of tokens reserved for whitelisted members
    uint256 public reservedTokensClaimed = 0;

    constructor(
        address whitelistContract
    ) ERC721("Crypto Devs", "CD") Ownable(msg.sender) {
        whitelist = WhiteList(whitelistContract);
        reservedTokens = whitelist.maxWLAddresses();
    }

    function mint() public payable {
        // Make sure we always leave enough room for whitelist reservations
        require(
            totalSupply() + reservedTokens - reservedTokensClaimed <
                maxTokenIds,
            "EXCEEDED_MAX_SUPPLY"
        );

        // If user is part of the whitelist, make sure there is still reserved tokens left
        if (whitelist.wLAddresses(msg.sender) && msg.value < _price) {
            // Make sure user doesn't already own an NFT
            require(balanceOf(msg.sender) == 0, "ALREADY_OWNED");
            reservedTokensClaimed += 1;
        } else {
            // If user is not part of the whitelist, make sure they have sent enough ETH
            require(msg.value >= _price, "NOT_ENOUGH_ETHER");
        }
        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId);
    }

    /**
     * @dev withdraw sends all the ether in the contract
     * to the owner of the contract
     */
    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

// NFT Contract Address: 0xb067cD84fA055197C5e164De789D92A02a515F21
