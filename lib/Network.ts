export default function getNetworkName(chainIdHex: number) {
  switch (chainIdHex) {
    case 1:
      return 'Ethereum';
    case 5:
      return 'Goerli';
    case 56:
      return 'BSC Mainnet';
    case 61:
      return 'Ethereum Classic';
    case 63:
      return 'Mordor';
    case 97:
      return 'BSC Testnet';
    case 137:
      return 'Polygon';
    case 1337:
      return 'Local Hardhat Network';
    default:
      return 'Not Recognized';
  }
}
