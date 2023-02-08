import { ethers } from 'ethers';

export async function crossChainSwap(
  signer: ethers.Signer,
  chainId: number,
  fromAsset: string,
  toAsset: string,
  amount: number
) {
  const address = await signer.getAddress();
  const poolIds = getPoolIds(chainId);
}

export async function swap(
  signer: ethers.Signer,
  toChainId: number,
  fromPoolId: number,
  toPoolId: number,
  address: string,
  qty: number,
  amountOutMin: number,
  fee: number
) {
  const abi = [
    `function swap(
      uint16 _dstChainId,
      uint256 _srcPoolId,
      uint256 _dstPoolId,
      address payable _refundAddress,
      uint256 _amountLD,
      uint256 _minAmountLD,
      lzTxObj memory _lzTxParams,
      bytes calldata _to,
      bytes calldata _payload
  ) external payable;`,
  ];

  const routerContractAddress = addrNetwork.treasurySmartContract;
  const tokenAddress = addrNetwork.nftSmartContract;
  const gasMulitplier =
    Number(process.env.NEXT_PUBLIC_GAS_MULTIPLIER) || 140000;

  const routerContract = new ethers.Contract(treasuryAddress, abi, signer);
}

function getSwapAddrs(_chainId: number) {
  switch (_chainId) {
    case 1:
      return {
        stgChainId: 101,
        routerAddr: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
        routerEthAddr: '0x150f94B44927F078737562f0fcF3C95c01Cc2376',
        explorer: 'https://etherscan.io/',
      };
    case 5:
      return {
        name: 'Goerli',
        symbol: 'GTH',
        explorer: 'https://goerli.etherscan.io/',
      };
    case 56:
      return {
        name: 'BSC Mainnet',
        symbol: 'BNB',
        explorer: 'https://bscscan.com/',
      };
    case 61:
      return {
        name: 'Ethereum Classic',
        symbol: 'ETC',
        explorer: 'https://blockscout.com/etc/mainnet/',
      };
    case 63:
      return {
        name: 'Mordor',
        symbol: 'METC',
        explorer: 'https://blockscout.com/etc/mordor',
      };
    case 97:
      return {
        name: 'BSC Testnet',
        symbol: 'BNBT',
        explorer: 'https://testnet.bscscan.com/',
      };
    case 137:
      return {
        name: 'Polygon',
        symbol: 'MATIC',
        explorer: 'https://polygonscan.com/',
      };
    case 1337:
      return { name: 'Local Hardhat Network', symbol: 'ETH', explorer: 'NA' };
    case 80001:
      return {
        name: 'Mumbai',
        symbol: 'MATIC',
        explorer: 'https://mumbai.polygonscan.com/',
      };
    default:
      return { name: 'Not Recognized', symbol: 'NA', explorer: 'NA' };
  }
}
