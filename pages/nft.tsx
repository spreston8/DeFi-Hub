import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Web3Params, NFTMetadata, TotalNFTs } from '@data/types';
import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import NftCard from '@components/NftCard';
import getWalletNfts from '@utils/WalletNFTs';
import getTotalNFTs from '@utils/TotalNFTs';

export default function nft({
  connect,
  disconnect,
  web3Provider,
  chainIdHex,
}: Web3Params) {
  const [totalNFTs, setTotalNFTs] = useState<TotalNFTs>({
    nft_count: 0,
    collection_count: 0,
  });
  const [NFTs, setNFTs] = useState<NFTMetadata[]>([]);
  const [loadingNFTs, setLoadingNFTs] = useState(false);

  useEffect(() => {
    if (web3Provider && chainIdHex) {
      const signer = web3Provider.getSigner();

      const doAsyncFunction = async () => {
        const address = await signer.getAddress();

        const _totalNFTs = await getTotalNFTs(address, chainIdHex);
        setTotalNFTs(_totalNFTs);

        setLoadingNFTs(true);
        const walletNFTS = await getWalletNfts(address, chainIdHex);
        setNFTs(walletNFTS);
        setLoadingNFTs(false);
      };

      doAsyncFunction();
    } else {
      setNFTs([]);
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

      {web3Provider ? (
        <div className="flex flex-col items-center bg-gray-600 mb-12 py-4 mx-20 my-20 rounded-xl">
          <h1 className="text-5xl text-center mt-4">
            {totalNFTs.nft_count} Owned NFTs in {totalNFTs.collection_count}{' '}
            Collections
          </h1>

          <div className="p-0.5 bg-purple-600 mt-4 mb-10 w-4/5"></div>

          {loadingNFTs && <p>Fetching your NFT(s)...</p>}
          {NFTs && (
            <>
              <div className="grid grid-cols-2 gap-x-10 mx-6">
                {NFTs.map((nft: NFTMetadata) => (
                  <NftCard
                    key={nft.token_hash}
                    nft={nft}
                    chainIdHex={chainIdHex}
                  />
                ))}
              </div>
            </>
          )}
          {!loadingNFTs && !NFTs.length && <p className="">No NFT(s) found.</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center pt-12">
          <button
            className={
              'text-lg px-3 py-2 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
            }
            onClick={connect}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </>
  );
}
