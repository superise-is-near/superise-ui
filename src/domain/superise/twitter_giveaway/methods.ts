import {
  TwitterPool,
  TwitterPoolCreateParam,
} from "~domain/superise/twitter_giveaway/models";
import { wallet } from "~domain/near/global";
import getConfig from "~domain/near/config";
import { FinalExecutionOutcome } from "near-api-js/src/providers/index";
import { getAmount, getGas } from "~utils/near";
import { defaultGas, FunctionCallOptions } from "~domain/near/models";

const config = getConfig();
export function create_twitter_pool(
  param: TwitterPoolCreateParam,
  option: FunctionCallOptions = defaultGas
): Promise<FinalExecutionOutcome> {
  return wallet
    .account()
    .functionCall(
      config.SUPERISE_CONTRACT_ID,
      "create_twitter_pool",
      { param: param },
      getGas(option.gas),
      getAmount(option.amount)
    );
}

export function join_twitter_pool(
  pool_id: number
): Promise<FinalExecutionOutcome> {
  return wallet
    .account()
    .functionCall(config.SUPERISE_CONTRACT_ID, "join_twitter_pool", {
      pool_id: pool_id,
    });
}

export function view_twitter_prize_pool(pool_id: number): Promise<TwitterPool> {
  return wallet
    .account()
    .viewFunction(config.SUPERISE_CONTRACT_ID, "view_twitter_prize_pool", {
      pool_id: pool_id,
    });
}
