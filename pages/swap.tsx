import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import { Web3Params } from '@data/types';
import { crossChainSwap } from '@utils/CrossChainSwap';
import getTotalNFTs from '@utils/TotalNFTs';
import getWalletNFTCollections from '@utils/WalletNFTCollections';
import getWalletNFTs from '@utils/WalletNFTs';
import { ethers } from 'ethers';
import { useEffect } from 'react';

export default function swap({ web3Provider, chainIdHex }: Web3Params) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
        previewPath=""
      />

      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-2xl text-[#858585] dark:text-gray-400">
          Coming Soon
        </h1>
      </div>

      {web3Provider ? (
        <>
          <button
            className={
              'text-md px-3 py-2 w-auto mt-6 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
            }
            onClick={async () => {
              if (web3Provider && chainIdHex) {
                const signer = web3Provider.getSigner();
                await crossChainSwap(signer);
              } else {
              }
            }}
          >
            Swap
          </button>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
