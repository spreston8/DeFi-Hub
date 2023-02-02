import { useEffect, useState } from 'react';
import type { Web3Params, NFTMetadata } from '@data/types';
import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import NftCard from '@components/NftCard';
import { getWalletNfts } from '@utils/WalletNFTs';

export default function nft({ web3Provider, chainIdHex }: Web3Params) {
  const [nftCollection, setNftCollection] = useState<NFTMetadata[]>([]);
  const [loadingCollection, setLoadingCollection] = useState(false);

  useEffect(() => {
    if (web3Provider && chainIdHex) {
      const signer = web3Provider.getSigner();

      const NFTMetadata = async () => {
        setLoadingCollection(true);
        const address = await signer.getAddress();
        const walletNFTS = await getWalletNfts(address, chainIdHex);
        setNftCollection(walletNFTS);
        setLoadingCollection(false);
      };

      NFTMetadata();
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

      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-2xl text-[#858585] dark:text-gray-400">My NFTs</h1>
      </div>

      <div className="flex flex-col items-center justify-center pt-12">
        {loadingCollection && <p>Fetching your NFT(s)...</p>}
        {nftCollection && (
          <>
            {nftCollection.map((nft: NFTMetadata) => (
              <NftCard key={nft.token_hash} nft={nft} />
            ))}
          </>
        )}
        {!loadingCollection && !nftCollection.length && <p>No NFT(s) found.</p>}
      </div>
    </>
  );
}
