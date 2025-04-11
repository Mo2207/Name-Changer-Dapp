
"use client" // needed to interact with window

import { useState } from 'react';
import { ethers } from 'ethers';
import Image from 'next/image';
import BlueButton from '@/components/blueButton';
import OrangeButton from '@/components/orangeButton';
import metamaskFox from '../../public/img/metamask-fox.png'; // import metamask logo
import type { MetaMaskInpageProvider } from '@metamask/providers'; // import MetaMaskInpageProvider type


// address of the deployed "NameDapp.sol" smart contract
const CONTRACT_ADDRESS = "0x16993AB19598182767e9a8cb8F78fF696F976Fd5";


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
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "getName",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_name", "type": "string" }],
    "name": "addName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "removeName",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// getMetaMaskProvider function
const getMetaMaskProvider = (): MetaMaskInpageProvider => {
  const ethereum = (window as typeof window & { ethereum?: MetaMaskInpageProvider }).ethereum;

  if (!ethereum) {
    alert("Please install MetaMask!");
    throw new Error("MetaMask not found");
  }

  return ethereum;
};

// get READ provider function
const readProvider = () => {
  const provider = new ethers.BrowserProvider(getMetaMaskProvider());
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

// get READ & WRITE provider function
const writeProvider = async () => {
  const provider = new ethers.BrowserProvider(getMetaMaskProvider());
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
}

export default function Home() {

  // STATE VARIABLES
  const [walletAddress, setWalletAddress] = useState<string | null>(null); // needed to store the users wallet address
  const [names, setNames] = useState<string[]>([]); // needed to store the names for getAllNames() function
  const [name, setName] = useState<string>(''); // needed to store the name for getName() function
  const [newName, setNewName] = useState(''); // needed to store the new name from the input field

  // INDEX STATES
  const [removeNameIndex, setRemoveNameIndex] = useState<string>(''); // needed to store the index of the name to be removed
  const [getNameIndex, setGetNameIndex] = useState<string>(''); // needed to store the index of the name to be retrieved

  // VISIBILITY STATES
  const [getNamesVisible, setGetNamesVisible] = useState(false); // needed to show/hide getAllNames() function output
  const [getNameVisible, setGetNameVisible] = useState(false); // needed to show/hide getName() function output
  const [addNamesVisible, setAddNamesVisible] = useState(false); // needed to show/hide addName() function output
  const [removeNamesVisible, setRemoveNamesVisible] = useState(false); // needed to show/hide removeName() function output

  // LOADING STATES
  const [addLoading, setAddLoading] = useState(false); // needed to show loading state for addName()
  const [removeLoading, setRemoveLoading] = useState(false); // needed to show loading state removeName()


  // ASK USER PERMISSION TO CONNECT THEIR WALLET
  const connectWallet = async () => {
    const metaMaskProvider = getMetaMaskProvider();
    const accounts = await metaMaskProvider.request({ method: 'eth_requestAccounts' }) as string[];
    const address = accounts[0];
    setWalletAddress(address);
  };

  // GET NAMES FROM SMART CONTRACT
  const getNamesOnContract = async () => { 
    // call the getAllNames function from the smart contract and return result
    try {
      const contract = readProvider(); // create a READ-ONLY connection using metamask extension
      const allNames = await contract.getAllNames(); // getAllNames() is a function from the smart contract
      setNames(allNames); // set the names in state
      console.log("Names on contract:", allNames); // log the names
    } catch (error) {
      console.error("Failed to get names:", error); // log the error
      alert("Failed to get names."); // alert the user  
    }
  }

  // GET NAME FROM SMART CONTRACT
  const getNameOnContract = async () => { 
    // call the getName function from the smart contract and return result
    try {
      const contract = readProvider(); // create a READ-ONLY connection using metamask extension
      const name = await contract.getName(getNameIndex); // getName() is a function from the smart contract
      setName(name); // set the names in state
      console.log("Name on contract:", name); // log the names
    } catch (error) {
      console.error("Failed to get name:", error); // log the error
      alert("Failed to get name."); // alert the user  
    }
  }

  // ADD NAME TO SMART CONTRACT
  const addNameOnContract = async () => {
    //  attempt to change the name on the smart contract
    try {
      // start loading
      setAddLoading(true);

      const contract = await writeProvider(); // create a READ & WRITE connection using metamask extension
      const tx = await contract.addName(newName); // addName() is a function from the smart contract
      
      // wait for the transaction to be mined
      await tx.wait();
      console.log("Name updated:", newName); // log the new name

      setNewName(''); // clear the input field
      
      // Display success message temporarily
      setAddNamesVisible(true);
      setTimeout(() => {
        setAddNamesVisible(false);
      }, 6000);

    } catch (error) {
      console.error("Transaction failed:", error); // log the error
      alert("Failed to update name."); // alert the user
    } finally {
      // stop loading
      setAddLoading(false);
    }
  }

  // REMOVE NAME FROM SMART CONTRACT
  const removeNameOnContract = async () => {
    //  attempt to change the name on the smart contract
    try {
      // start loading
      setRemoveLoading(true);

      const contract = await writeProvider(); // create a READ & WRITE connection using metamask extension
      const tx = await contract.removeName(removeNameIndex); // removeName() is a function from the smart contract

      // wait for the transaction to be mined
      await tx.wait();

      setRemoveNameIndex(''); // clear the input field

      // Display success message temporarily
      setRemoveNamesVisible(true);
      setTimeout(() => {
        setRemoveNamesVisible(false);
      }, 6000);

    } catch (error) {
      console.error("Transaction failed:", error); // log the error
      alert("Failed to remove name."); // alert the user
    } finally {
      // stop loading
      setRemoveLoading(false);
    }
  }

  return (
    <section className="flex flex-col items-center bg-gradient-to-t from-gray-100 to-blue-100 justify-center min-h-screen overflow-y-auto pt-6 pb-4">

      {/* title */}
      <div className='flex flex-col items-center'>
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Name Changer Dapp</h1>
      </div>

      {!walletAddress ? (
        <>
          {/* description */}
          <div className='flex flex-col items-center w-[50%] text-center'>
            <p className="text-lg mb-4 text-gray-600">
              This is a simple ethereum blockchain based Dapp, make sure{' '}
              <a
                className='font-semibold hover:cursor-pointer text-[#f6851f]' 
                href="https://metamask.io/en-GB/download"
                target="_blank"
                rel="noopener noreferrer"
              >
                MetaMask extension
              </a> 
              {' '}is installed and connect your wallet to get started!
              </p>
          </div>
          {/* metamask connection button */}
          <BlueButton
            onClick={connectWallet}
            className='mr-0'
          >
            Connect to MetaMask
          </BlueButton>
        </>
      ) : (
        <>
          <div className="flex flex-col text-center items-center mt-4 mb-8 w-[85%]">
            <a href="https://metamask.io/en-GB/download">
              <Image
                src={metamaskFox}
                alt="MetaMask Logo"
                width={75}
                height={75}
                className="hover:scale-110 hover:cursor-pointer transition duration-300 ease-in-out"
              />
            </a>
            <h2 className='text-2xl font-semibold mb-4 text-[#f6851c]'>MetaMask successfully connected!</h2>
            <p className="text-xl mb-4 text-gray-600">Your Wallet Address is: <span className='font-semibold'>{walletAddress}</span></p>
            <p className='text-lg text-gray-600 w-full text-center mb-2'>This contract is deployed on Sepolia test network. The <span className='text-[#224ead] font-semibold'>blue</span> functions are free for anyone to use, however the <span className='text-[#C97538] font-semibold'>orange</span> functions require gas fees ⛽️ because they manipulate data on the blockchain.</p>
            <p className='text-lg text-gray-600 w-full text-center mb-2'>
              SepoliaETH is used for testing contracts to simulate using real-world dapps. To use any of the <span className='text-[#C97538] font-semibold'>orange</span> functions you&apos;ll need some. Head to{' '} 
              <a 
                className='font-semibold hover:underline hover:cursor-pointer' 
                href="https://www.alchemy.com/faucets/ethereum-sepolia"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alchemy&apos;s Sepolia Faucet
              </a> 
              {' '}and enter in your wallet address to recieve some for free.
            </p>
            <p className='text-sm text-gray-600 w-full text-center'>Make sure your metamask account is connected to the Sepolia network: Open MetaMask, In the top left dropdown select Sepolia network, Refresh the app</p>
          </div>

          {/* contract functions section */}
          <div className='flex flex-col w-[60%] justify-center items-center bg-gray-200 p-6 rounded-lg shadow-md'>

            {/* get names button */}
            <div className='flex flex-row mb-3 w-full'>
              <BlueButton
                onClick={() => {
                  setGetNamesVisible(true);
                  getNamesOnContract();
                }}
              >
                Get All Names
              </BlueButton>

              <div 
                className={`text-gray-600 items-center text-xl ${getNamesVisible ? 'flex' : 'hidden'}`}
              >
                {names.join(', ')}
              </div>
            </div>

            {/* get name button */}
            <div className='flex flex-row mb-3 w-full'>
              <BlueButton
                onClick={() => {
                  setGetNameVisible(true);
                  getNameOnContract();
                }}
              >
                Get Name
              </BlueButton>
              <input 
                  type="number"
                  min="0"
                  step="1"
                  value={getNameIndex}
                  onChange={(e) => setGetNameIndex(e.target.value)}
                  placeholder="Enter an Index"
                  className="border px-2 py-1 rounded text-gray-600"
                />

              <div 
                className={`text-gray-600 items-center text-xl pl-3 ${getNameVisible ? 'flex' : 'hidden'}`}
              >
                {name}
              </div>
            </div>

            {/* add name button */}
            <div className='flex flex-row mb-3 w-full'>
              <div className='flex flex-row'>
                <OrangeButton
                  onClick={() => {
                    if (!newName) return alert("Please enter a name!");
                    addNameOnContract();
                  }}
                >
                  Add Name
                </OrangeButton>
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
                {addLoading && <p className='animate-pulse'>Waiting for confirmation...</p>}
                {!addLoading && addNamesVisible && (
                  <p>Name added to array! Run Get All Names again to see the updated array!</p>
                )}
              </div>
            </div>

            {/* remove name button */}
            <div className='flex flex-row w-full'>
              <div className='flex flex-row'>
                <OrangeButton
                  onClick={() => {
                    if (!removeNameIndex) return alert("Please enter an index!");
                    removeNameOnContract();
                  }}
                >
                  Remove Name
                </OrangeButton>
                <input 
                  type="number"
                  min="0"
                  step="1"
                  value={removeNameIndex}
                  onChange={(e) => setRemoveNameIndex(e.target.value)}
                  placeholder="Enter an Index"
                  className="border px-2 py-1 rounded text-gray-600"
                />
              </div>

              <div 
                className='text-gray-600 items-center text-xl pl-3 flex'>
                {removeLoading && <p className='animate-pulse'>Waiting for confirmation...</p>}
                {!removeLoading && removeNamesVisible && (
                  <p>Name removed from array! Run Get All Names again to see the updated array!</p>
                )}
              </div>
            </div>

          </div>

            <div className='flex flex-col items-center mt-4 text-gray-600'>
              <p>View the deployed contract & transaction history on{' '}
                <a
                  className='font-semibold hover:underline hover:cursor-pointer'
                  href="https://sepolia.etherscan.io/address/0x16993AB19598182767e9a8cb8F78fF696F976Fd5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sepolia Etherscan!
                </a>
              </p>
            </div>

        </>
      )}

    </section>
  );
}
