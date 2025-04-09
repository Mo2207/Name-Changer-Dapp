
"use client" // needed to interact with window

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

export default function Home() {

  // address of the deployed "name-changer.sol" smart contract
  const CONTRACT_ADDRESS = "0xd9145CCE52D386f254917e481eB44e9943F39138";

  // contract ABI (application binary interface)
  // tells the frontend how to interact with the smart contract
  const CONTRACT_ABI = [
    {
      "inputs": [],
      "name": "getAllNames",
      "outputs": [{ "internalType": "string[]", "name": "", "type": "string[]" }],
      "stateMutability": "view",
      "type": "function"
    },
    {
      inputs: [{ internalType: 'string', name: '_name', type: 'string' }],
      name: 'addName',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function'
    } 
  ];

  // STATE VARIABLES
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // needed to store the users wallet address
  const [name, setName] = useState<string>("None"); // needed to store the name from the smart contract
  const [newName, setNewName] = useState(''); // needed to store the new name from the input field
  

  // ASK USER PERMISSION TO CONNECT THEIR WALLET
  const connectWallet = async () => {
    // get the metamask provider
    const metaMaskProvider = (window as any).ethereum;
    if (!metaMaskProvider) return alert("Please install MetaMask!");

    // if metamask is installed, grab the users wallet address
    const [address] = await metaMaskProvider.request({ method: 'eth_requestAccounts' }); // https://tinyurl.com/52stu9pw
    setWalletAddress(address); // store the address in state
  }

  // GET NAME ON SMART CONTRACT
  const getNamesOnContract = async () => { 
    // get the metamask provider
    const metaMaskProvider = (window as any).ethereum;
    if (!metaMaskProvider) return alert("Please install MetaMask!");

    // create READ-ONLY connection using metamask extension
    const provider = new ethers.BrowserProvider(metaMaskProvider); // https://tinyurl.com/ynfffak8

    // create a javascript representation of the smart contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider); // https://tinyurl.com/yc7erycv

    // call the getAllNames function from the smart contract and return result
    return await contract.getAllNames(); // getAllNames() is a function from the smart contract
  }

  // SET NAME ON CONTRACT
  const addNameOnContract = async () => {
    // get the metamask provider
    const metaMaskProvider = (window as any).ethereum;
    if (!metaMaskProvider) return alert("Please install MetaMask!");

    // create a READ & WRITE connection using metamask extension
    const provider = new ethers.BrowserProvider(metaMaskProvider); // https://tinyurl.com/ynfffak8

    // because SetNameOnContract is a state changing function, we need to sign the transaction
    // create a signer to sign transactions
    const signer = await provider.getSigner(); // https://tinyurl.com/ynfffak8 getSigner() is a method of BrowserProvider

    // create a javascript representation of the smart contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer); // https://tinyurl.com/yc7erycv

    //  attempt to change the name on the smart contract
    try {
      const tx = await contract.addName(newName); // addName() is a function from the smart contract
      
      // wait for the transaction to be mined
      await tx.wait();
      console.log("Name updated:", newName); // log the new name

      setNewName(''); // clear the input field
      getNamesOnContract(); // get the names from the contract 
    } catch (error) {
      console.error("Transaction failed:", error); // log the error
      alert("Failed to update name."); // alert the user
    }
  }

  // GET NAME ONCE WALLET IS CONNECTED
  useEffect(() => {
    if (walletAddress) {
      getNamesOnContract();
    }
  }, [walletAddress]);

  return (
    <section className="flex flex-col justify-center items-center h-screen bg-gray-100">

      {/* title */}
      <div className='flex flex-col items-center'>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Name Changer Dapp</h1>
      </div>

      {/* description */}
      <div className='flex flex-col items-center w-[50%] text-center'>
        <p className="text-lg mb-4 text-gray-600">This is a simple ethereum blockchain based Dapp, make sure MetaMask extension is installed and connect your wallet to get started!</p>
      </div>

      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="bg-[#224ead] text-white px-4 py-2 rounded"
        >
          Connect MetaMask
        </button>
      ) : (
        <>
          <div className="flex flex-col text-center mt-4">
            <p className="text-lg mb-4 text-gray-600">Your Wallet Address: {walletAddress}</p>
          </div>

          {/*  */}
          <div className='flex flex-col'>
            <div className='text-center'>
              <h2 className='mb-4 text-2xl text-gray-900'>NameDapp Contract Functions:</h2>
            </div>
            {/* get names button */}
            <button
              onClick={getNamesOnContract}
              disabled={!newName}
              className="bg-[#224ead] text-white px-4 py-2 rounded mb-3"
            >
              Get All Names
            </button>

            {/* add name button */}
            <button
              onClick={addNameOnContract}
              disabled={!newName}
              className="bg-[#C97538] text-white px-4 py-2 rounded"
            >
              Add Name
            </button>
          </div>
          

          
        </>
      )}

      {/* setName() input field & button */}
      {/* <div className="mt-4">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Enter new name"
          className="border px-2 py-1 rounded mr-2 text-gray-600"
        />
        <button
          onClick={setNameOnContract}
          disabled={!newName}
          className="bg-[#224ead] text-white px-4 py-1 rounded"
        >
          Set Name
        </button>
      </div> */}

    </section>
  );
}
