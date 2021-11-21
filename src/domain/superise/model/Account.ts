import {FtPrize} from "~domain/superise/model/Prize";

export class Record {
    id: number;
    end_time: Date;
    ft_prize: FtPrize;
}
class Account {
    fts: Map<string, number>;
    // nfts: UnorderedSet<PrizeToken::NFT>,
    pools: Set<number>
    history: Map<number, Record>
}