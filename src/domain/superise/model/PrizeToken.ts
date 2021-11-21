
export class PrizeToken {
    contract: string;
}

export class NFT extends PrizeToken  {
    id: string;
}
export class FT extends PrizeToken {
    sum: number
}

