export default function getNetworkInfo(chainId: number) {
  switch (chainId) {
    case 1:
      return { name: 'Ethereum', symbol: 'ETH' };
    case 5:
      return { name: 'Goerli', symbol: 'GTH' };
    case 56:
      return { name: 'BSC Mainnet', symbol: 'BNB' };
    case 61:
      return { name: 'Ethereum Classic', symbol: 'ETC' };
    case 63:
      return { name: 'Mordor', symbol: 'METC' };
    case 97:
      return { name: 'BSC Testnet', symbol: 'BNBT' };
    case 137:
      return { name: 'Polygon', symbol: 'MATIC' };
    case 1337:
      return { name: 'Local Hardhat Network', symbol: 'ETH' };
    case 80001:
      return { name: 'Mumbai', symbol: 'MATIC' };
    default:
      return { name: 'Not Recognized', symbol: 'NA' };;
  }
}
