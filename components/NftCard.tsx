import React from 'react';
import Image from 'next/legacy/image';
import Link from 'next/link';
import getNetworkInfo from '@lib/Network';
import type { NFTMetadata } from '@data/types';

export default function NftCard(props: { nft: NFTMetadata; chainId: number }) {
  const { nft, chainId } = props;

  return (
    <div className="flex bg-slate-700 rounded-3xl mb-14 drop-shadow-lg">
      <div className="flex flex-col">
        <div className="flex flex-row">
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
              <div className="h-24 w-24 md:h-48 md:w-48 lg:h-60 lg:w-60 relative">
                <Image
                  src="/img/error.png"
                  alt={`NFT Image for token ID: ${nft.token_id}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col py-6 px-1">
            <p className="text-3xl font-medium ">{nft.name}</p>

            <p className="text-lg pt-5">
              <strong>Description: </strong>
              {nft.description}
            </p>

            <p className="text-lg pt-4">
              <strong>Collection: </strong>
              <Link
                href={`${getNetworkInfo(chainId).explorer}address/${
                  nft.token_address
                }#code`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                {nft.contract_name}
              </Link>
            </p>

            <p className="text-lg pt-4">
              <strong>Token ID: </strong>
              {nft.token_id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
