import React from 'react';
import Image from 'next/legacy/image';
import type { NFTMetadata } from '@data/types';

export default function NftCard(props: { nft: NFTMetadata }) {
  const { nft } = props;

  return (
    <div className="flex bg-slate-700 rounded-3xl mb-14 drop-shadow-lg w-3/5">
      <div className="pt-9 xs:pt-20 px-2 md:p-6">
        {nft.image ? (
          <>
            <div className="h-24 w-24 md:h-48 md:w-48 lg:h-60 lg:w-60 relative">
              <Image
                src={nft.image}
                alt={`NFT Image for token ID: ${nft.token_id}`}
                layout="fill"
                objectFit="cover"
                priority={true}
              />
            </div>
          </>
        ) : (
          <div className="h-24 w-24 md:h-48 md:w-48 lg:h-20 lg:w-20 relative">
            <Image
              src="/img/error.png"
              alt={`NFT Image for token ID: ${nft.token_id}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col xs:max-w-xl md:py-2 lg:py-6 xs:x-4">
        <p className="pt-2 xs:pt-4 text-base xs:text-2xl lg:text-3xl font-medium dark:text-white">
          {nft.name}
        </p>

        <div className="flex pt-1 xs:pt-4">
          <div className="text-gray-100 pr-1 text-[9px] xs:text-sm lg:text-lg">
            <strong>Description: {nft.description}</strong>
          </div>
        </div>

        <div className="lg:flex pt-1 md:pt-4">
          <p className="font-bold text-gray-100 pr-1 text-[9px] xs:text-sm lg:text-lg">
            Contract Address:{' '}
          </p>
          <p className="text-gray-100 text-[9px] xs:text-sm lg:text-lg">
            {nft.token_address}
          </p>
        </div>
        <div className="flex pt-1 md:pt-4">
          <p className="font-bold text-gray-100 pr-1 text-[9px] xs:text-sm lg:text-lg">
            Token ID:
          </p>
          <p className="text-gray-100 text-[9px] xs:text-sm lg:text-lg">
            {nft.token_id}
          </p>
        </div>
        <div className="flex pb-2 pt-1 md:pt-4 md:py-0">
          <p className="font-bold text-gray-100 pr-1 text-[9px] xs:text-sm lg:text-lg">
            Contract Standard:{' '}
          </p>
          <p className="text-gray-100 text-[9px] xs:text-sm lg:text-lg">
            {nft.contract_type}
          </p>
        </div>
      </div>
    </div>
  );
}
