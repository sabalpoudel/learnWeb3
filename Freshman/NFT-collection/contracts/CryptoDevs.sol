// SPDX-License-Identefier : MIT
// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Whitelist.sol";

contract CryptoDevs is ERC721Enumerable, Ownable {
    uint256 public constant _price = 0.0001 ether;

    uint256 public constant maxTokenIds = 20;

    WhiteList wl;

    uint256 public reservedTokens;
    uint256 public reservedTokensClaimed = 0;

    constructor(address wlContract) ERC721("Crypto Devs", "CD") {
        wl = WhiteList(wlContract);
        reservedTokens = wl.maxWLAddresses();
    }

    function mint() public payable {
        // Make sure we always leave enough room for whitelist reservations
        require(
            totalSupply() + reservedTokens - reservedTokensClaimed <
                maxTokenIds,
            "EXCEEDED MAX SUPPLY"
        );

        if (wl.wLAddresses(msg.sender) && msg.value < _price) {
            require(balanceOf(msg.sender) == 0, "Already Owned");
            reservedTokensClaimed += 1;
        } else {
            require(msg.value >= _price, "NOT ENOUGH ETHER");
        }

        uint256 tokenId = totalSupply();
        _safeMint(msg.sender, tokenId());
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
