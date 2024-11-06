# Music NFT Marketplace Documentation

This document provides an in-depth overview of the **Music NFT Marketplace**, explaining its key components, how IPFS is used, and additional important texts for developers.

---

## Table of Contents
1. [Overview](#overview)
2. [IPFS Integration](#ipfs-integration)
3. [Smart Contracts Details](#smart-contracts-details)
4. [Frontend Configuration](#frontend-configuration)
5. [Backend Configuration](#backend-configuration)
6. [Important Links and Resources](#important-links-and-resources)

---

## Overview

The **Music NFT Marketplace** leverages decentralized technologies to enable artists to mint, sell, and earn royalties on their music NFTs. It ensures transparency and security using Ethereum smart contracts and decentralized storage through IPFS.

---

## IPFS Integration

### What is IPFS?

The **InterPlanetary File System (IPFS)** is a peer-to-peer distributed file system that allows for decentralized storage and sharing of data. In our project, IPFS is used to store metadata and music files securely, ensuring they are tamper-proof and always accessible.

### How We Use IPFS

1. **Metadata Storage**: The metadata of each music NFT (such as title, artist name, description, and royalty information) is stored on IPFS.
2. **Music File Storage**: High-quality audio files are also uploaded to IPFS to ensure decentralized and persistent access.

### Tools and Libraries

- **Pinata**: We use Pinata as a gateway to easily upload files to IPFS.
- **IPFS HTTP Client**: A JavaScript library for interacting with IPFS nodes.

### Steps to Upload to IPFS

1. Sign up for a Pinata account and generate an API key.
2. Use the Pinata SDK or Pinata API to upload metadata and files.
3. Update the IPFS URI in your smart contract.

## Metadata Links(https://ipfs.io/ipfs/Qmxxxx)

1. ipfs://QmTwbcVrWbRZQ46ZonZVUKe64JkQYgG24fbFSvxLicqcki
2. ipfs://QmXyeFkGXC6bAbC5TK5wSgax2sbuVbpVRku9FbY6G5rV1k
3. ipfs://QmYoJ1zRVH3CaytaYrYNos12D5afcX4tea3TZTcK69tyfQ
4. ipfs://QmQHb723T9WCentkNdTzvndzW2q2qju6xkWMiZWFu81WCP
5. ipfs://QmS3XK66PciH7orthnt5ZmqRfi7NmicheV9RywuCtiHYF9

---

## Smart Contracts Details

Our smart contracts are written in Solidity and deployed on the Ethereum blockchain.

### Also compile the contract with Berlin EVM Version in Advanced Configurations

Here’s an overview of the key components:

### Contract Structure

- **ERC721 Standard**: We use OpenZeppelin's ERC721 implementation for NFT functionality.
- **Royalty Mechanism**: Royalties are paid out to artists whenever an NFT is resold.
- **Contract Events**: Events like `MusicNFTMinted` and `NFTPurchased` are emitted to track important actions.

### Important Functions

1. **uploadMusicNFT**: Mints a new music NFT and assigns it to the artist.
2. **purchaseNFT**: Handles the purchase of an NFT, including royalty distribution.
3. **getNFTDetails**: Returns metadata and details for a specific NFT.

---

## Ganache Settings for MetaMask and Remix IDE

To deploy and interact with your smart contracts on a local blockchain using Ganache, you'll need to configure your environment settings accordingly.

---

### 1. Setting Up Ganache

1. **Install Ganache**:
   - Download and install **Ganache** from [https://trufflesuite.com/ganache/](https://trufflesuite.com/ganache/).
   - Start Ganache and create a new workspace or use the default Ethereum quickstart.
  
2. **Copy RPC Server and Chain ID**:
   - You will find the RPC Server URL (e.g., `HTTP://127.0.0.1:7545`) and the Chain ID (usually `1337`) in the Ganache interface.
  
---

### 2. Configuring MetaMask with Ganache

To connect MetaMask to your local Ganache blockchain, follow these steps:

1. **Open MetaMask**:
   - Click on the MetaMask extension in your browser.
  
2. **Add a New Network**:
   - Click on your profile icon in MetaMask.
   - Go to **Settings** > **Networks** > **Add Network**.
   - Fill in the network details:
     - **Network Name**: Ganache (or any name you prefer)
     - **New RPC URL**: `http://127.0.0.1:7545` (default Ganache RPC server)
     - **Chain ID**: `1337` (default for Ganache, but double-check in the Ganache interface)
     - **Currency Symbol**: ETH
     - **Block Explorer URL**: Leave it blank (or use Ganache's local explorer if desired)

3. **Save and Connect**:
   - Click **Save**.
   - Select the newly added Ganache network in MetaMask.

4. **Import Accounts**:
   - Copy one of the private keys from Ganache (available under the “Accounts” tab).
   - In MetaMask, click on your account icon and select **Import Account**.
   - Paste the private key and click **Import**.
   - Your account will now be connected to the Ganache local blockchain.

---

### 3. Configuring Remix IDE with Ganache

To deploy and test your smart contracts using Remix and Ganache, follow these steps:

1. **Open Remix IDE**:
   - Visit [https://remix.ethereum.org](https://remix.ethereum.org).

2. **Set Environment**:
   - In Remix, go to the **Deploy & Run Transactions** panel.
   - Under **Environment**, select **Custom - External Http Provider**. A prompt will ask for your RPC server URL.
   - Enter `http://127.0.0.1:7545` (the RPC URL from Ganache).

3. **Authorize MetaMask**:
   - MetaMask will prompt you to connect. Approve the connection.
   - Remix will now use Ganache as the blockchain network.

4. **Deploy Contracts**:
   - Compile your contracts in Remix.
   - Use the **Deploy** button to deploy your contracts on the local Ganache blockchain.
   - You can monitor transactions and blocks in the Ganache UI.

---

### Additional Tips

- **Gas Limit**: Ganache has a default gas limit, but you can adjust it in the settings if necessary.
- **Resetting Ganache**: If you reset Ganache, you’ll need to re-import accounts into MetaMask.

---

### Key Components

1. **Artist Dashboard**: Allows artists to mint NFTs and track their royalties.
2. **Client Marketplace**: Lets clients browse and purchase music NFTs.
3. **Profile Modal**: Displays user details, including account balance, NFTs owned, and wallet address.

### Steps to Deploy

1. Install **Remix IDE**.
2. Compile the smart contracts and deploy them to your preferred Ethereum network.
3. Update the contract addresses in the frontend configuration.

---

## Important Links and Resources

- **Ethereum**: [https://ethereum.org](https://ethereum.org)
- **IPFS**: [https://ipfs.io](https://ipfs.io)
- **Pinata**: [https://pinata.cloud](https://pinata.cloud)
- **OpenZeppelin**: [https://openzeppelin.com](https://openzeppelin.com)
- **MetaMask**: [https://metamask.io](https://metamask.io)

### Helpful Tutorials

- **IPFS Documentation**: [https://docs.ipfs.io](https://docs.ipfs.io)
- **Ethereum Smart Contract Development**: [https://docs.soliditylang.org](https://docs.soliditylang.org)

---

## Conclusion

This documentation should provide a comprehensive understanding of how to work with the Music NFT Marketplace. For any further questions or issues, feel free to open an issue on our [GitHub repository](https://github.com/CodeLegend1011/Music_NFT).

Happy coding and music NFT minting! 🚀🎵
