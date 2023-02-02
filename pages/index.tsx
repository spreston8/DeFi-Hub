import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import getNetworkInfo from '@lib/Network';
import getWalletNFTCollections from '@utils/WalletNFTCollections';
import getTotalNFTs from '@utils/TotalNFTs';
import type { Web3Params, NFTCollection } from '@data/types';

export default function Home({ web3Provider, chainIdHex }: Web3Params) {
  const [balance, setBalance] = useState('0');
  const [totalNFTs, setTotalNFTs] = useState(0);
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

        const _NFTCollections = await getWalletNFTCollections(
          address,
          chainIdHex
        );
        setNFTCollections(_NFTCollections);
      };

      doAsyncFunction();
    } else {
      setBalance('0');
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

        <div className="flex bg-gray-600 mb-12 py-4 rounded-xl">
          <Link
            href="/nft"
            className="text-3xl px-20 text-center hover:text-blue-500"
          >
            {totalNFTs} Owned NFTs
          </Link>
        </div>

        {NFTCollections && (
          <>
            {NFTCollections.map((collection: NFTCollection) => (
              <React.Fragment key={collection.token_address}>
                <div className="flex bg-gray-600 mb-20 py-4 rounded-xl">
                  <h1 className="text-3xl px-20 text-center hover:text-blue-500">
                    {collection.collection_name}
                  </h1>
                </div>
              </React.Fragment>
            ))}
          </>
        )}

        {/* <div className="grid grid-cols-2 gap-10 pt-12 pb-6 w-full px-10">
          <div className="bg-gray-600 rounded-xl h-80">
            <h1 className='text-2xl'>Balance</h1>
          </div>
          <div className="bg-gray-600 rounded-xl h-80">1</div>
          <div className="bg-gray-600 rounded-xl h-80">1</div>
          <div className="bg-gray-600 rounded-xl h-80">1</div>
        </div> */}
      </div>
    </>
  );
}
