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

  const moralisResponse = await Moralis.EvmApi.nft.getWalletNFTs({
    address: walletAddress,
    chain: chainIdHex,
  });

  const nfts = moralisResponse.toJSON();
  return nfts.result ? nfts.result.length : 0;
}
