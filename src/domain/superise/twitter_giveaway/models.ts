import {
  AccountId,
  FtPrize,
  MilliTimeStamp,
  NftPrize,
  PrizePool,
} from "~domain/superise/models";

export type TwitterPoolCreateParam = {
  name: string;
  describe: string;
  cover: string;
  end_time: MilliTimeStamp;
  white_list: AccountId[]; // Option<Vec<AccountId>>,
  requirement: string[];
  ft_prizes: FtPrize[];
  nft_prizes: NftPrize[];
  join_accounts: AccountId;
  twitter_link: string;
};

export type TwitterPool = {
  name: string;
  describe: string;
  cover: string;
  prize_pool: PrizePool;
  finish: boolean;
  end_time: MilliTimeStamp;
  white_list: AccountId[];
  requirement: String[];
  // twitter_near_bind: HashMap<AccountId, TwitterAccount>,
  twitter_link: String;
  records: [];
};
