import axios from "axios";

import {
  TwitterPool,
  TwitterPoolCreateParam,
  TwitterPoolDisplay,
} from "~domain/superise/twitter_giveaway/models";
import { wallet } from "~domain/near/global";
import getConfig from "~domain/near/config";
import { FinalExecutionOutcome } from "near-api-js/src/providers/index";
import {
  defaultGasAmount,
  FunctionCallOptions,
  NearGas,
} from "~domain/near/models";
import { PoolId } from "~domain/superise/models";
import {
  NearActions,
  NearTransaction,
  NearTransactionInfo,
  NearTransactionInfoFactory,
} from "~domain/near/transaction";
import { boolean } from "mathjs";

const config = getConfig();

export async function publish_pool(pool_id: PoolId) {
  return wallet
    .account()
    .functionCall(config.SUPERISE_CONTRACT_ID, "publish_pool", {
      pool_id: pool_id,
    });
}

export function update_twitter_pool(
  param: TwitterPoolCreateParam,
  option: FunctionCallOptions = defaultGasAmount
) {
  return wallet
    .account()
    .functionCall(
      config.SUPERISE_CONTRACT_ID,
      "update_twitter_pool",
      { param: param },
      option.gas,
      option.amount
    );
}

export async function update_twitter_pool_transaction(
  param: TwitterPoolCreateParam,
  pool_id: number,
  callback_url: string,
  publish: boolean = false
) {
  let nearTransaction = new NearTransaction();
  if (param.ft_prizes != undefined) {
    for (let ftPrize of param.ft_prizes) {
      let nearTransactionInfos: NearTransactionInfo[] =
        await NearTransactionInfoFactory.superise_deposit_ft_transactions(
          ftPrize.ft.contract_id,
          ftPrize.ft.balance
        );
      nearTransaction.add_transactions(nearTransactionInfos);
    }
  }

  if (param.nft_prizes != undefined) {
    param.nft_prizes.forEach((e) => {
      nearTransaction.add_action(
        e.nft.contract_id,
        NearActions.nft_transfer_call_action(e.nft.nft_id)
      );
    });
  }

  let superise_actions = publish
    ? [
        NearActions.superise_update_twitter_action(param, pool_id),
        NearActions.superise_publish_pool(pool_id),
      ]
    : [NearActions.superise_update_twitter_action(param, pool_id)];
  nearTransaction.add_actions(config.SUPERISE_CONTRACT_ID, superise_actions);
  await nearTransaction.execute(callback_url);
}

export async function create_twitter_pool_transaction(
  param: TwitterPoolCreateParam,
  callback_url: string
) {
  let nearTransaction = new NearTransaction();
  for (let ftPrize of param.ft_prizes) {
    let nearTransactionInfos: NearTransactionInfo[] =
      await NearTransactionInfoFactory.superise_deposit_ft_transactions(
        ftPrize.ft.contract_id,
        ftPrize.ft.balance
      );
    nearTransaction.add_transactions(nearTransactionInfos);
  }

  param.nft_prizes.forEach((e) => {
    nearTransaction.add_action(
      e.nft.contract_id,
      NearActions.nft_transfer_call_action(e.nft.nft_id)
    );
  });
  nearTransaction.add_action(
    config.SUPERISE_CONTRACT_ID,
    NearActions.superise_create_twitter_action(param)
  );
  await nearTransaction.execute(callback_url);
}

export function create_twitter_pool(
  param: TwitterPoolCreateParam,
  option: FunctionCallOptions = defaultGasAmount
): Promise<FinalExecutionOutcome> {
  return wallet
    .account()
    .functionCall(
      config.SUPERISE_CONTRACT_ID,
      "create_twitter_pool",
      { param: param },
      option.gas,
      option.amount
    );
}

export function join_twitter_pool(
  pool_id: number
): Promise<FinalExecutionOutcome> {
  return wallet
    .account()
    .functionCall(
      config.SUPERISE_CONTRACT_ID,
      "join_twitter_pool",
      { pool_id: pool_id },
      NearGas.TGas(10)
    );
}

export function view_twitter_prize_pool(pool_id: number): Promise<TwitterPool> {
  return wallet
    .account()
    .viewFunction(config.SUPERISE_CONTRACT_ID, "view_twitter_prize_pool", {
      pool_id: pool_id,
    });
}

export function view_twitter_prize_pool_list(): Promise<TwitterPoolDisplay[]> {
  return wallet
    .account()
    .viewFunction(
      config.SUPERISE_CONTRACT_ID,
      "view_twitter_prize_pool_list",
      {}
    );
}

export enum RequirmentType {
  TwitterFollow = "twitter_follow",
  TwitterRetweet = "twitter_retweet",
  TwitterLike = "twitter_like",
}

export type TwitterRequirment =
  | TwitterFollowRequirment
  | TwitterRetweetRequirment
  | TwitterRetweetRequirment;

export type TwitterRequirmentDisplay =
  | TwitterFollowRequirmentDisplay
  | TwitterRetweetRequirmentDisplay
  | TwitterLikeRequirmentDisplay;

export interface TwitterFollowRequirment {
  requirment_type: RequirmentType;
  screen_name: String;
}

export interface TwitterFollowRequirmentDisplay
  extends TwitterFollowRequirment {
  id?: string;
  status: "success" | "failed" | "pending";
  message?: string;
}

export interface TwitterRetweetRequirment {
  requirment_type: RequirmentType;
  tweet_link: string;
}

export interface TwitterRetweetRequirmentDisplay
  extends TwitterRetweetRequirment {
  id?: string;
  status: "success" | "failed";
  message?: string;
}

export interface TwitterLikeRequirment {
  requirment_type: RequirmentType;
  tweet_link: string;
}

export interface TwitterLikeRequirmentDisplay extends TwitterLikeRequirment {
  id?: string;
  status: "success" | "failed";
  message?: string;
}

export type RequirmentVerifyResult = {
  id: string;
  status: "success" | "failed";
  message?: string;
};

export type AxiosRequestResult = {
  data: {
    verifyResults: RequirmentVerifyResult[];
    addWhiteListSuccess: boolean;
    invalidate_twitter_session?: boolean;
  };
};

export async function verify_requirments(
  requirments: TwitterRequirmentDisplay[]
): Promise<AxiosRequestResult> {
  return axios.post("/verify-requirments", { requirments });
}

export type SendTweeetResponse = {
  data: {
    tweet_id: string;
    screen_name: string;
    status: "success" | "failed";
    message: string;
  };
};

export async function send_tweet(content: string): Promise<SendTweeetResponse> {
  return axios.post("/send-tweet", { content });
}

export type VerifySessionResponse = {
  data: {
    status: "success" | "failed";
  };
};
export async function verify_twitter_oauth_session(): Promise<VerifySessionResponse> {
  return axios.get("/verify-twitter-oauth-session");
}
