import Moralis from 'moralis';
import { ethers } from 'ethers';
import type { TokenBalances } from '@data/types';
import getNetworkInfo from '@lib/Network';

export default async function getTokenBalances(
  signer: ethers.Signer,
  chainIdHex: number
) {
  const TOKEN_BALANCES: TokenBalances[] = [];
  const nativeBalance = await signer.getBalance();
  const currNetwork = getNetworkInfo(parseInt(chainIdHex.toString()));

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
        chain: chainIdHex,
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
