import siteMetadata from '@data/siteMetadata';
import SocialIcon from '@components/social-icons';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-40 pb-6">
      <div className="flex flex-col items-center">
        <div className="flex mb-3 space-x-4">
          <SocialIcon
            kind="mail"
            href={`mailto:${siteMetadata.email}`}
            size={6}
          />
          <SocialIcon kind="gitlab" href={siteMetadata.gitlab} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
        <div className="flex mb-2 text-sm text-gray-500 space-x-2 dark:text-gray-400">
          <Link href="/">{siteMetadata.headerTitle} </Link>
        </div>
      </div>
    </footer>
  );
}
