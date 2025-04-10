
"use client" // needed to interact with window

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import metamaskFox from '../../public/img/metamask-fox.png'; // import metamask logo

export default function Home() {

  // address of the deployed "name-changer.sol" smart contract
  const CONTRACT_ADDRESS = "0xf6d04cF24296a9584F9C74B3d4efCBc4aDb4998A";

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
  const [names, setNames] = useState<string[]>([]); // needed to store the names from the smart contract
  const [newName, setNewName] = useState(''); // needed to store the new name from the input field
  const [getNamesVisible, setGetNamesVisible] = useState(false); // needed to show/hide getAllNames() function output
  const [addNamesVisible, setAddNamesVisible] = useState(false); // needed to show/hide addName() function output
  const [loading, setLoading] = useState(false); // needed to show loading state
  

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
    try {
      const allNames = await contract.getAllNames(); // getAllNames() is a function from the smart contract
      setNames(allNames); // set the names in state
      console.log("Names on contract:", allNames); // log the names
    } catch (error) {
      console.error("Failed to get names:", error); // log the error
      alert("Failed to get names."); // alert the user  
    }
  }

  // SET NAME ON CONTRACT
  const addNameOnContract = async () => {
    // get the metamask provider
    const metaMaskProvider = (window as any).ethereum;
    if (!metaMaskProvider) return alert("Please install MetaMask!");

    // create a READ & WRITE connection using metamask extension
    const provider = new ethers.BrowserProvider(metaMaskProvider); // https://tinyurl.com/ynfffak8

    // because addNameOnContract is a state changing function, we need to sign the transaction
    // create a signer to sign transactions
    const signer = await provider.getSigner(); // https://tinyurl.com/ynfffak8 getSigner() is a method of BrowserProvider

    // create a javascript representation of the smart contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer); // https://tinyurl.com/yc7erycv

    //  attempt to change the name on the smart contract
    try {
      // start loading
      setLoading(true);

      const tx = await contract.addName(newName); // addName() is a function from the smart contract
      
      // wait for the transaction to be mined
      await tx.wait();
      console.log("Name updated:", newName); // log the new name

      setNewName(''); // clear the input field
      
      // Display success message temporarily
      setAddNamesVisible(true);
      setTimeout(() => {
        setAddNamesVisible(false);
      }, 3000);

    } catch (error) {
      console.error("Transaction failed:", error); // log the error
      alert("Failed to update name."); // alert the user
    } finally {
      // stop loading
      setLoading(false);
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
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Name Changer Dapp</h1>
      </div>

      {!walletAddress ? (
        <>
          {/* description */}
          <div className='flex flex-col items-center w-[50%] text-center'>
            <p className="text-lg mb-4 text-gray-600">This is a simple ethereum blockchain based Dapp, make sure MetaMask extension is installed and connect your wallet to get started!</p>
          </div>
          {/* metamask connection button */}
          <button
            onClick={connectWallet}
            className="bg-[#224ead] text-white px-4 py-2 rounded hover:bg-[#224eadde] transition duration-300 ease-in-out"
          >
            Connect MetaMask
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col text-center items-center mt-4 mb-8">
            <Image
              src={metamaskFox}
              alt="MetaMask Logo"
              width={75}
              height={75}
              className=""
            />
            <h2 className='text-2xl font-semibold mb-4 text-[#f6851c]'>MetaMask successfully connected!</h2>
            <p className="text-xl mb-4 text-gray-600">Your Wallet Address is: <span className='font-semibold'>{walletAddress}</span></p>
            <p className='text-lg text-gray-600 max-w-[600px] text-center mb-2'>This contract is deployed on Sepolia test network. Some functions require gas fees because they manipulate data on the blockchain.</p>
            <p className='text-lg text-gray-600 max-w-[600px] text-center'>
              SepoliaETH is used for testing contracts to simulate using real-world dapps. To use this application you'll need some. Head to{' '} 
              <a 
                className='font-semibold hover:cursor-pointer' 
                href="https://www.alchemy.com/faucets/ethereum-sepolia"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alchemy's Sepolia Faucet
              </a> 
              {' '}and enter in your wallet address to recieve some for free.
            </p>
          </div>

          {/* contract functions section */}
          <div className='flex flex-col w-[60%] justify-center items-center bg-gray-200 p-6 rounded-lg shadow-md'>
            <div className='text-center'>
              <h2 className='mb-6 text-2xl text-gray-900'>NameDapp Contract Functions:</h2>
            </div>

            {/* get names button */}
            <div className='flex flex-row mb-3 w-full'>
              <button
                onClickCapture={() => {
                  setGetNamesVisible(true);
                  getNamesOnContract();
                }}
                className="bg-[#224ead] text-white px-4 py-2 rounded w-[150px] mr-3 hover:bg-[#224eadde] transition duration-300 ease-in-out"
              >
                Get All Names
              </button>

              <div 
                className={`text-gray-600 items-center text-xl ${getNamesVisible ? 'flex' : 'hidden'}`}
              >
                {names.join(', ')}
              </div>
            </div>

            {/* add name button */}
            <div className='flex flex-row mb-3 w-full'>
              <div className='flex flex-row'>
                <button
                  onClickCapture={() => {
                    if (!newName) return alert("Please enter a name!");
                    addNameOnContract();
                  }}
                  className="bg-[#C97538] text-white px-4 py-2 rounded w-[150px] mr-3 hover:bg-[#c97438d7] transition duration-300 ease-in-out"
                >
                  Add Name
                </button>
                <input 
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new name"
                  className="border px-2 py-1 rounded text-gray-600"
                />
              </div>

              <div 
                className='text-gray-600 items-center text-xl pl-3 flex'>
                {loading && <p className='animate-pulse'>Waiting for confirmation...</p>}
                {!loading && addNamesVisible && (
                  <p>Name added to array!</p>
                )}
              </div>
            </div>

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
