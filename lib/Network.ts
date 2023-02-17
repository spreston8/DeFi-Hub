export default function getNetworkInfo(chainId: number) {
  switch (chainId) {
    case 1:
      return {
        name: 'Ethereum',
        symbol: 'ETH',
        explorer: 'https://etherscan.io/',
        decimals: 18,
      };
    case 5:
      return {
        name: 'Goerli',
        symbol: 'GETH',
        explorer: 'https://goerli.etherscan.io/',
        decimals: 18,
      };
    case 56:
      return {
        name: 'BSC Mainnet',
        symbol: 'BNB',
        explorer: 'https://bscscan.com/',
        decimals: 18,
      };
    case 61:
      return {
        name: 'Ethereum Classic',
        symbol: 'ETC',
        explorer: 'https://blockscout.com/etc/mainnet/',
        decimals: 18,
      };
    case 63:
      return {
        name: 'Mordor',
        symbol: 'METC',
        explorer: 'https://blockscout.com/etc/mordor',
        decimals: 18,
      };
    case 97:
      return {
        name: 'BSC Testnet',
        symbol: 'BNBT',
        explorer: 'https://testnet.bscscan.com/',
        decimals: 18,
      };
    case 137:
      return {
        name: 'Polygon',
        symbol: 'MATIC',
        explorer: 'https://polygonscan.com/',
        decimals: 18,
      };
    case 1337:
      return {
        name: 'Local Hardhat Network',
        symbol: 'ETH',
        explorer: 'NA',
        decimals: -1,
      };
    case 80001:
      return {
        name: 'Mumbai',
        symbol: 'MATIC',
        explorer: 'https://mumbai.polygonscan.com/',
        decimals: 18,
      };
    default:
      return {
        name: 'Not Recognized',
        symbol: 'NA',
        explorer: 'NA',
        decimals: -1,
      };
  }
}
