import Moralis from 'moralis';
import type { NFTMetadata } from '@data/types';

export async function getWalletNfts(walletAddress: string, chainIdHex: number) {
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const NFT_COLLECTION: NFTMetadata[] = [];

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: apiKey,
    });
  }

  // fetch nfts, returns only the first 100
  const initialMoralisResponse = await Moralis.EvmApi.nft.getWalletNFTs({
    address: walletAddress,
    chain: chainIdHex,
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
        currNFTMetadata.image = jsonDescription.image;
        currNFTMetadata.attributes = jsonDescription.attributes;
      } else {
        currNFTMetadata.name = 'nft name not provided';
        currNFTMetadata.description = 'description not provided';
        currNFTMetadata.attributes = 'attributes not provided';
      }

      NFT_COLLECTION.push(currNFTMetadata);
    }
  }

  // // if there are more than 100 total nfts, fetch the rest and add to collection
  // const totalNfts = moralisResponse.pagination.total || 0;
  // const pageCount = Math.floor(totalNfts / 100);
  // let cursor = moralisResponse.pagination.cursor;

  // if (pageCount > 0) {
  //   for (let i = 0; i < pageCount; i++) {
  //     moralisResponse = await Moralis.EvmApi.nft.getWalletNFTs({
  //       address: userAddress,
  //       token_addresses: [contractAddress],
  //       chain: chainIdHex,
  //       limit: 100,
  //       cursor: cursor,
  //     });

  //     const nfts = moralisResponse.toJSON();
  //     if (nfts) {
  //       for (let i = 0; i < nfts.length; i++) {
  //         mRcontractAddress = nfts[i].tokenAddress;
  //         token_id = Number(nfts[i].tokenId);
  //         tokenMetadata = await getTokenMetadata(token_id);

  //         const blockNumberMinted = nfts[i].blockNumberMinted || '';
  //         const timestamp = (
  //           await web3Provider.getBlock(Number(blockNumberMinted))
  //         ).timestamp;

  //         if (chainIdHex === '0x38') {
  //           metadata = {
  //             name: tokenMetadata.name,
  //             description: tokenMetadata.description,
  //             image: tokenMetadata.image.replace(
  //               'ipfs://',
  //               'https://ipfs.io/ipfs/'
  //             ), // ToDo: this needs paramaterization
  //             attributes: tokenMetadata.attributes,
  //             contractAddress: mRcontractAddress,
  //             tokenId: token_id,
  //             tokenID: token_id,
  //             token_id: token_id,
  //             contractStandard: 'BEP-1155', // moralis returns ERC-1155
  //             mintTimestamp: timestamp,
  //           };
  //         } else {
  //           metadata = {
  //             name: 'test nft',
  //             description: 'test nft description',
  //             image: '/static/img/logo.svg',
  //             attributes: { object: {} },
  //             contractAddress: mRcontractAddress,
  //             tokenId: token_id,
  //             tokenID: token_id,
  //             token_id: token_id,
  //             contractStandard: 'BEP-1155', // moralis returns ERC-1155
  //             mintTimestamp: timestamp,
  //           };
  //         }

  //         // make sure we don't push the same nft
  //         if (!NFT_COLLECTION.includes(metadata)) {
  //           NFT_COLLECTION.push(metadata);
  //         } else {
  //           console.log(`Token ID: ${token_id} already in NFT COLLECTION`);
  //         }
  //       }
  //     }

  //     cursor = moralisResponse.pagination.cursor;
  //   }
  // }

  return NFT_COLLECTION;
}

// export async function getWalletNftCollections(
//   web3Provider: ethers.providers.Web3Provider,
//   chainID: number
// ) {
//   const NFT_COLLECTION: NFTMetadata[] = [];

//   switch (chainID) {
//     case 1:
//       // ETH MAINNET
//       return NFT_COLLECTION;
//     case 5:
//       // ETH GOERLI
//       return NFT_COLLECTION;
//     case 56:
//       // BSC MAINNET
//       NFT_COLLECTION = await getNftCollectionBSC(
//         web3Provider,
//         userAddress,
//         contractAddress,
//         '0x38'
//       );
//       return NFT_COLLECTION;
//     case 97:
//       //BSC TESTNET
//       NFT_COLLECTION = await getNftCollectionBSC(
//         web3Provider,
//         userAddress,
//         contractAddress,
//         '0x61'
//       );
//       return NFT_COLLECTION;
//     default:
//       return NFT_COLLECTION;
//   }
// }
