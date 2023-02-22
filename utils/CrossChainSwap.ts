import { ethers } from 'ethers';
import { Interface } from 'ethers/lib/utils';

export async function crossChainSwap(
  signer: ethers.Signer,
  chainId: number,
  fromAsset: string,
  toAsset: string,
  amount: number
) {
  const ROUTER_ABI = new Interface([
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

  const routerContractAddress = getRouterAddress(chainId);
  const userAddress = await signer.getAddress();

  const routerContract = new ethers.Contract(
    routerContractAddress,
    ROUTER_ABI,
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

  const qty = ethers.BigNumber.from(amount);
  const qtyMin = qty.mul(993).div(1000);
  const approved = await approveTokens(
    signer,
    routerContractAddress,
    fromAsset,
    qty
  );
  // console.log(approved);

  const stgDestinationChainID = getSTGChainId(toAsset);
  const srcPoolId = getPoolId(fromAsset);
  const dstPoolId = getPoolId(toAsset);

  if (approved) {
    try {
      // swapping goerli-USDC to bsc_testnet-USDT
      const swapTx = await routerContract.swap(
        stgDestinationChainID,
        srcPoolId,
        dstPoolId,
        userAddress,
        qty,
        qtyMin,
        { dstGasForCall: 0, dstNativeAmount: 0, dstNativeAddr: '0x' },
        userAddress,
        '0x',
        { value: ethers.utils.parseEther('0.1') }
      );

      console.log(swapTx);
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('Approve tokens failed');
  }
}

async function approveTokens(
  signer: ethers.Signer,
  spender: string,
  fromAsset: string,
  qty: ethers.BigNumber
): Promise<boolean> {
  const TOKEN_ABI = new Interface([
    'function approve(address spender, uint256 amount) public virtual override returns (bool)',
  ]);

  const tokenContractAddress = getTokenAddress(fromAsset);
  const tokenContract = new ethers.Contract(
    tokenContractAddress,
    TOKEN_ABI,
    signer
  );

  try {
    const approveTx = await tokenContract.approve(spender, qty);
    console.log(approveTx);
    const transactionReceipt = await approveTx.wait();
    if (transactionReceipt.status === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// NOT using RouterETH
function getRouterAddress(chainId: number): string {
  switch (chainId) {
    case 1:
      return '0x8731d54E9D02c286767d56ac03e8037C07e01e98';
    case 5:
      return '0x7612aE2a34E5A363E137De748801FB4c86499152';
    case 56:
      return '0x4a364f8c717cAAD9A442737Eb7b8A55cc6cf18D8';
    case 97:
      return '0xbB0f1be1E9CE9cB27EA5b0c3a85B7cc3381d8176';
    default:
      return '';
  }
}

function getSTGChainId(toAsset: string): number {
  if (toAsset === 'ETHEREUM-USDC' || 'ETHEREUM-USDT') {
    return 101;
  } else if (toAsset === 'GOERLI-USDC' || 'GOERLI-USDT') {
    return 10121;
  } else if (toAsset === 'BSC-BUSD' || 'BSC-USDT') {
    return 102;
  } else if (toAsset === 'BSC_TESTNET-BUSD' || 'BSC_TESTNET-USDT') {
    return 10102;
  } else {
    return -1;
  }
}

function getPoolId(asset: string): number {
  if (asset === 'ETHEREUM-USDC' || 'GOERLI-USDC') {
    return 1;
  } else if (
    asset === 'ETHEREUM-USDT' ||
    'GOERLI-USDT' ||
    'BSC-USDT' ||
    'BSC_TESTNET-USDT'
  ) {
    return 2;
  } else if (asset === 'BSC-BUSD' || 'BSC_TESTNET-BUSD') {
    return 5;
  } else {
    return -1;
  }
}

// Using 'Pool.sol' addresses for MAINNET
function getTokenAddress(asset: string) {
  switch (asset) {
    case 'ETHEREUM-USDC':
      return '0xdf0770dF86a8034b3EFEf0A1Bb3c889B8332FF56';
    case 'ETHEREUM-USDT':
      return '0x38EA452219524Bb87e18dE1C24D3bB59510BD783';
    case 'GOERLI-USDC':
      return '0xDf0360Ad8C5ccf25095Aa97ee5F2785c8d848620';
    case 'GOERLI-USDT':
      return '0x5BCc22abEC37337630C0E0dd41D64fd86CaeE951';
    case 'BSC-BUSD':
      return '0x98a5737749490856b401DB5Dc27F522fC314A4e1';
    case 'BSC-USDT':
      return '0x9aA83081AA06AF7208Dcc7A4cB72C94d057D2cda';
    case 'BSC_TESTNET-BUSD':
      return '0x1010Bb1b9Dff29e6233E7947e045e0ba58f6E92e';
    case 'BSC_TESTNET-USDT':
      return '0xF49E250aEB5abDf660d643583AdFd0be41464EfD';
    default:
      return '';
  }
}
