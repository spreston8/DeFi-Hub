import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import { EventHandler, Web3Params } from '@data/types';
import { crossChainSwap } from '@utils/CrossChainSwap';
import Form from '@components/Form';
import Dropdown from '@components/Dropdown';
import { useEffect, useState } from 'react';
import getNetworkInfo from '@lib/Network';
import DoubleDownArrow from '../public/img/double_down_arrow.svg';

export default function Swap({
  connect,
  disconnect,
  web3Provider,
  chainId,
}: Web3Params) {
  const [codeInput, setCodeInput] = useState('');
  const [fromDropdown, setFromDropdown] = useState<string[]>([]);
  const [toDropdown, setToDropdown] = useState<string[]>([]);
  const [fromAsset, setFromAsset] = useState('TOKEN');
  const [toAsset, setToAsset] = useState('TOKEN');

  useEffect(() => {
    const keyDownHandler: any = async (event: EventHandler) => {
      if (event.key === ('Enter' as unknown)) {
        event.preventDefault();
        await onSubmit(codeInput);
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [codeInput]);

  useEffect(() => {
    if (web3Provider && chainId) {
      if (chainId === 1) {
        setFromDropdown(['ETHEREUM-USDC', 'ETHEREUM-USDT']);
        setToDropdown(['BSC-BUSD', 'BSC-USDT']);
      } else if (chainId === 5) {
        setFromDropdown(['GOERLI-USDC', 'GOERLI-USDT']);
        setToDropdown(['BSC_TESTNET-BUSD', 'BSC_TESTNET-USDT']);
      } else if (chainId === 56) {
        setFromDropdown(['BSC-BUSD', 'BSC-USDT']);
        setToDropdown(['ETHEREUM-USDC', 'ETHEREUM-USDT']);
      } else if (chainId === 97) {
        setFromDropdown(['BSC_TESTNET-USDT', 'BSC_TESTNET-BUSD']);
        setToDropdown(['GOERLI-USDC', 'GOERLI-USDT']);
      }
    }
  }, [chainId, web3Provider]);

  async function onSubmit(_prompt: string) {}

  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
        previewPath=""
      />

      {web3Provider && chainId ? (
        <div className="flex flex-col items-center bg-gray-600 my-12 mx-52 py-4 rounded-xl">
          <h1 className="text-5xl">Swap</h1>

          <div className="flex flex-col mt-6">
            {/* <p className="text-xl text-left pl-2">From:</p> */}
            <div className="flex flex-row items-center space-x-4 bg-gray-700 rounded-xl  p-4">
              <div className="">
                <Form
                  setValue={setCodeInput}
                  className="bg-gray-600 border-none rounded-md outline-none focus:ring-0 text-3xl"
                  placeholder="0"
                />
              </div>
              <Dropdown
                setItem={setFromAsset}
                defaultValue={fromAsset}
                dropdownItems={fromDropdown}
              />
            </div>
          </div>

          <DoubleDownArrow className="mt-6 h-10 w-10" />

          <div className="flex flex-col mt-6">
            {/* <p className="text-xl text-left pl-2">From:</p> */}
            <div className="flex flex-row items-center space-x-4 bg-gray-700 rounded-xl  p-4">
              <div className="">
                <Form
                  setValue={setCodeInput}
                  className="bg-gray-600 border-none rounded-md outline-none focus:ring-0 text-3xl"
                  placeholder="0"
                />
              </div>
              <Dropdown
                setItem={setToAsset}
                defaultValue={toAsset}
                dropdownItems={toDropdown}
              />
            </div>
          </div>

          <button
            className={
              'text-md px-3 py-2 w-auto mt-6 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
            }
            onClick={async () => {
              const signer = web3Provider.getSigner();
              await crossChainSwap(signer, chainId, fromAsset, toAsset, 10);
            }}
          >
            Swap
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center pt-12">
          <button
            className={
              'text-lg px-3 py-2 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
            }
            onClick={connect}
          >
            Connect Wallet
          </button>
        </div>
      )}
    </>
  );
}


