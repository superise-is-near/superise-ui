import {TokenMetadata} from "~domain/near/ft/models";
import {useEffect, useState} from "react";
import {getWhitelistedTokens} from "~domain/ref/methods";
import {ftGetTokenMetadata} from "~domain/near/ft/methods";
import {PrizePoolDisplay} from "~domain/superise/models";
import {view_prize_pool_list} from "~domain/superise/methods";

export const usePrizePoolDisplayLists = (): PrizePoolDisplay[] => {
    const [prizePoolDisplay, setPrizePoolDisplay] = useState<PrizePoolDisplay[]>([]);

    useEffect(() => {
        view_prize_pool_list()
            .then(setPrizePoolDisplay);
    }, []);

    return prizePoolDisplay;
};
