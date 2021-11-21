import {FT, NFT} from "~domain/superise/model/PrizeToken";
import {serialize} from "class-transformer";
import {exp, string} from "mathjs";


export class NftPrize {
    prize_id: number;
    contract: string;
    id: string
}

export class FtPrize {
    prize_id: number;
    contract: string;
    sum: number
}

