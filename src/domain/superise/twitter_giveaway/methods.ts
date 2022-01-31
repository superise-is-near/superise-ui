import axios from "axios";

import {
  TwitterPool,
  TwitterPoolCreateParam,
  TwitterPoolDisplay,
} from "~domain/superise/twitter_giveaway/models";
import { wallet } from "~domain/near/global";
import getConfig from "~domain/near/config";
import { FinalExecutionOutcome } from "near-api-js/src/providers/index";
import { getAmount, getGas } from "~utils/near";
import { defaultGas, FunctionCallOptions } from "~domain/near/models";
import { exp } from "mathjs";

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
  tweet_link: String;
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
