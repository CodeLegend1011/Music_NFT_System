import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import './ProfileModal.css'; // Add your styles for the modal here

const ProfileModal = ({ onClose }) => {
    const [account, setAccount] = useState('');
    const [nftsCount, setNftsCount] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const loadProfile = async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const account = await signer.getAddress();
                setAccount(account);

                // Fetch number of NFTs owned (this logic may vary based on your contract)
                const contractAddress = '0xBeafe038e420c0fba089378de32881d7AEeaA9E9'; // Your contract address
                const musicNFTContract = new ethers.Contract(contractAddress, ['function balanceOf(address) view returns (uint256)'], signer);
                const nfts = await musicNFTContract.balanceOf(account);
                setNftsCount(nfts.toString());

                // Fetch the balance of the user
                const balance = await provider.getBalance(account);
                setBalance(ethers.formatEther(balance));
            }
        };

        loadProfile();
    }, []);

    return (
        <div className="profile-modal">
            <div className="modal-content">
                <div className="profile-header">
                    <h2>Your Profile</h2>
                    <button className="close-btn" onClick={onClose}>X</button>
                </div>
                <div className="profile-details">
                    <div className="profile-info">
                        <img src="https://avatar.iran.liara.run/public/boy?username=Ash" alt="Profile" className="profile-image" />
                        <p><strong>Account:</strong> User</p>
                        <p><strong>NFTs Owned:</strong> {nftsCount}</p>
                        <p><strong>Balance:</strong> {balance} ETH</p>
                        <p><strong>Address:</strong> {account}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;
