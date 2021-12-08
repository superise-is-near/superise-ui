import { number, string } from "mathjs";
import { Type } from "class-transformer";

export class PrizePoolDisplay {
  id: number;
  creator_id: string;
  name: string;
  describe: string;
  cover: string;

  end_time: number;
  ticket_price: FtPrize;
  joiner_sum: number;
}

export class PrizePool {
  id: number;
  creator_id: string;
  name: string;
  describe: string;
  cover: string;
  @Type(() => FtPrize)
  ft_prizes: FtPrize[];
  @Type(() => NftPrize)
  nft_prizes: NftPrize[];

  @Type(() => string)
  join_accounts: string[];
  publish: boolean;
  end_time: number;
  @Type(() => Record)
  records: Record[]


  ticket_price: FtPrize;

  @Type(() => number)
  winner_list: Map<string, number>;
}

export class NftPrize {
  contract: string;
  id: string;
}

export class FtPrize {
  token_id: string;
  amount: string;
  constructor(toke_id: string,amount: string) {
    this.token_id = toke_id;
    this.amount = amount;
  }
}

type TokenId = string;
type Balance = number;
type PoolId = number;
type AccountId = string;

class Account {
  fts: Map<TokenId, Balance>;
  // nfts: UnorderedSet<PrizeToken::NFT>,
  pools: Set<PoolId>;
}

export class Record {
  time: number;
  ft_prize: FtPrize;
  receiver: AccountId
}
