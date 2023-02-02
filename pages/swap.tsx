import siteMetadata from '@data/siteMetadata';
import { PageSeo } from '@components/SEO';

export default function swap() {
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
          Coming Soon
        </h1>
      </div>
    </>
  );
}
