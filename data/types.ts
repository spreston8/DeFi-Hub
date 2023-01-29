import { providers } from 'ethers';

// ToDo:  keep these typing up to date from Moralis API changes
export type NFTMetadata = {
  name: string;
  description: string;
  image: string;
  attributes: { object: object };
  contractAddress: string;
  token_id?: string | number;
  tokenId: string | number;
  tokenID?: string | number;
  token_hash?: string;
  number?: string;
  contractStandard?: string;
  token_address?: string;
  tokenAddress?: string;
  contract_type?: string;
  owner_of?: string;
  block_number?: string;
  block_number_minted?: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  amount?: string | undefined;
  symbol?: string;
  last_token_uri_sync?: string;
  last_metadata_sync?: string;
  mintTimestamp: number;
};

export type StateType = {
  provider?: any;
  web3Provider?: providers.Web3Provider;
  address?: string;
  chainId?: number;
};

export type ActionType =
  | {
      type: 'SET_WEB3_PROVIDER';
      provider?: StateType['provider'];
      web3Provider?: StateType['web3Provider'];
      address?: StateType['address'];
      chainId?: StateType['chainId'];
    }
  | {
      type: 'SET_ADDRESS';
      address?: StateType['address'];
    }
  | {
      type: 'SET_CHAIN_ID';
      chainId?: StateType['chainId'];
    }
  | {
      type: 'RESET_WEB3_PROVIDER';
    };

export type Web3Provider = {
  web3Provider: providers.Web3Provider;
};

export type HeaderLinks = {
  title: string;
  href: string;
};
