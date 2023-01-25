import headerNavLinks from '@data/headerNavLinks';
// import Logo from '../public/static/img/ai_logo.svg';
// import LogoWhite from '../public/static/img/ai_logo_white.svg';
import SectionContainer from './SectionContainer';
import Footer from './Footer';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import siteMetadata from '@data/siteMetadata';

type HeaderLinks = {
  title: string;
  href: string;
};

function LayoutWrapper({ children }) {
  return (
    <SectionContainer>
      <div className="flex flex-col">
        <header className="flex items-center justify-between py-4 sm:py-10">
          <Link href="/">
            <div className="flex items-center space-x-6">
              {/* <Logo className="dark:hidden w-20" />
              <LogoWhite className="hidden dark:block w-20" /> */}
              <h1 className="text-3xl">{siteMetadata.headerTitle}</h1>
            </div>
          </Link>
          <div className="flex items-center text-base">
            <div className="hidden sm:flex items-center">
              {headerNavLinks.map((link: HeaderLinks) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="font-medium text-[#5F5F5F] sm:p-4 dark:text-gray-100 hover:text-blue-400 dark:hover:text-blue-400"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex">
              <ThemeSwitch />
            </div>
            <div className="pt-1">
              <MobileNav />
            </div>
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
}

export default LayoutWrapper;
