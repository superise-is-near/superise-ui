// doc: https://docs.near.org/docs/concepts/transaction
import {
  Action,
  functionCall,
  FunctionCall,
  Transaction,
} from "near-api-js/lib/transaction";
import BN from "bn.js";
import { RefFiViewFunctionOptions } from "~domain/ref/methods";
import { config, near, wallet } from "~domain/near/global";
import {
  API_AMOUNT,
  NearAmount,
  NearGas,
  READABLE_AMOUNT,
  TRANSFERABLE_AMOUNT,
} from "~domain/near/models";
import { NEAR_ICON } from "~domain/near/ft/metadata";
import { ftGetTokenMetadata } from "~domain/near/ft/methods";
import { AccountId } from "~domain/superise/models";
import { STORAGE_TO_REGISTER_WITH_FT } from "~domain/near/storage/models";
import { ftGetStorageBalance } from "~domain/near/storage/methods";
import { SUPERISE_CONTRACT_ID } from "~domain/near/wrap-near";
import {
  FinalExecutionStatus,
  FinalExecutionStatusBasic,
} from "near-api-js/src/providers/provider";
import { TwitterPoolCreateParam } from "~domain/superise/twitter_giveaway/models";
import { toNonDivisibleNumber } from "~utils/numbers";

export interface NearViewFunctionInfo {
  methodName: string;
  args?: object;
}

export interface NearFunctionCallInfo extends NearViewFunctionInfo {
  gas?: string;
  amount?: string;
}

export type NearActionInfo = NearFunctionCallInfo;

export interface NearTransactionInfo {
  receiverId: string;
  actions: Action[];
}

export class NearTransaction {
  transaction_infos: NearTransactionInfo[] = [];

  constructor() {}

  public static async parseTxOutcome<T>(
    tx_hash: string,
    account_id: AccountId = wallet.getAccountId()
  ): Promise<T> {
    return near.connection.provider.txStatus(tx_hash, account_id).then((e) => {
      if ((e.status as FinalExecutionStatus).SuccessValue !== undefined) {
        let decodedValue: string = Buffer.from((e.status as FinalExecutionStatus).SuccessValue!, "base64").toString();
        return JSON.parse(decodedValue) as T;
      } else {
        return Promise.reject(
          `Fail to parse ${account_id} ${tx_hash} error,FinalExecutionOutcome is ${e}`
        );
      }
    });
  }

  public async execute(callback_url?: string) {
    let transactions = await Promise.all(
      this.transaction_infos.map((ts) =>
        wallet.createTransaction({
          actions: ts.actions,
          receiverId: ts.receiverId,
        })
      )
    );

    return wallet.requestSignTransactions(transactions, callback_url);
  }

  public add_action(receiver_id: string, action: Action): NearTransaction {
    this.transaction_infos.push({ receiverId: receiver_id, actions: [action] });
    return this;
  }

  public add_transactions(
    transactions: NearTransactionInfo[]
  ): NearTransaction {
    this.transaction_infos = [...this.transaction_infos, ...transactions];
    return this;
  }

  public add_transaction(transaction: NearTransactionInfo): NearTransaction {
    this.transaction_infos.push(transaction);
    return this;
  }
}

export class NearActions {
  static ft_deposit_action(
    account_id: AccountId = wallet.getAccountId(),
    registrationOnly = false
  ): Action {
    return functionCall(
      "storage_deposit",
      {
        account_id: account_id,
        registration_only: registrationOnly,
      },
      NearGas.TGas(20),
      STORAGE_TO_REGISTER_WITH_FT
    );
  }

  static ft_withdraw_action(
    contract_id: AccountId,
    amount: TRANSFERABLE_AMOUNT
  ): Action {
    return functionCall(
      "withdraw_ft",
      {
        receiver_id: config.SUPERISE_CONTRACT_ID,
        amount: amount,
      },
      NearGas.TGas(30),
      NearAmount.ONE_YOCTO_NEAR
    );
  }

  static ft_transfer_call_action(
    contract_id: AccountId,
    amount: TRANSFERABLE_AMOUNT
  ): Action {
    return functionCall(
      "ft_transfer_call",
      {
        receiver_id: config.SUPERISE_CONTRACT_ID,
        amount: amount,
        msg: null,
      },
      NearGas.TGas(50),
      NearAmount.ONE_YOCTO_NEAR
    );
  }

  static nft_transfer_call_action(nft_id: string): Action {
    return functionCall(
      "nft_transfer_call",
      {
        receiver_id: config.SUPERISE_CONTRACT_ID,
        token_id: nft_id,
      },
      NearGas.TGas(50),
      NearAmount.ONE_YOCTO_NEAR
    );
  }

  static superise_create_twitter_action(
    create_param: TwitterPoolCreateParam
  ): Action {
    return functionCall(
      "create_twitter_pool",
      { param: create_param },
      NearGas.MAX_GAS,
      NearAmount.ONE_YOCTO_NEAR
    );
  }

  static superise_update_twitter_action(
    create_param: TwitterPoolCreateParam
  ): Action {
    return functionCall(
      "update_twitter_pool",
      { param: create_param },
      NearGas.MAX_GAS,
      NearAmount.ONE_YOCTO_NEAR
    );
  }
}

export abstract class NearTransactionInfoFactory {
  public static async superise_withdraw_ft_transactions(
    contract_id: AccountId,
    amount: TRANSFERABLE_AMOUNT
  ): Promise<NearTransactionInfo[]> {
    let res: NearTransactionInfo[] = [];
    const depositBalance = await ftGetStorageBalance(
      contract_id,
      wallet.getAccountId()
    );
    if (!depositBalance || depositBalance.total === "0") {
      res.push({
        receiverId: contract_id,
        actions: [NearActions.ft_deposit_action()],
      });
    }
    res.push({
      receiverId: SUPERISE_CONTRACT_ID,
      actions: [NearActions.ft_withdraw_action(contract_id, amount)],
    });
    return res;
  }

  public static async superise_deposit_ft_transactions(
    contract_id: AccountId,
    amount: TRANSFERABLE_AMOUNT
  ): Promise<NearTransactionInfo[]> {
    let actions: Action[] = [];

    // check ft contract deposit balance first
    const depositBalance = await ftGetStorageBalance(
      contract_id,
      SUPERISE_CONTRACT_ID
    );
    if (!depositBalance || depositBalance.total === "0") {
      actions.push(NearActions.ft_deposit_action(SUPERISE_CONTRACT_ID));
    }
    actions.push(NearActions.ft_transfer_call_action(contract_id, amount));

    return [
      {
        receiverId: contract_id,
        actions: actions,
      },
    ];
  }
}
