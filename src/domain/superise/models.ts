import { number, string } from "mathjs";
import { Type } from "class-transformer";
import { TRANSFERABLE_AMOUNT } from "~domain/near/models";
export type TokenId = string;
export type Balance = string;
export type PoolId = number;
// near account like xxx.near
export type AccountId = string;
export type TimeStamp = number;
export type MilliTimeStamp = number;
export type PrizeId = number;

export class PrizePoolDisplay {
  id: number;
  creator_id: string;
  name: string;
  describe: string;
  cover: string;

  end_time: number;
  ticket_price: FtPrize;
  joiner_sum: number;
  finish: boolean;
}

export class PrizePool {
  id: number = 0;
  creator_id: string = "";
  ft_prizes: FtPrize[] = [];
  nft_prizes: NftPrize[] = [];
  join_accounts: string[] = [];
}

export type NftAsset = {
  contract_id: string;
  nft_id: string;
};

export type FtAsset = {
  contract_id: string;
  balance: TRANSFERABLE_AMOUNT;
};

export type NftPrize = {
  prize_id?: PrizeId;
  nft: NftAsset;
};

export interface FtPrize {
  prize_id?: PrizeId;
  ft: FtAsset;
}

class Account {
  fts: Map<TokenId, Balance>;
  // nfts: UnorderedSet<PrizeToken::NFT>,
  pools: Set<PoolId>;
}

export class Record {
  time: number;
  ft_prize: FtPrize;
  receiver: AccountId;
}
