import Moralis from 'moralis';
import { ethers } from 'ethers';
import type { TokenBalance } from '@data/types';
import getNetworkInfo from '@lib/Network';

export default async function getTokenBalances(
  signer: ethers.Signer,
  chainId: number
) {
  const TOKEN_BALANCES: TokenBalance[] = [];
  const nativeBalance = await signer.getBalance();
  const currNetwork = getNetworkInfo(chainId);

  TOKEN_BALANCES.push({
    balance: nativeBalance.toString(),
    name: currNetwork.name,
    symbol: currNetwork.symbol,
    decimals: currNetwork.decimals,
  });

  const apiKey = process.env.NEXT_PUBLIC_MORALIS_API_KEY;
  const userAddress = await signer.getAddress();

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: apiKey,
    });
  }

  try {
    const moralisResponseWalletTokenBalances =
      await Moralis.EvmApi.token.getWalletTokenBalances({
        address: userAddress,
        chain: chainId,
      });

    const tokens = moralisResponseWalletTokenBalances.toJSON();
    // console.log(tokens);

    if (tokens) {
      for (let i = 0; i < tokens.length; i++) {
        const currToken = tokens[i];
        TOKEN_BALANCES.push({
          balance: currToken.balance,
          name: currToken.name,
          symbol: currToken.symbol,
          decimals: currToken.decimals,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }

  return TOKEN_BALANCES;
}
