
# 🪪 NameDApp

[![Vercel](https://img.shields.io/badge/Live%20on-Vercel-000?style=flat&logo=vercel)](https://name-dapp-two.vercel.app/)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity)
![Ethers.js](https://img.shields.io/badge/Ethers.js-6e45f2?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=typescript&logoColor=white)

This is a simple full-stack decentralized application (DApp) that allows users to interact with a smart contract on the **Ethereum Sepolia Testnet**. Users can:

- Add names to a contract-managed array
- Remove names by index
- Fetch all stored names
- View a name at a specific index
- Connect and interact with the DApp using **MetaMask**

The application itself is very simplistic — the cool part is the fact that all data and interactions are stored and processed directly on the Sepolia blockchain. This means there's no traditional backend; all changes to the data (adding, removing, or reading names) are executed through smart contract functions and recorded immutably on-chain.

---

## 🔗 Live Contract

- **Contract Address:** [`0x8BA28EdA2878A861a9523699947773BD594280a2`](https://sepolia.etherscan.io/address/0x8BA28EdA2878A861a9523699947773BD594280a2)
- **Network:** Sepolia Testnet  
- **Block Explorer:** [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x16993AB19598182767e9a8cb8F78fF696F976Fd5)

---

## 🧠 Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Smart Contract:** Solidity (`^0.8.20`)
- **Blockchain Tools:** MetaMask, Ethers.js
- **Testnet:** Sepolia (via Alchemy)

---

## ✨ Features

- 🔐 Connect MetaMask wallet
- ➕ Add names to a blockchain array
- ➖ Remove names by index
- 📋 Display all names in real-time
- 🔎 Get a name at a specific index
- 🔄 Live on-chain state updates

---

## 🔮 Future Goals

- 📱 **Mobile Optimization** – Improve the app's layout and interactivity for smaller screens to make it fully responsive and mobile-friendly.
- 🧠 **Extended Smart Contract Features** – Add new contract functions such as updating names, tracking ownership, or logging timestamps.
- 🛠️ **UI/UX Enhancements** – Polish animations, form validation, and feedback indicators for a smoother user experience.

---

## 🚀 Live Demo

This Dapp is deployed on Vercel and publicly accessible here:

👉 [https://name-dapp-two.vercel.app/](https://name-dapp-two.vercel.app/)

Visit the site and connect your MetaMask wallet to interact with the smart contract live on the Sepolia testnet.
