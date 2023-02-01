import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import Balance from '@components/Balance';
import type { Web3Params } from '@data/types';

export default function Home({ web3Provider, chainIdHex }: Web3Params) {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
        previewPath=""
      />

      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-2xl text-[#858585] dark:text-gray-400">
          Account Overview
        </h1>
        <Balance web3Provider={web3Provider} chainIdHex={chainIdHex} />
      </div>
    </>
  );
}
