export default function getNetworkInfo(chainId: number) {
  switch (chainId) {
    case 1:
      return {
        name: 'Ethereum',
        symbol: 'ETH',
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
