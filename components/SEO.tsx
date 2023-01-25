import { NextSeo } from 'next-seo';
import siteMetadata from '@data/siteMetadata';
import PropTypes from 'prop-types';

export const SEO = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: 'website',
    locale: 'English',
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: siteMetadata.title,
        width: 1200,
        height: 600,
      },
    ],
  },
  twitter: {
    handle: siteMetadata.twitter,
    site: siteMetadata.twitter,
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: siteMetadata.author,
    },
  ],
};

export const PageSeo = ({ title, description, url, previewPath }) => (
  <NextSeo
    title={`${title}`}
    description={description}
    canonical={url}
    openGraph={{
      url,
      title,
      description,
      images: [
        {
          url: previewPath,
          alt: title,
          width: 1200,
          height: 600,
        },
      ],
    }}
  />
);

PageSeo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  previewPath: PropTypes.string.isRequired,
};
