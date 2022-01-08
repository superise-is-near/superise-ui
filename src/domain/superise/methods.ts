import { getAmount, getGas } from "~utils/near";
import { TokenBalancesView, TokenMetadata } from "~domain/near/ft/models";
import { toNonDivisibleNumber } from "~utils/numbers";
import { FinalExecutionOutcome } from "near-api-js/lib/providers";
import getConfig from "~domain/near/config";
import { FunctionCallOptions } from "~domain/near/models";
import { nearViewCall, ONE_YOCTO_NEAR, wallet } from "~domain/near/global";
import {
  FtPrize,
  NftPrize,
  PrizePool,
  PrizePoolDisplay,
} from "~domain/superise/models";

let config = getConfig();

interface DepositOptions {
  token: TokenMetadata;
  amount: string;
  msg?: string;
}

export function deposit_ft({
  token,
  amount,
  msg = "",
}: DepositOptions): Promise<FinalExecutionOutcome> {
  return wallet.account().functionCall(
    token.id,
    "ft_transfer_call",
    {
      receiver_id: config.SUPERISE_CONTRACT_ID,
      amount: toNonDivisibleNumber(token.decimals, amount),
      msg,
    },
    getGas("300000000000000"),
    getAmount(ONE_YOCTO_NEAR)
  );
}

interface WithdrawOptions {
  token: TokenMetadata;
  amount: string;
  // unregister?: boolean;
}

export function withdraw_ft({ token, amount }: WithdrawOptions) {
  return wallet.account().functionCall(
    config.SUPERISE_CONTRACT_ID,
    "withdraw_ft",
    {
      receiver_id: config.SUPERISE_CONTRACT_ID,
      amount: toNonDivisibleNumber(token.decimals, amount),
    },
    getGas(ONE_YOCTO_NEAR),
    getAmount("100000000000000")
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
const defaultGas: FunctionCallOptions = {
  gas: "300000000000000",
  amount: ONE_YOCTO_NEAR,
};

export function create_prize_pool(
  param: CreatePrizePoolParam,
  option: FunctionCallOptions = defaultGas
): Promise<FinalExecutionOutcome> {
  return wallet
    .account()
    .functionCall(
      config.SUPERISE_CONTRACT_ID,
      "create_prize_pool",
      param,
      getGas(option.gas),
      getAmount(option.amount)
    );
}

export function view_prize_pool(id: number): Promise<PrizePool> {
  // return nearViewCall<number,PrizePool>(
  //     config.SUPERISE_CONTRACT_ID,
  //     'view_prize_pool',id,PrizePool,false) as Promise<PrizePool>;
  return wallet
    .account()
    .viewFunction(config.SUPERISE_CONTRACT_ID, "view_prize_pool", {
      pool_id: id,
    });
}

export function view_prize_pool_list(): Promise<PrizePoolDisplay[]> {
  return wallet
    .account()
    .viewFunction(config.SUPERISE_CONTRACT_ID, "view_prize_pool_list");
}

export function view_account_balance(id: string): Promise<TokenBalancesView> {
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
): Promise<PrizePoolDisplay[]> {
  return wallet
    .account()
    .viewFunction(config.SUPERISE_CONTRACT_ID, "view_user_pool", {
      account_id,
    });
}
