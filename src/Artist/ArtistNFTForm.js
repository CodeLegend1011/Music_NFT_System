import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MusicNFT from './MNFT.json'; // Adjust the import path if necessary
import './ArtistApp.css'; // Link to your improved CSS file for styling

const ArtistNFTForm = () => {
    const [nftData, setNftData] = useState({ tokenURI: '', royaltyPercentage: '' });
    const [account, setAccount] = useState('');
    const [contract, setContract] = useState(null);
    const [royaltiesReceived, setRoyaltiesReceived] = useState(0);
    const [nftsSold, setNftsSold] = useState(0);

    useEffect(() => {
        const loadProviderAndContract = async () => {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractAddress = '0x2D6C5fae5C2Ef0Ec953E3BEa032b67DAf80ab5C9'; // Replace with your contract address
            const musicNFTContract = new ethers.Contract(contractAddress, MusicNFT.abi, signer);
            setContract(musicNFTContract);
            const accounts = await provider.send("eth_requestAccounts", []);
            setAccount(accounts[0]);

            // Fetch artist's royalties and number of NFTs sold
            try {
                const royalties = await musicNFTContract.getArtistRoyalties(account);
                setRoyaltiesReceived(ethers.formatEther(royalties));

                const sold = await musicNFTContract.getNFTsSold(account);
                setNftsSold(sold.toString());
            } catch (error) {
                console.error("Error fetching royalties or sold NFTs:", error);
            }
        };

        loadProviderAndContract();
    }, [account]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNftData((prevData) => ({ ...prevData, [name]: value }));
    };

    const uploadNFT = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.uploadMusicNFT(nftData.tokenURI, nftData.royaltyPercentage);
            await tx.wait();
            alert('NFT Uploaded Successfully!');
        } catch (error) {
            console.error(error);
            alert('Upload failed. Check console for details.');
        }
    };

    return (
        <div className="artist-app">
            <h1>Artist NFT Dashboard</h1>
            <h2>Welcome, Artist</h2>

            <div className="royalty-info">
                <div className="info-card">
                    <h3>Royalties Received</h3>
                    <p>{royaltiesReceived} ETH</p>
                </div>
                <div className="info-card">
                    <h3>NFTs Sold</h3>
                    <p>{nftsSold}</p>
                </div>
            </div>

            <form onSubmit={uploadNFT} className="upload-form">
                <input
                    type="text"
                    name="tokenURI"
                    placeholder="IPFS Token URI"
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="royaltyPercentage"
                    placeholder="Royalty Percentage"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Upload NFT</button>
            </form>
        </div>
    );
};

export default ArtistNFTForm;
