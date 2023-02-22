import Moralis from 'moralis';
import type { NFTMetadata } from '@data/types';

export default async function getWalletNFTs(
  walletAddress: string,
  chainId: number
) {
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const OWNED_NFTS: NFTMetadata[] = [];

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: apiKey,
    });
  }

  try {
    // fetch nfts, returns only the first 100
    const initialMoralisResponse = await Moralis.EvmApi.nft.getWalletNFTs({
      address: walletAddress,
      chain: chainId,
    });

    const nfts = initialMoralisResponse.toJSON();

    // if there are owned nfts, add to collection
    if (nfts.result) {
      for (let i = 0; i < nfts.result.length; i++) {
        const currNFT = nfts.result[i];
        const currNFTMetadata: NFTMetadata = {
          name: '',
          description: '',
          image: '',
          attributes: {},
          token_id: '',
          token_hash: '',
          contract_type: '',
          contract_name: '',
          token_address: '',
          symbol: '',
        };

        currNFTMetadata.token_id = currNFT.token_id;
        currNFTMetadata.token_hash = currNFT.token_hash;
        currNFTMetadata.contract_type = currNFT.contract_type;
        currNFTMetadata.contract_name = currNFT.name;
        currNFTMetadata.token_address = currNFT.token_address;
        currNFTMetadata.symbol = currNFT.symbol;

        if (currNFT.metadata) {
          const jsonDescription = JSON.parse(currNFT.metadata);
          currNFTMetadata.name = jsonDescription.name;
          currNFTMetadata.description = jsonDescription.description;
          currNFTMetadata.image = jsonDescription.image.replace(
            'ipfs://',
            'https://ipfs.io/ipfs/'
          );
          currNFTMetadata.attributes = jsonDescription.attributes;
        } else {
          currNFTMetadata.name = 'no_name';
          currNFTMetadata.description = 'no_description';
          currNFTMetadata.attributes = 'no_attributes';
        }

        OWNED_NFTS.push(currNFTMetadata);
      }
    }

    // // if there are more than 100 total nfts, fetch the rest and add to collection
    const totalNfts = nfts.total || 0;
    const pageCount = Math.floor(totalNfts / 100);
    let cursor = nfts.cursor;

    if (pageCount > 0) {
      for (let i = 0; i < pageCount; i++) {
        const moralisResponse = await Moralis.EvmApi.nft.getWalletNFTs({
          address: walletAddress,
          chain: chainId,
          cursor: cursor,
        });

        const nfts = moralisResponse.toJSON();
        if (nfts.result) {
          for (let i = 0; i < nfts.result.length; i++) {
            const currNFT = nfts.result[i];
            const currNFTMetadata: NFTMetadata = {
              name: '',
              description: '',
              image: '',
              attributes: {},
              token_id: '',
              token_hash: '',
              contract_type: '',
              contract_name: '',
              token_address: '',
              symbol: '',
            };

            currNFTMetadata.token_id = currNFT.token_id;
            currNFTMetadata.token_hash = currNFT.token_hash;
            currNFTMetadata.contract_type = currNFT.contract_type;
            currNFTMetadata.contract_name = currNFT.name;
            currNFTMetadata.token_address = currNFT.token_address;
            currNFTMetadata.symbol = currNFT.symbol;

            if (currNFT.metadata) {
              const jsonDescription = JSON.parse(currNFT.metadata);
              currNFTMetadata.name = jsonDescription.name;
              currNFTMetadata.description = jsonDescription.description;
              currNFTMetadata.image = jsonDescription.image.replace(
                'ipfs://',
                'https://ipfs.io/ipfs/'
              );
              currNFTMetadata.attributes = jsonDescription.attributes;
            } else {
              currNFTMetadata.name = 'no_name';
              currNFTMetadata.description = 'no_description';
              currNFTMetadata.attributes = 'no_attributes';
            }

            // make sure we don't push the same nft
            if (!OWNED_NFTS.includes(currNFTMetadata)) {
              OWNED_NFTS.push(currNFTMetadata);
            } else {
              console.log(
                `Token ID: ${currNFT.token_id} already in NFT COLLECTION`
              );
            }
          }
        }

        cursor = moralisResponse.pagination.cursor;
      }
    }
  } catch (error) {
    console.log(error);
  }

  return OWNED_NFTS;
}
