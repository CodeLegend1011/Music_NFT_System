// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicNFT is ERC721 {
    using Counters for Counters.Counter;

    struct NFT {
        string tokenURI;       // IPFS URI for metadata
        address artist;        // Address of the artist
        uint256 royaltyPercentage; // Royalty percentage for the artist
    }

    Counters.Counter private _tokenIdCounter; // Counter for token IDs
    mapping(uint256 => NFT) public nfts; // Mapping of token ID to NFT details

    event MusicNFTMinted(uint256 tokenId, address artist, string tokenURI, uint256 royaltyPercentage);

    constructor() ERC721("MusicNFT", "MNFT") {}

    /**
     * @dev Upload a new music NFT
     * @param _tokenURI The URI for the NFT's metadata
     * @param _royaltyPercentage The royalty percentage for the artist
     */
    function uploadMusicNFT(string memory _tokenURI, uint256 _royaltyPercentage) external {
        require(_royaltyPercentage <= 100, "Royalty percentage must be between 0 and 100");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId); // Mint the NFT to the artist

        // Store the NFT details
        nfts[tokenId] = NFT({
            tokenURI: _tokenURI,
            artist: msg.sender,
            royaltyPercentage: _royaltyPercentage
        });

        _tokenIdCounter.increment(); // Increment the token ID counter

        emit MusicNFTMinted(tokenId, msg.sender, _tokenURI, _royaltyPercentage);
    }

    /**
     * @dev Get details of a specific NFT by token ID
     * @param tokenId The ID of the token to retrieve
     * @return NFT struct containing the token details
     */
    function getNFTDetails(uint256 tokenId) public view returns (NFT memory) {
        return nfts[tokenId];
    }

    /**
     * @dev Override the _baseURI function to return the base URI for token metadata
     * @return string Base URI for token metadata
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }
}
