import { THORChain } from '@xchainjs/xchain-thorchain';
import { ThorchainAMM, Wallet } from '@xchainjs/xchain-thorchain-amm';
import {
  CryptoAmount,
  EstimateSwapParams,
  Midgard,
  ThorchainCache,
  ThorchainQuery,
  Thornode,
  TxDetails,
} from '@xchainjs/xchain-thorchain-query';
import {
  assetAmount,
  assetFromStringEx,
  assetToBase,
} from '@xchainjs/xchain-util';
import BigNumber from 'bignumber.js';

function printTx(txDetails: TxDetails, input: CryptoAmount) {
  const expanded = {
    memo: txDetails.memo,
    expiry: txDetails.expiry,
    toAddress: txDetails.toAddress,
    txEstimate: {
      input: input.formatedAssetString(),
      totalFees: {
        inboundFee:
          txDetails.txEstimate.totalFees.inboundFee.formatedAssetString(),
        swapFee: txDetails.txEstimate.totalFees.swapFee.formatedAssetString(),
        outboundFee:
          txDetails.txEstimate.totalFees.outboundFee.formatedAssetString(),
        affiliateFee:
          txDetails.txEstimate.totalFees.affiliateFee.formatedAssetString(),
      },
      slipPercentage: txDetails.txEstimate.slipPercentage.toFixed(),
      netOutput: txDetails.txEstimate.netOutput.formatedAssetString(),
      waitTimeSeconds: txDetails.txEstimate.waitTimeSeconds.toFixed(),
      canSwap: txDetails.txEstimate.canSwap,
      errors: txDetails.txEstimate.errors,
    },
  };
  console.log(expanded);
}

/**
 * From asset to asset with no Affiliate address on testnet
 */
const doSingleSwap = async (tcAmm: ThorchainAMM, wallet: Wallet) => {
  try {
    const amount = 1000;
    const fromAsset = assetFromStringEx(`THOR.RUNE`);
    const toAsset = assetFromStringEx(`BTC.BTC`);

    // const fromChain = fromAsset.synth ? Chain.THORChain : fromAsset.chain
    const toChain = toAsset.synth ? THORChain : toAsset.chain;
    // const fromAddress = wallet.clients[fromChain].getAddress()
    const destinationAddress = wallet.clients[toChain].getAddress();

    console.log('Source address is: ' + destinationAddress);

    const swapParams: EstimateSwapParams = {
      input: new CryptoAmount(assetToBase(assetAmount(amount)), fromAsset),
      destinationAsset: toAsset!,
      destinationAddress,
      slipLimit: new BigNumber('0.03'), //optional
    };

    const outputCanSwap = await tcAmm.estimateSwap(swapParams);
    printTx(outputCanSwap, swapParams.input);
    if (outputCanSwap.txEstimate.canSwap) {
      const output = await tcAmm.doSwap(wallet, swapParams); // doSwap will also work with a double swap
      console.log(
        `Tx hash: ${output.hash},\n Tx url: ${output.url}\n WaitTime: ${output.waitTimeSeconds}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const main = async () => {
  const thorchainCache = new ThorchainCache(new Midgard(), new Thornode());
  const thorchainQuery = new ThorchainQuery(thorchainCache);
  const thorchainAmm = new ThorchainAMM(thorchainQuery);

  // random seed with no funds. Can use a wallet from xchain or your own.
  const seed =
    'rookie peanut glimpse blade wrong cereal capable liar divert shy region wrap';
  const wallet = new Wallet(seed, thorchainQuery); // creates keystore wallet. Wallet wraps the individual xchain clients

  await doSingleSwap(thorchainAmm, wallet);
};

main()
  .then(() => process.exit(0))
  .catch((err) => console.error(err));
