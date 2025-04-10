
# 🪪 Name Changer DApp

This is a simple full-stack decentralized application (DApp) that allows users to interact with a smart contract on the **Ethereum Sepolia Testnet**. Users can:

- Add names to a contract-managed array
- Remove names by index
- Fetch all stored names
- View a name at a specific index
- Connect and interact with the DApp using **MetaMask**

The application itself is very simplistic — the cool part is the fact that all data and interactions are stored and processed directly on the Sepolia blockchain. This means there's no traditional backend; all changes to the data (adding, removing, or reading names) are executed through smart contract functions and recorded immutably on-chain.

## 🔗 Live Contract

- **Contract Address:** [`0x8BA28EdA2878A861a9523699947773BD594280a2`](https://sepolia.etherscan.io/address/0x8BA28EdA2878A861a9523699947773BD594280a2)
- **Network:** Sepolia Testnet  
- **Block Explorer:** [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x8BA28EdA2878A861a9523699947773BD594280a2)

---

## 🧠 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Smart Contract:** Solidity (`^0.8.20`)
- **Blockchain Tools:** MetaMask, Ethers.js
- **Testnet:** Sepolia (via Alchemy)

---

## ✨ Features

- 🔐 Connect MetaMask wallet (Finished ✅)
- ➕ Add names to a blockchain array (Finished ✅)
- ➖ Remove names by index (Finished ✅)
- 📋 Display all names in real-time (Finished ✅)
- 🔎 Get a name at a specific index (Finished ✅)
- 🔄 Live on-chain state updates (Finished ✅)
- 🌐 Fully responsive UI using Tailwind CSS (WIP 🚧)

---

## 🚀 Live Demo

This Dapp is deployed on Vercel and publicly accessible here:

👉 [https://name-dapp-two.vercel.app/](https://name-dapp-two.vercel.app/)

Visit the site and connect your MetaMask wallet to interact with the smart contract live on the Sepolia testnet.
