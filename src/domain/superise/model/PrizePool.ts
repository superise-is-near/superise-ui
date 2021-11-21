import {FtPrize, NftPrize} from "~domain/superise/model/Prize";
import {Type} from "class-transformer";
import {string} from "mathjs";

class PrizePool {
    owner_id: string;
    name: string;
    describe: string;
    cover: string;
    @Type(()=>FtPrize)
    ft_prizes: Map<number, FtPrize>;
    @Type(()=>NftPrize)
    nft_prizes: Map<number, NftPrize>;

    @Type(()=>string)
    join_accounts: string[];
    publish: boolean;
    begin_time: number;
    end_time: number;
    is_end: boolean;
}