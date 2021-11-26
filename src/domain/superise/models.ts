import {number, string} from "mathjs";
import {Type} from "class-transformer";

export class PrizePoolDisplay {
    id: number;
    owner_id: string;
    name: string;
    describe: string;
    cover: string;
    @Type(() => FtPrize)
    ft_prizes: Map<number, FtPrize>;
    @Type(() => NftPrize)
    nft_prizes: Map<number, NftPrize>;

    publish: boolean;
    begin_time: number;
    end_time: number;
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

    @Type(()=>number)
    winner_list: Map<string, number>;
}

export class NftPrize {
    contract: string;
    id: string
}

export class FtPrize {
    contract: string;
    sum: number
}

class Account {
    fts: Map<string, number>;
    // nfts: UnorderedSet<PrizeToken::NFT>,
    pools: Set<number>
    history: Map<number, Record>
}

export class Record {
    id: number;
    end_time: Date;
    ft_prize: FtPrize;
}
