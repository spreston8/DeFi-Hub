import siteMetadata from '@data/siteMetadata';
import SocialIcon from '@components/social-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="absolute inset-x-0 bottom-2">
      <div className="flex flex-col items-center">
        <div className="flex mb-3 space-x-4">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          />
          <SocialIcon kind="gitlab" href={siteMetadata.gitlab} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          {/* <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} /> */}
        </div>
        <div className="flex mb-2 text-sm text-gray-500 space-x-2 dark:text-gray-400">
          <Link href="/">{siteMetadata.headerTitle} </Link>
        </div>
        {/* <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <div>
            Powered by:{' '}
            <Link
              href="https://openai.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI,
            </Link>
            <Link
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              NextJS
            </Link>{' '}
            &{' '}
            <Link
              href="https://reactjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </Link>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
