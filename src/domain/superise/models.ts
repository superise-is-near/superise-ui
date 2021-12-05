import { number, string } from "mathjs";
import { Type } from "class-transformer";

export class PrizePoolDisplay {
  id: number;
  owner_id: string;
  name: string;
  describe: string;
  cover: string;

  publish: boolean;
  begin_time: number;
  end_time: number;
  ticket_price: { [tokenId: string]: string };
}

export class PrizePool {
  id: number;
  owner_id: string;
  name: string;
  describe: string;
  cover: string;
  @Type(() => FtPrize)
  ft_prizes: Map<number, FtPrize>;
  @Type(() => NftPrize)
  nft_prizes: Map<number, NftPrize>;

  @Type(() => string)
  join_accounts: string[];
  publish: boolean;
  begin_time: number;
  end_time: number;

  ticket_price: { [tokenId: string]: string };

  @Type(() => number)
  winner_list: Map<string, number>;
}

export class NftPrize {
  contract: string;
  id: string;
}

export class FtPrize {
  token_id: string;
  amount: number;
}

type TokenId = string;
type Balance = number;
type PoolId = number;

class Account {
  fts: Map<TokenId, Balance>;
  // nfts: UnorderedSet<PrizeToken::NFT>,
  pools: Set<PoolId>;
  // poolId: 参加的场次  todo PoolId 多余,修改Record
  history: Set<Record>;
}

export class Record {
  id: PoolId;
  end_time: Date;
  ft_prize?: FtPrize;
}
