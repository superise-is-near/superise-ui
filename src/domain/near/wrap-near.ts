import { utils } from "near-api-js";
import getConfig from "./config";
import { TokenMetadata } from "~domain/near/ft/models";
import { REF_FI_CONTRACT_ID } from "~domain/ref/constants";
import {
  executeMultipleTransactions,
  ONE_YOCTO_NEAR,
  Transaction,
  wallet,
} from "~domain/near/global";
import { RefFiFunctionCallOptions } from "~domain/ref/methods";
import { ftGetStorageBalance } from "~domain/near/ft/methods";

export const { WRAP_NEAR_CONTRACT_ID, SUPERISE_CONTRACT_ID } = getConfig();
export const NEW_ACCOUNT_STORAGE_COST = "0.00125";

export const wnearMetadata: TokenMetadata = {
  id: "wNEAR",
  name: "wNEAR",
  symbol: "wNEAR",
  decimals: 24,
  icon: "https://i.postimg.cc/4xx2KRxt/wNEAR.png",
};

export const nearMetadata: TokenMetadata = {
  id: "NEAR",
  name: "NEAR",
  symbol: "NEAR",
  decimals: 24,
  icon: "https://near.org/wp-content/themes/near-19/assets/img/brand-icon.png",
};

export const wrapNear = async (amount: string) => {
  const transactions: Transaction[] = [];
  // const neededStorage = await checkTokenNeedsStorageDeposit(
  //   WRAP_NEAR_CONTRACT_ID
  // );
  // if (neededStorage) {
  //   transactions.push({
  //     receiverId: REF_FI_CONTRACT_ID,
  //     functionCalls: [
  //       {
  //         methodName: 'storage_deposit',
  //         args: {
  //           account_id: wallet.getAccountId(),
  //           registration_only: false,
  //         },
  //         gas: '30000000000000',
  //         amount: neededStorage,
  //       },
  //     ],
  //   });
  // }

  const actions: RefFiFunctionCallOptions[] = [];
  const balance = await ftGetStorageBalance(WRAP_NEAR_CONTRACT_ID);

  if (!balance || balance.total === "0") {
    actions.push({
      methodName: "storage_deposit",
      args: {},
      gas: "30000000000000",
      amount: NEW_ACCOUNT_STORAGE_COST,
    });
  }

  actions.push({
    methodName: "near_deposit",
    args: {},
    gas: "50000000000000",
    amount,
  });

  actions.push({
    methodName: "ft_transfer_call",
    args: {
      receiver_id: SUPERISE_CONTRACT_ID,
      amount: utils.format.parseNearAmount(amount),
      msg: "",
    },
    gas: "50000000000000",
    amount: ONE_YOCTO_NEAR,
  });

  transactions.push({
    receiverId: WRAP_NEAR_CONTRACT_ID,
    functionCalls: actions,
  });

  return executeMultipleTransactions(transactions);
};

export const unwrapNear = async (amount: string) => {
  // const transactions: Transaction[] = [];
  //
  // const balance = await ftGetStorageBalance(WRAP_NEAR_CONTRACT_ID);
  //
  // if (!balance || balance.total === '0') {
  //   transactions.push({
  //     receiverId: WRAP_NEAR_CONTRACT_ID,
  //     functionCalls: [
  //       {
  //         methodName: 'storage_deposit',
  //         args: {},
  //         gas: '30000000000000',
  //         amount: NEW_ACCOUNT_STORAGE_COST,
  //       },
  //     ],
  //   });
  // }
  //
  // transactions.push({
  //   receiverId: REF_FI_CONTRACT_ID,
  //   functionCalls: [
  //     withdrawAction({
  //       tokenId: WRAP_NEAR_CONTRACT_ID,
  //       amount: utils.format.parseNearAmount(amount),
  //     }),
  //   ],
  // });
  //
  // transactions.push({
  //   receiverId: WRAP_NEAR_CONTRACT_ID,
  //   functionCalls: [
  //     {
  //       methodName: 'near_withdraw',
  //       args: { amount: utils.format.parseNearAmount(amount) },
  //       amount: ONE_YOCTO_NEAR,
  //     },
  //   ],
  // });
  //
  // return executeMultipleTransactions(transactions);
};
