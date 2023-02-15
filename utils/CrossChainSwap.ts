import { ethers } from 'ethers';
import { Interface } from 'ethers/lib/utils';

// export async function crossChainSwap(
//   signer: ethers.Signer,
//   chainId: number,
//   fromAsset: string,
//   toAsset: string,
//   amount: number
// ) {
//   const address = await signer.getAddress();
//   const poolIds = getPoolIds(chainId);
// }

// export async function swap(
//   signer: ethers.Signer,
//   toChainId: number,
//   fromPoolId: number,
//   toPoolId: number,
//   address: string,
//   qty: number,
//   amountOutMin: number,
//   fee: number
// ) {
//   const abi = [
//     `function swap(
//       uint16 _dstChainId,
//       uint256 _srcPoolId,
//       uint256 _dstPoolId,
//       address payable _refundAddress,
//       uint256 _amountLD,
//       uint256 _minAmountLD,
//       lzTxObj memory _lzTxParams,
//       bytes calldata _to,
//       bytes calldata _payload
//   ) external payable;`,
//   ];

//   const routerContractAddress = addrNetwork.treasurySmartContract;
//   const tokenAddress = addrNetwork.nftSmartContract;
//   const gasMulitplier =
//     Number(process.env.NEXT_PUBLIC_GAS_MULTIPLIER) || 140000;

//   const routerContract = new ethers.Contract(treasuryAddress, abi, signer);
// }

// function getSwapAddrs(_chainId: number) {
//   switch (_chainId) {
//     case 1:
//       return {
//         stgChainId: 101,
//         routerAddr: '0x8731d54E9D02c286767d56ac03e8037C07e01e98',
//         routerEthAddr: '0x150f94B44927F078737562f0fcF3C95c01Cc2376',
//         explorer: 'https://etherscan.io/',
//       };
//     case 5:
//       return {
//         name: 'Goerli',
//         symbol: 'GTH',
//         explorer: 'https://goerli.etherscan.io/',
//       };
//     case 56:
//       return {
//         name: 'BSC Mainnet',
//         symbol: 'BNB',
//         explorer: 'https://bscscan.com/',
//       };
//     case 61:
//       return {
//         name: 'Ethereum Classic',
//         symbol: 'ETC',
//         explorer: 'https://blockscout.com/etc/mainnet/',
//       };
//     case 63:
//       return {
//         name: 'Mordor',
//         symbol: 'METC',
//         explorer: 'https://blockscout.com/etc/mordor',
//       };
//     case 97:
//       return {
//         name: 'BSC Testnet',
//         symbol: 'BNBT',
//         explorer: 'https://testnet.bscscan.com/',
//       };
//     case 137:
//       return {
//         name: 'Polygon',
//         symbol: 'MATIC',
//         explorer: 'https://polygonscan.com/',
//       };
//     case 1337:
//       return { name: 'Local Hardhat Network', symbol: 'ETH', explorer: 'NA' };
//     case 80001:
//       return {
//         name: 'Mumbai',
//         symbol: 'MATIC',
//         explorer: 'https://mumbai.polygonscan.com/',
//       };
//     default:
//       return { name: 'Not Recognized', symbol: 'NA', explorer: 'NA' };
//   }
// }

export async function crossChainSwap(signer: ethers.Signer) {
  const abi = new Interface([
    `function swap(
      uint16 _dstChainId, 
      uint256 _srcPoolId, 
      uint256 _dstPoolId, 
      address payable _refundAddress, 
      uint256 _amountLD, 
      uint256 _minAmountLD, 
      tuple(uint256 dstGasForCall, uint256 dstNativeAmount, bytes dstNativeAddr) _lzTxParams, 
      bytes calldata _to, 
      bytes calldata _payload
    ) external payable`,

    `function quoteLayerZeroFee(
      uint16 _dstChainId, 
      uint8 _functionType, 
      bytes calldata _toAddress, 
      bytes calldata _transferAndCallPayload, 
      tuple(uint256 dstGasForCall, uint256 dstNativeAmount, bytes dstNativeAddr) _lzTxParams
    ) external view returns (uint256, uint256)`,
  ]);

  // const abi = new Interface([
  //   `function swapETH(
  //     uint16 _dstChainId,
  //     address payable _refundAddress,
  //     bytes calldata _toAddress,
  //     uint256 _amountLD,
  //     uint256 _minAmountLD
  //   ) external payable`,
  // ]);

  const routerContractAddress = '0x7612aE2a34E5A363E137De748801FB4c86499152'; // Router
  const userAddress = await signer.getAddress();

  const routerContract = new ethers.Contract(
    routerContractAddress,
    abi,
    signer
  );

  // const quoteData = await routerContract.quoteLayerZeroFee(
  //   10102, // destination chainId
  //   1, // function type: see Bridge.sol for all types
  //   userAddress, // destination of tokens
  //   '0x', // payload, using abi.encode()
  //   {
  //     dstGasForCall: 0, // extra gas, if calling smart contract,
  //     dstNativeAmount: 0, // amount of dust dropped in destination wallet
  //     dstNativeAddr: userAddress, // destination wallet for dust
  //   }
  // );

  // const feeWei = quoteData[0];

  // swapping goerli-USDC to bsc_testnet-USDT
  const tx = await routerContract.swap(
    10102,
    1,
    2,
    userAddress,
    20,
    10,
    { dstGasForCall: 0, dstNativeAmount: 0, dstNativeAddr: '0x' },
    userAddress,
    '0x',
    { value: ethers.utils.parseEther('0.3'), }
  );

  console.log(tx);
}