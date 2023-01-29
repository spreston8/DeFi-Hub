import headerNavLinks from '@data/headerNavLinks';
import Footer from './Footer';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';
import Link from 'next/link';
import siteMetadata from '@data/siteMetadata';
import { providers } from 'ethers';
// import { useCallback, useEffect, useReducer, useState } from 'react';
// import { initialState, reducer } from '@lib/Web3Modal';
// import providerContext from '@lib/ProviderContext';
// import { ethers } from 'ethers';

type HeaderLinks = {
  title: string;
  href: string;
};

function LayoutWrapper({
  children,
  connect,
  disconnect,
  web3Provider,
  address,
  network,
}) {
  return (
    <div className="overflow-x-hidden max-w-lg xs:max-w-xl md:max-w-3xl lg:max-w-7xl xl:max-w-[80%] px-4 mx-auto md:px-6 xl:px-0">
      <header className="flex items-center justify-between bg-slate-800 rounded-3xl mt-4 py-4 px-6">
        <Link href="/">
          <h1 className="text-3xl mb-1 mr-6">{siteMetadata.headerTitle}</h1>
        </Link>
        <div className="hidden sm:flex">
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
        <div className="flex items-center">
          <p className="pr-4 text-green-500">{network}</p>
          <p className="pr-4 text-blue-500">{address}</p>
          {web3Provider ? (
            <button
              className={
                'text-md px-3 py-2 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
              }
              onClick={disconnect}
            >
              Disconnect
            </button>
          ) : (
            <button
              className={
                'text-md px-3 py-2 rounded-lg text-white dark:text-black bg-[#0095D4] dark:bg-[#0095D4]'
              }
              onClick={connect}
            >
              Connect
            </button>
          )}
          <div className="flex">
            <ThemeSwitch />
          </div>
        </div>
      </header>
      <div className="pt-1">
        <MobileNav />
      </div>

      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  );
}

export default LayoutWrapper;
