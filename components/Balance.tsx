import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import type { Web3Params } from '@data/types';

export default function Balance({ web3Provider, chainId }: Web3Params) {
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    if (web3Provider) {
      const signer = web3Provider.getSigner();

      const getBalance = async () => {
        const _balance = await signer.getBalance();
        setBalance(ethers.utils.formatEther(_balance));
      };

      getBalance();
    } else {
      setBalance('0');
    }
  }, [web3Provider, chainId]);

  return (
    <>
      <div>
        <p>Account Balance: {balance}</p>
        <p>chain id: {chainId}</p>
      </div>
    </>
  );
}
