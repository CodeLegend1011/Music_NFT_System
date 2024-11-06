import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MusicNFT from './MNFT.json';  // Your contract ABI
import './ClientApp.css';

const ClientApp = () => {
  const [account, setAccount] = useState('');
  const [nfts, setNfts] = useState([]);
  const [contract, setContract] = useState(null);
  const [purchasedNfts, setPurchasedNfts] = useState([]);
  const [activeTab, setActiveTab] = useState('market');

  useEffect(() => {
    const initialize = async () => {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const contractAddress = '0x2D6C5fae5C2Ef0Ec953E3BEa032b67DAf80ab5C9'; // Replace with your deployed contract address
      const musicNFTContract = new ethers.Contract(contractAddress, MusicNFT.abi, signer);
      setContract(musicNFTContract);

      const nftData = [];
      const tokenIdCounter = await musicNFTContract.getTokenIdCounter();
      const totalSupply = parseInt(tokenIdCounter.toString(), 10);

      for (let i = 0; i < totalSupply; i++) {
        const nft = await musicNFTContract.getNFTDetails(i);
        const metadata = await fetchMetadata(nft.tokenURI);
        if (metadata) {
          nftData.push({
            tokenId: i,
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
            audio: metadata.audio,
          });
        }
      }
      setNfts(nftData);
    };

    initialize();
  }, []);

  const fetchMetadata = async (tokenURI) => {
    try {
      const metadataUrl = tokenURI.startsWith("ipfs://")
        ? `https://ipfs.io/ipfs/${tokenURI.split("ipfs://")[1]}`
        : tokenURI;
      const response = await fetch(metadataUrl);
      if (!response.ok) throw new Error("Failed to fetch metadata");
      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

  const buyNFT = async (tokenId) => {
    try {
      const tx = await contract.purchaseNFT(tokenId, { value: ethers.parseEther("0.1") });
      await tx.wait();
      alert('NFT purchased successfully!');
      const purchasedNft = nfts.find((nft) => nft.tokenId === tokenId);
      setPurchasedNfts((prevPurchasedNfts) => [...prevPurchasedNfts, purchasedNft]);
      const updatedNfts = nfts.filter((nft) => nft.tokenId !== tokenId);
      setNfts(updatedNfts);
    } catch (error) {
      console.error(error);
      alert('Purchase failed. Check console for details.');
    }
  };

  return (
    <div className="client-app">
      <h1>Music NFT Marketplace</h1>
      <h2>Welcome, User</h2>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'market' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('market')}
        >
          Market
        </div>
        <div
          className={`tab ${activeTab === 'collection' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('collection')}
        >
          Collection
        </div>
      </div>

      {activeTab === 'market' && (
        <div className="nft-gallery">
          {nfts.length === 0 ? (
            <p>No NFTs available for purchase.</p>
          ) : (
            nfts.map((nft, index) => (
              <div className="nft-card" key={index}>
                <img src={`https://ipfs.io/ipfs/${nft.image.split("ipfs://")[1]}`} alt="NFT" />
                <div className="nft-details">
                  <h4>{nft.name}</h4>
                  <p>{nft.description}</p>
                  {nft.audio && (
                    <audio controls>
                      <source src={`https://ipfs.io/ipfs/${nft.audio.split("ipfs://")[1]}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  <button onClick={() => buyNFT(nft.tokenId)}>Buy for 0.1 ETH</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'collection' && (
        <div className="purchased-nft-gallery">
          {purchasedNfts.length === 0 ? (
            <p>You have no NFTs in your collection.</p>
          ) : (
            purchasedNfts.map((nft, index) => (
              <div className="nft-card" key={index}>
                <img src={`https://ipfs.io/ipfs/${nft.image.split("ipfs://")[1]}`} alt="NFT" />
                <div className="nft-details">
                  <h4>{nft.name}</h4>
                  <p>{nft.description}</p>
                  {nft.audio && (
                    <audio controls>
                      <source src={`https://ipfs.io/ipfs/${nft.audio.split("ipfs://")[1]}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <footer>
        <p>Music NFT Marketplace © 2024</p>
      </footer>
    </div>
  );
};

export default ClientApp;
