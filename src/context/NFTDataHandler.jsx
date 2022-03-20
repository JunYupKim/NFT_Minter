import React, { useEffect, useState } from 'react';
import { fs } from 'fs';
import { ethers } from "ethers";
import { create, initial } from 'lodash';
import { pinJSONToIPFS } from '../utils/Pinata';
import axios from 'axios';
import Web3Modal from 'web3modal';

require('dotenv').config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_KEY);
const contractABI = require("../utils/NFTMarket.json");
const contractAddress = "0x949854e9AD8Da063ef5BDaE3DDb68BC6E8C61F32";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
}

export const TransactionProvider = ({ children }) => {

  const [connectedAccount, setConnectedAccount] = useState('');
  const [formData, setFormData] = useState({ name: '', amount: '', NFTFile: '', description: '' });
  const [fileUrl, setFileUrl] = useState(''); 


  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  }

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert("Please install metamask");

    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setConnectedAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setConnectedAccount(accounts[0]);

    } catch (error) {
      console.error(error.message);
      alert("Error");
    }
  }

  const mintNFT = async () => {

    const { name, amount, NFTFile, description } = formData;


    try {
      if (!ethereum) return alert("Please install metamask");

      const pinataResponse = await pinJSONToIPFS(formData);
      if (!pinataResponse.success) {
        return alert("😢 Something went wrong while uploading your tokenURI.");
      }
      const tokenURI = pinataResponse.pinataUrl;

      window.contract = await new web3.eth.Contract(contractABI, contractAddress);

      const transactionParameters = {
        to: contractAddress, 
        from: window.ethereum.selectedAddress,
        'data': window.contract.methods.createToken(tokenURI).encodeABI() 
      };

      try {
        const txHash = await window.ethereum
          .request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
          });
        return alert("✅ SUCCESS!!! Check out your transaction on Etherscan: https://rinkeby.etherscan.io/tx/" + txHash);

      } catch (error) {
        return alert("😥 Something went wrong: " + error.message);
      }

    } catch (error) {
      console.error(error.message);
      alert("Error")
    }
  }

  const fetchNFTs = async (setNFTs) => {
    const account = connectedAccount; 
    const nfts = await web3.alchemy.getNfts({ owner: account, contractAddresses: [contractAddress] })
    console.log(nfts)
    const nft_map = await Promise.allSettled(nfts.ownedNfts.map(async (nft) => {
      return {
        owner: account,
        name: nft.metadata.name,
        description: nft.metadata.description,
        price: nft.metadata.amount,
        time: nft.timeLastUpdated.substring(0, 10),
        file: nft.metadata.NFTFile
      }
    }));

    if (nfts.ownedNfts.length){
      setNFTs(nft_map)
    }else{
      setNFTs(null); 
    } 
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, setFormData, mintNFT, fetchNFTs }}>
      {children}
    </TransactionContext.Provider>
  );

}