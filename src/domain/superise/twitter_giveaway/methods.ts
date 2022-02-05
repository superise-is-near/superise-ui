import axios from "axios";

import {
  TwitterPool,
  TwitterPoolCreateParam,
  TwitterPoolDisplay,
} from "~domain/superise/twitter_giveaway/models";
import { wallet } from "~domain/near/global";
import getConfig from "~domain/near/config";
import { FinalExecutionOutcome } from "near-api-js/src/providers/index";
import { defaultGasAmount, FunctionCallOptions } from "~domain/near/models";
import { PoolId } from "~domain/superise/models";
import {
  NearActions,
  NearTransaction,
  NearTransactionInfoFactory,
} from "~domain/near/transaction";

const config = getConfig();

export function publish_pool(pool_id: PoolId) {
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
  callback_url: string
) {
  let nearTransaction = new NearTransaction();
  param.ft_prizes.forEach((e) => {
    NearTransactionInfoFactory.superise_deposit_ft_transactions(
      e.ft.contract_id,
      e.ft.balance
    ).then((e) => nearTransaction.add_transactions(e));
  });
  param.nft_prizes.forEach((e) => {
    nearTransaction.add_action(
      e.nft.contract_id,
      NearActions.nft_transfer_call_action(e.nft.nft_id)
    );
  });
  nearTransaction.add_action(
    config.SUPERISE_CONTRACT_ID,
    NearActions.superise_update_twitter_action(param)
  );
  await nearTransaction.execute(callback_url);
}

export async function create_twitter_pool_transaction(
  param: TwitterPoolCreateParam,
  callback_url: string
) {
  let nearTransaction = new NearTransaction();
  param.ft_prizes.forEach((e) => {
    NearTransactionInfoFactory.superise_deposit_ft_transactions(
      e.ft.contract_id,
      e.ft.balance
    ).then((e) => nearTransaction.add_transactions(e));
  });
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
