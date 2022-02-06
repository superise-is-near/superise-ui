import { FtAssets, TokenMetadata } from "~domain/near/ft/models";
import { toNonDivisibleNumber } from "~utils/numbers";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import getConfig from "~domain/near/config";
import {
  defaultGasAmount,
  FunctionCallOptions,
  NearAmount,
  NearGas,
  READABLE_AMOUNT,
  TRANSFERABLE_AMOUNT,
} from "~domain/near/models";
import { wallet } from "~domain/near/global";
import {
  AccountId, Assets,
  FtPrize,
  NftPrize,
  PrizePool,
  PrizePoolDisplay,
} from "~domain/superise/models";
import { TwitterPoolDisplay } from "~domain/superise/twitter_giveaway/models";
import { Account } from "near-api-js";
import {
  NearTransaction,
  NearTransactionInfoFactory,
} from "~domain/near/transaction";

let config = getConfig();

interface DepositNftOptions {
  contract_id: string;
  nft_id: string;
  msg?: string;
}
export function deposit_nft({
  contract_id,
  nft_id,
  msg = "",
}: DepositNftOptions): Promise<FinalExecutionOutcome> {
  return wallet.account().functionCall(
    contract_id,
    "nft_transfer_call",
    {
      receiver_id: config.SUPERISE_CONTRACT_ID,
      token_id: nft_id,
      approval_id: null,
      memo: null,
      msg: msg,
    },
    NearGas.TGas(30),
    NearAmount.ONE_YOCTO_NEAR
  );
}

interface DepositFtOptions {
  contract_id: string;
  decimals: number;
  amount: string;
  msg?: string;
}

export function deposit_ft({
  contract_id,
  decimals,
  amount,
  msg = "",
}: DepositFtOptions): Promise<FinalExecutionOutcome> {
  return wallet.account().functionCall(
    contract_id,
    "ft_transfer_call",
    {
      receiver_id: config.SUPERISE_CONTRACT_ID,
      amount: toNonDivisibleNumber(decimals, amount),
      msg,
    },
    NearGas.TGas(30),
    NearAmount.ONE_YOCTO_NEAR
  );
}

interface WithdrawOptions {
  token: TokenMetadata;
  amount: string;
  // unregister?: boolean;
}

export async function withdraw_ft_transaction(
  contract_id: AccountId,
  amount: TRANSFERABLE_AMOUNT,
  url?: string
) {
  let nearTransaction = new NearTransaction();
  NearTransactionInfoFactory.superise_withdraw_ft_transactions(
    contract_id,
    amount
  ).then((e) => nearTransaction.add_transactions(e));
  await nearTransaction.execute(url);
}

export function withdraw_ft({ token, amount }: WithdrawOptions) {
  return wallet.account().functionCall(
    config.SUPERISE_CONTRACT_ID,
    "withdraw_ft",
    {
      contract_id: token,
      amount: toNonDivisibleNumber(token.decimals, amount),
    },
    NearGas.TGas(30),
    NearAmount.ONE_YOCTO_NEAR
  );
}

export function withdraw_nft(contract_id: AccountId, nft_id: string) {
  return wallet.account().functionCall(
    config.SUPERISE_CONTRACT_ID,
    "withdraw_nft",
    {
      contract_id: contract_id,
      nft_id: nft_id,
    },
    NearGas.TGas(30),
    NearAmount.ONE_YOCTO_NEAR
  );
}

export type CreatePrizePoolParam = {
  name: string;
  describe: string;
  cover: string;
  ticket_prize: string;
  ticket_token_id: string;
  end_time: number;
  fts?: FtPrize[];
  nfs?: NftPrize[];
};

export function create_prize_pool(
  param: CreatePrizePoolParam,
  option: FunctionCallOptions = defaultGasAmount
): Promise<FinalExecutionOutcome> {
  return wallet
    .account()
    .functionCall(
      config.SUPERISE_CONTRACT_ID,
      "create_prize_pool",
      param,
      option.gas,
      option.amount
    );
}

// export function view_prize_pool(id: number): Promise<PrizePool> {
//   // return nearViewCall<number,PrizePool>(
//   //     config.SUPERISE_CONTRACT_ID,
//   //     'view_prize_pool',id,PrizePool,false) as Promise<PrizePool>;
//   return wallet
//     .account()
//     .viewFunction(config.SUPERISE_CONTRACT_ID, "view_prize_pool", {
//       pool_id: id,
//     });
// }

// export function view_prize_pool_list(): Promise<PrizePoolDisplay[]> {
//   return wallet
//     .account()
//     .viewFunction(config.SUPERISE_CONTRACT_ID, "view_prize_pool_list");
// }

export function view_account_assets(account_id: string): Promise<Assets> {
  return wallet.account()
    .viewFunction(
      config.SUPERISE_CONTRACT_ID,
      "view_account_assets",
      {account_id: account_id}
    )
}

export function view_account_balance(id: string): Promise<FtAssets> {
  return wallet
    .account()
    .viewFunction(config.SUPERISE_CONTRACT_ID, "view_account_balance", {
      account_id: id,
    });
}

export function join_pool(pool_id: number) {
  return wallet
    .account()
    .functionCall(config.SUPERISE_CONTRACT_ID, "join_pool", { pool_id });
}

export function unjoin_pool(pool_id: number) {
  return wallet
    .account()
    .functionCall(config.SUPERISE_CONTRACT_ID, "unjoin_pool", { pool_id });
}

export function view_user_pool(
  account_id: string
): Promise<TwitterPoolDisplay[]> {
  return Promise.resolve([]);
  // wallet
  //   .account()
  //   .viewFunction(config.SUPERISE_CONTRACT_ID, "view_user_pool", {
  //     account_id,
  //   });
}
