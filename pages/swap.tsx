import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import { EventHandler, Web3Params } from '@data/types';
import { crossChainSwap } from '@utils/CrossChainSwap';
import Form from '@components/Form';
import Dropdown from '@components/Dropdown';
import { useEffect, useState } from 'react';

export default function swap({ web3Provider, chainIdHex }: Web3Params) {
  const [codeInput, setCodeInput] = useState('');

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

  async function onSubmit(_prompt: string) {}

  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
        previewPath=""
      />

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
            <Dropdown />
          </div>
        </div>

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
            <Dropdown />
          </div>
        </div>

        {web3Provider ? (
          <>
            <button
              className={
                'text-md px-3 py-2 w-auto mt-6 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
              }
              onClick={async () => {
                if (web3Provider && chainIdHex) {
                  const signer = web3Provider.getSigner();
                  await crossChainSwap(signer);
                } else {
                }
              }}
            >
              Swap
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
