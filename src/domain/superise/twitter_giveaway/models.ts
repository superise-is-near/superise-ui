import {
  AccountId,
  FtPrize,
  MilliTimeStamp,
  NftPrize,
  PrizePool,
} from "~domain/superise/models";
import { boolean, number } from "mathjs";

export type TwitterPoolDisplay = {
  id: number;
  name: string;
  describe: string;
  cover: string;
  status: TwitterPoolStatus;
  end_time: MilliTimeStamp;
  twitter_link: string;
};

export enum RequirmentType {
  TwitterFollow = "twitter_follow",
  TwitterRetweet = "twitter_retweet",
  TwitterLike = "twitter_like",
}

export interface TwitterFollowRequirmentInputValue {
  requirment_type: RequirmentType;
  screen_name: string;
  required: boolean;
}

export interface TwitterRetweetRequirmentInputValue {
  requirment_type: RequirmentType;
  tweet_link: string;
  required: boolean;
}

export interface TwitterLikeRequirmentInputValue {
  requirment_type: RequirmentType;
  tweet_link: String;
  required: boolean;
}

export type TwitterPoolCreateParam = {
  name: string | null;
  describe: string | null;
  cover: string | null;
  end_time: MilliTimeStamp | null;
  white_list: AccountId[] | null; // Option<Vec<AccountId>>,
  requirements: string | null;
  ft_prizes: FtPrize[] | null;
  nft_prizes: NftPrize[] | null;
  twitter_link: string | null;
};

export type TwitterPoolStatus = "PENDING" | "ONGOING" | "FINISHED" | "DELETED";
export type TwitterPool = {
  name: string;
  describe: string;
  cover: string;
  prize_pool: PrizePool;
  status: TwitterPoolStatus;
  end_time: MilliTimeStamp;
  create_time: MilliTimeStamp;
  updated_time: MilliTimeStamp;
  white_list: AccountId[];
  requirements: string; // requirmentsValue type
  // twitter_near_bind: HashMap<AccountId, TwitterAccount>,
  twitter_link: string;
  records: [];
};
