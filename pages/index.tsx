import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import type { Web3Provider } from '@data/types';

export default function Home({ web3Provider }: Web3Provider) {
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
          Current Wallet Connected
        </h1>
        <p>{web3Provider ? web3Provider.network.name : <></>}</p>
      </div>
    </>
  );
}
