import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { ethers } from 'ethers';
// import Link from '@components/Link';
// import NftCard from '@components/NftCard';
// import NetworkWarning from '@components/NetworkWarning';
// import VideoTutorial from '@components/VideoTutorial';
import providerContext from '@lib/ProviderContext';
// import { getNftCollection } from '@lib/NftCollection';
import { initialState, reducer } from '@lib/Web3Modal';
import siteMetadata from '@data/siteMetadata';
import type { NFTMetadata, Web3Params } from '@data/web3.types';

export const Dashboard = (): JSX.Element => {
  // const [nftCollection, setNftCollection] = useState<NFTMetadata[]>([]);
  // const [loadingCollection, setLoadingCollection] = useState(false);
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

  // useEffect(() => {
  //   if (address && chainId) {
  //     const NFTMetadata = async () => {
  //       setLoadingCollection(true);
  //       const collection = await getNftCollection(
  //         web3Provider,
  //         address,
  //         web3Params.contractAddress,
  //         chainId
  //       );
  //       setNftCollection(collection);
  //       setLoadingCollection(false);
  //     };
  //     NFTMetadata();
  //   }
  // }, [address]);

  return (
    <div>
      {web3Provider ? (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center bg-white dark:bg-gray-200 rounded-2xl mt-3 drop-shadow-lg max-w-[22rem] md:max-w-5xl">
            <p className="truncate text-lg pl-3 md:p-3 text-[#908f8f]">
              {address}
            </p>
            <button
              className="bg-gray-100 dark:bg-gray-300 rounded-2xl"
              onClick={disconnect}
            >
              <p className="text-lg text-indigo-500 font-semibold p-3">
                Disconnect
              </p>
            </button>
          </div>
          <p className="pt-6">Network: {network}</p>

          {/* {network === web3Params.defaultNetwork ? (
            <>
              <h1 className="text-xl md:text-md text-gray-500 dark:text-gray-400 pb-6 pt-16">
                Your NFT Viewer
              </h1>

              {loadingCollection && <p>Fetching your NFT(s)...</p>}
              {nftCollection && (
                <>
                  {nftCollection.map((nft: NFTMetadata) => (
                    <NftCard key={nft.tokenId} nft={nft} network={network} />
                  ))}
                </>
              )}
              {!loadingCollection && !nftCollection.length && (
                <p>No NFT(s) found.</p>
              )}
            </>
          ) : (
            <>
              <VideoTutorial />
              <NetworkWarning network={web3Params.defaultNetwork} />
            </>
          )}

          <div className="pt-8 pb-20">
            <Link
              className={
                'text-md p-3 w-auto rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
              }
              href={siteMetadata.nftBuyLink}
            >
              Buy Another NFT
            </Link>
          </div> */}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-white dark:bg-gray-200 rounded-2xl overflow-hidden py-2 px-40 mt-3 text-gray-500">
            none
          </div>
          {/* <VideoTutorial /> */}
          <button
            className={
              'text-md px-3 py-2 w-auto mt-6 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
            }
            onClick={connect}
          >
            Connect My Wallet
          </button>
        </div>
      )}
    </div>
  );
};
