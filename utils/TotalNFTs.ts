import Moralis from 'moralis';

export default async function getTotalNFTs(
  walletAddress: string,
  chainIdHex: number
) {
  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: apiKey,
    });
  }

  const moralisResponseWalletNFTs = await Moralis.EvmApi.nft.getWalletNFTs({
    address: walletAddress,
    chain: chainIdHex,
  });

  const nfts = moralisResponseWalletNFTs.toJSON();

  const moralisResponseWalletCollections =
    await Moralis.EvmApi.nft.getWalletNFTs({
      address: walletAddress,
      chain: chainIdHex,
    });

  const collections = moralisResponseWalletCollections.toJSON();
  return {
    nft_count: nfts.result ? nfts.result.length : 0,
    collection_count: collections.result ? collections.result.length : 0,
  };
}
