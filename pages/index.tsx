import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import getNetworkInfo from '@lib/Network';
import getWalletNFTCollections from '@utils/WalletNFTCollections';
import getTotalNFTs from '@utils/TotalNFTs';
import type { Web3Params, NFTCollection, NFTMetadata } from '@data/types';
import getWalletNFTs from '@utils/WalletNFTs';

export default function Home({ web3Provider, chainIdHex }: Web3Params) {
  const [balance, setBalance] = useState('0');
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [NFTs, setNFTs] = useState<NFTMetadata[]>([]);
  const [NFTCollections, setNFTCollections] = useState<NFTCollection[]>([]);

  useEffect(() => {
    if (web3Provider && chainIdHex) {
      const signer = web3Provider.getSigner();

      const doAsyncFunction = async () => {
        const _balance = await signer.getBalance();
        setBalance(ethers.utils.formatEther(_balance));

        const address = await signer.getAddress();
        const _totalNFTs = await getTotalNFTs(address, chainIdHex);
        setTotalNFTs(_totalNFTs);

        const walletNFTS = await getWalletNFTs(address, chainIdHex);
        setNFTs(walletNFTS);

        const _NFTCollections = await getWalletNFTCollections(
          address,
          chainIdHex
        );
        setNFTCollections(_NFTCollections);
      };

      doAsyncFunction();
    } else {
      setBalance('0');
      setTotalNFTs(0);
      setNFTs([]);
      setNFTCollections([]);
    }
  }, [web3Provider, chainIdHex]);

  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
        previewPath=""
      />

      <div className="flex flex-col bg-gray-800 items-center rounded-2xl mx-20 my-12">
        <h1 className="text-4xl text-gray-400 dark:text-gray-200 pt-6">
          Account Overview
        </h1>

        <div className="flex bg-gray-600 my-12 py-4 rounded-xl">
          <h1 className="text-3xl px-20 text-center">
            <>
              Balance: {parseFloat(balance).toFixed(4)}{' '}
              {
                getNetworkInfo(
                  parseInt(chainIdHex ? chainIdHex.toString() : '0')
                ).symbol
              }
            </>
          </h1>
        </div>

        <div className="flex flex-col bg-gray-600 mb-12 py-4 rounded-xl">
          <Link
            href="/nft"
            className="text-3xl text-center hover:text-blue-500"
          >
            {totalNFTs} Owned NFTs
          </Link>

          <span className="p-0.5 bg-purple-600 mx-10 my-4"></span>

          <div className="flex flex-row">
            <div className="flex flex-col px-16">
              <h1 className="text-center text-2xl">Top Collections</h1>
              <span className="p-0.5 bg-purple-600 my-4"></span>
              {NFTCollections && (
                <>
                  {NFTCollections.map((collection: NFTCollection) => (
                    <ul className="list-disc" key={collection.token_address}>
                      <li className="text-xl">{collection.collection_name}</li>
                    </ul>
                  ))}
                </>
              )}
            </div>

            <div className="flex flex-col px-16">
              <h1 className="text-center text-2xl">Top NFTs</h1>
              <span className="p-0.5 bg-purple-600 my-4"></span>
              {NFTs && (
                <>
                  {NFTs.slice(0, 6).map((nft: NFTMetadata) => (
                    <ul className="list-disc" key={nft.token_hash}>
                      <li className="text-xl">{nft.name}</li>
                    </ul>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
