import '../css/tailwind.css';

import { DefaultSeo } from 'next-seo';
import Head from 'next/head.js';

import { SEO } from '@components/SEO';
import LayoutWrapper from '@components/LayoutWrapper';

function _App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...SEO} />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </>
  );
}

export default _App;
