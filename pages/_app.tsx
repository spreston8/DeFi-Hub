import '../css/tailwind.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head.js';

import { SEO } from '@components/SEO';
import LayoutWrapper from '@components/LayoutWrapper';

import { useCallback, useEffect, useReducer, useState } from 'react';
import { initialState, reducer } from '@lib/Web3Modal';
import providerContext from '@lib/ProviderContext';
import { ethers } from 'ethers';
import { AppProps } from 'next/app';

function _App({ Component, pageProps }: AppProps) {
  const [network, setNetwork] = useState('Not Recognized');
  const [state, dispatch] = useReducer(reducer, initialState);
  const { provider, web3Provider, address, chainId } = state;
  const web3Modal = providerContext.getModal();

  const connect = useCallback(async function () {
    try {
      const provider = await providerContext.getProvider();
      const web3Provider = await providerContext.getWeb3Provider();
      const address = await providerContext.getAddress();
      const network = await providerContext.getNetwork();

      dispatch({
        type: 'SET_WEB3_PROVIDER',
        provider,
        web3Provider,
        address,
        chainId: network.chainId,
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const disconnect = useCallback(
    async function () {
      web3Modal.clearCachedProvider();
      if (provider?.disconnect && typeof provider.disconnect === 'function') {
        await provider.disconnect();
      }
      dispatch({
        type: 'RESET_WEB3_PROVIDER',
      });
    },
    [provider]
  );

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [connect]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        console.log('accountsChanged', accounts);
        dispatch({
          type: 'SET_ADDRESS',
          address: accounts[0],
        });
      };

      const handleChainChanged = (chainId: string) => {
        console.log('chainIdChanged', chainId);
        disconnect();
      };

      const handleDisconnect = (error: { code: number; message: string }) => {
        console.log('disconnect', error);
        disconnect();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      if (address && chainId) {
        const network = ethers.providers.getNetwork(chainId);
        setNetwork(network.name);
      }

      // Subscription Cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }
  }, [provider, disconnect]);

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper
        connect={connect}
        disconnect={disconnect}
        web3Provider={web3Provider}
        address={address}
        network={network}
      >
        <Component {...pageProps} web3Provider={web3Provider} />
      </LayoutWrapper>
    </>
  );
}

export default _App;
