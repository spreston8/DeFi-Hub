import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Link from 'next/link';
import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import getNetworkInfo from '@lib/Network';
import getWalletNFTCollections from '@utils/WalletNFTCollections';
import getTotalNFTs from '@utils/TotalNFTs';
import type {
  Web3Params,
  NFTCollection,
  NFTMetadata,
  TokenBalances,
} from '@data/types';
import getWalletNFTs from '@utils/WalletNFTs';
import getTokenBalances from '@utils/TokenBalances';

export default function Home({ web3Provider, chainIdHex }: Web3Params) {
  const [tokenBalances, setTokenBalances] = useState<TokenBalances[]>([]);
  const [totalNFTs, setTotalNFTs] = useState(0);
  const [walletNFTs, setWalletNFTs] = useState<NFTMetadata[]>([]);
  const [walletNFTCollections, setWalletNFTCollections] = useState<
    NFTCollection[]
  >([]);

  useEffect(() => {
    if (web3Provider && chainIdHex) {
      const signer = web3Provider.getSigner();

      const doAsyncFunction = async () => {
        const address = await signer.getAddress();

        const _tokenBalances = await getTokenBalances(signer, chainIdHex);
        setTokenBalances(_tokenBalances);

        const _totalNFTs = await getTotalNFTs(address, chainIdHex);
        setTotalNFTs(_totalNFTs.nft_count);

        const _walletNFTS = await getWalletNFTs(address, chainIdHex);
        setWalletNFTs(_walletNFTS);

        const _walletNFTCollections = await getWalletNFTCollections(
          address,
          chainIdHex
        );
        setWalletNFTCollections(_walletNFTCollections);
      };

      doAsyncFunction();
    } else {
      setTokenBalances([]);
      setTotalNFTs(0);
      setWalletNFTs([]);
      setWalletNFTCollections([]);
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

        <div className="flex flex-col bg-gray-600 my-12 px-20 py-4 rounded-xl">
          <h1 className="text-center text-3xl">Token Balances</h1>
          <span className="p-0.5 bg-purple-600 my-4"></span>

          {tokenBalances && (
            <>
              {tokenBalances.map((tokenBalance: TokenBalances) => (
                <p
                  key={tokenBalance.name}
                  className="text-3xl text-center py-4"
                >
                  {parseFloat(
                    ethers.utils.formatUnits(
                      tokenBalance.balance,
                      tokenBalance.decimals
                    )
                  ).toFixed(5)}{' '}
                  {tokenBalance.symbol}
                </p>
              ))}
            </>
          )}
        </div>

        <div className="flex flex-col bg-gray-600 mb-12 py-4 rounded-xl">
          <Link
            href="/nft"
            scroll={false}
            className="text-3xl text-center hover:text-blue-500 mx-auto"
          >
            {totalNFTs} Owned NFTs
          </Link>

          <span className="p-0.5 bg-purple-600 mx-10 my-4"></span>

          <div className="flex flex-row">
            <div className="flex flex-col px-16">
              <h1 className="text-center text-2xl">Top Collections</h1>
              <span className="p-0.5 bg-purple-600 my-4"></span>
              {walletNFTCollections && (
                <>
                  {walletNFTCollections.map((collection: NFTCollection) => (
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
              {walletNFTs && (
                <>
                  {walletNFTs.slice(0, 6).map((nft: NFTMetadata) => (
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
