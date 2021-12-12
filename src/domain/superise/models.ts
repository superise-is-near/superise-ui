import { number, string } from "mathjs";
import { Type } from "class-transformer";
type TokenId = string;
type Balance = number;
type PoolId = number;
type AccountId = string;
type TimeStamp = number;

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
  name: string = "";
  describe: string = "";
  cover: string = "";
  @Type(() => FtPrize)
  ft_prizes: FtPrize[] = [];
  @Type(() => NftPrize)
  nft_prizes: NftPrize[] = [];

  @Type(() => string)
  join_accounts: string[] = [];
  end_time: number = 0;
  @Type(() => Record)
  records: Record[] = [];
  ticket_price: string = "1";
  ticket_token_id: TokenId = "";
  finish: boolean = false;
}

export class NftPrize {
  contract: string;
  id: string;
}

export class FtPrize {
  token_id: string;
  amount: string;
  constructor(toke_id: string, amount: string) {
    this.token_id = toke_id;
    this.amount = amount;
  }
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
