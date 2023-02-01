import React from 'react';
import Image from 'next/legacy/image';
import type { NFTMetadata } from '@data/types';

export default function NftCard(props: { nft: NFTMetadata }) {
  const { nft } = props;

  return (
    <div>
      <div className="flex bg-white relative rounded-3xl overflow-hidden mb-14 drop-shadow-lg">
        <div className="pt-9 xs:pt-20 px-2 md:p-6 md:m-auto">
          <div className="h-24 w-24 md:h-48 md:w-48 lg:h-60 lg:w-60 relative">
            {nft.image ? (
              <>
                <Image
                  src={nft.image}
                  alt={`NFT Image for token ID: ${nft.token_id}`}
                  layout="fill"
                  objectFit="cover"
                  priority={true}
                />
              </>
            ) : (
              <Image
                src="/img/error.png"
                alt={`NFT Image for token ID: ${nft.token_id}`}
                layout="fill"
                objectFit="cover"
              />
            )}
          </div>
        </div>

        <div className="flex flex-col xs:max-w-xl md:py-2 lg:py-6 xs:px-2">
          <p className="pt-2 xs:pt-4 text-base xs:text-2xl lg:text-3xl font-medium dark:text-black font-gloria">
            NFT #{nft.token_id}
          </p>

          <div className="flex pt-1 xs:pt-4">
            <div className="text-gray-600 pr-1 text-[9px] xs:text-sm lg:text-md">
              <strong>Description: {nft.description}</strong>
            </div>
          </div>

          <div className="lg:flex pt-1 md:pt-4">
            <p className="font-bold text-gray-600 pr-1 text-[9px] xs:text-sm lg:text-md">
              Contract Address:{' '}
            </p>
            <p className="text-gray-600 text-[9px] xs:text-sm lg:text-md">
              {nft.token_address}
            </p>
          </div>
          <div className="flex pt-1 md:pt-4">
            <p className="font-bold text-gray-600 pr-1 text-[9px] xs:text-sm lg:text-md">
              Token ID:
            </p>
            <p className="text-gray-600 text-[9px] xs:text-sm lg:text-md">
              {nft.token_id}
            </p>
          </div>
          <div className="flex pb-2 pt-1 md:pt-4 md:py-0">
            <p className="font-bold text-gray-600 pr-1 text-[9px] xs:text-sm lg:text-md">
              Contract Standard:{' '}
            </p>
            <p className="text-gray-600 text-[9px] xs:text-sm lg:text-md">
              {nft.contract_type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
