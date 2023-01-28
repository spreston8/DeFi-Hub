import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';
import { Web3ModalComponent } from '@components/Web3Modal';

export default function nft() {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
        previewPath=""
      />

      <Web3ModalComponent />
    </>
  );
}
