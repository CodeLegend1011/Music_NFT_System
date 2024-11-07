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
        uint256 price;         // Price of the NFT
    }

    Counters.Counter private _tokenIdCounter; // Counter for token IDs
    mapping(uint256 => NFT) public nfts; // Mapping of token ID to NFT details
    mapping(address => uint256) public artistRoyalties; // Mapping of artist address to total royalties earned
    mapping(uint256 => bool) public nftSold; // Mapping to track if an NFT has been sold

    event MusicNFTMinted(uint256 tokenId, address artist, string tokenURI, uint256 royaltyPercentage, uint256 price);
    event NFTPurchased(address buyer, uint256 tokenId, uint256 price);

    constructor() ERC721("MusicNFT", "MNFT") {}

    /**
     * @dev Upload a new music NFT
     * @param _tokenURI The URI for the NFT's metadata
     * @param _royaltyPercentage The royalty percentage for the artist
     * @param _price The price of the NFT
     */
    function uploadMusicNFT(string memory _tokenURI, uint256 _royaltyPercentage, uint256 _price) external {
        require(_royaltyPercentage <= 100, "Royalty percentage must be between 0 and 100");

        uint256 tokenId = _tokenIdCounter.current();
        _mint(msg.sender, tokenId); // Mint the NFT to the artist

        // Store the NFT details
        nfts[tokenId] = NFT({
            tokenURI: _tokenURI,
            artist: msg.sender,
            royaltyPercentage: _royaltyPercentage,
            price: _price
        });

        _tokenIdCounter.increment(); // Increment the token ID counter

        emit MusicNFTMinted(tokenId, msg.sender, _tokenURI, _royaltyPercentage, _price);
    }

    /**
     * @dev Function to purchase an NFT
     * @param tokenId The token ID of the NFT being purchased
     */
    function purchaseNFT(uint256 tokenId) external payable {
        require(msg.value == nfts[tokenId].price, "Incorrect value sent");
        require(!nftSold[tokenId], "NFT already sold");

        // Transfer the payment to the artist
        address artist = nfts[tokenId].artist;
        uint256 royaltyAmount = (msg.value * nfts[tokenId].royaltyPercentage) / 100;
        uint256 artistPayment = msg.value - royaltyAmount;

        // Pay the artist and record the royalty
        payable(artist).transfer(artistPayment);
        artistRoyalties[artist] += royaltyAmount;

        // Mark the NFT as sold
        nftSold[tokenId] = true;

        // Transfer the ownership of the NFT
        _transfer(artist, msg.sender, tokenId);

        emit NFTPurchased(msg.sender, tokenId, msg.value);
    }

    /**
     * @dev Get the total number of NFTs sold
     * @return uint256 The total number of NFTs sold
     */
    function getNFTsSold() public view returns (uint256) {
        uint256 soldCount = 0;
        for (uint256 i = 0; i < _tokenIdCounter.current(); i++) {
            if (nftSold[i]) {
                soldCount++;
            }
        }
        return soldCount;
    }

    /**
     * @dev Get the total royalties earned by an artist
     * @param artist The address of the artist
     * @return uint256 The total royalties earned by the artist
     */
    function getArtistRoyalties(address artist) public view returns (uint256) {
        return artistRoyalties[artist];
    }

    /**
     * @dev Get the current token ID counter value
     * @return uint256 The current token ID counter value
     */
    function getTokenIdCounter() public view returns (uint256) {
        return _tokenIdCounter.current();
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
