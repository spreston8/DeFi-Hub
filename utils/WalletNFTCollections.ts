import Moralis from 'moralis';
import type { NFTCollection } from '@data/types';

export default async function getWalletNFTCollections(
  walletAddress: string,
  chainIdHex: number
) {
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const NFT_COLLECTIONS: NFTCollection[] = [];

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: apiKey,
    });
  }

  try {
    const moralisResponse = await Moralis.EvmApi.nft.getWalletNFTCollections({
      address: walletAddress,
      chain: chainIdHex,
    });

    const collections = moralisResponse.toJSON();

    if (collections.result) {
      for (let i = 0; i < collections.result.length; i++) {
        const currCollection = collections.result[i];
        const currNFTCollection: NFTCollection = {
          contract_type: '',
          collection_name: '',
          collection_symbol: '',
          token_address: '',
        };

        currNFTCollection.contract_type = currCollection.contract_type;
        currNFTCollection.collection_name =
          currCollection.name || 'Name not provided';
        currNFTCollection.collection_symbol = currCollection.symbol;
        currNFTCollection.token_address = currCollection.token_address;

        NFT_COLLECTIONS.push(currNFTCollection);
      }
    }

    const totalCollections = collections.total || 0;
    const pageCount = Math.floor(totalCollections / 100);
    let cursor = collections.cursor;

    if (pageCount > 0) {
      for (let i = 0; i < pageCount; i++) {
        const moralisResponse =
          await Moralis.EvmApi.nft.getWalletNFTCollections({
            address: walletAddress,
            chain: chainIdHex,
            cursor: cursor,
          });

        const collections = moralisResponse.toJSON();
        if (collections.result) {
          for (let i = 0; i < collections.result.length; i++) {
            const currCollection = collections.result[i];
            const currNFTCollection: NFTCollection = {
              contract_type: '',
              collection_name: '',
              collection_symbol: '',
              token_address: '',
            };

            currNFTCollection.contract_type = currCollection.contract_type;
            currNFTCollection.collection_name =
              currCollection.name || 'Name not provided';
            currNFTCollection.collection_symbol = currCollection.symbol;
            currNFTCollection.token_address = currCollection.token_address;

            if (!NFT_COLLECTIONS.includes(currNFTCollection)) {
              NFT_COLLECTIONS.push(currNFTCollection);
            } else {
              console.log(
                `NFT Collection: ${currNFTCollection.collection_name} already in NFT COLLECTION`
              );
            }
          }
        }
      }

      cursor = moralisResponse.pagination.cursor;
    }
  } catch (error) {
    console.log(error);
  }

  return NFT_COLLECTIONS;
}
