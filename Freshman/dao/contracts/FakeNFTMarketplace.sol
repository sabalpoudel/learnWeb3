// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

contract FakeNFTMarketplace {
    mapping(uint256 => address) public tokens; // mapping Fake TokenID to Owner addresses

    uint256 nftPrice = 0.001 ether; //  purchase price for each Fake NFT

    /// @dev purchase() accepts ETH and marks the owner of the given tokenId as the caller address
    /// @param _tokenId - the fake NFT token Id to purchase
    function purchase(uint256 _tokenId) external payable {
        require(msg.value == nftPrice, "This NFT costs 0.001 ether");
        tokens[_tokenId] = msg.sender;
    }

    // returns the price of one NFT
    function getPrice() external view returns (uint256) {
        return nftPrice;
    }

    /// @dev available() checks whether the given tokenId has already been sold or not
    /// @param _tokenId - the tokenId to check for
    function available(uint256 _tokenId) external view returns (bool) {
        if (tokens[_tokenId] == address(0)) {
            return true;
        }
        return false;
    }
}
