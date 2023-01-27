import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';

export default function stake() {
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        url={siteMetadata.siteUrl}
        previewPath=""
      />
    </>
  );
}
