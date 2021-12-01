import {useEffect, useState} from "react";
import {TokenBalancesView, TokenMetadata} from "~domain/near/ft/models";
import {getTokenBalances, getUserRegisteredTokens} from "~domain/ref/methods";
import {ftGetTokenMetadata} from "~domain/near/ft/methods";


export const useTokenBalances = () => {
    const [balances, setBalances] = useState<TokenBalancesView>();

    useEffect(() => {
        getTokenBalances()
            .then(setBalances)
            .catch(() => setBalances({}));
    }, []);

    return balances;
};


export const useUserRegisteredTokens = () => {
    const [tokens, setTokens] = useState<TokenMetadata[]>([]);

    useEffect(() => {
        getUserRegisteredTokens()
            .then((tokenIds) => {
                console.log("tokenIds", tokenIds);
                return Promise.all(tokenIds.map((tokenId) => ftGetTokenMetadata(tokenId)))
                }
            )
            .then(setTokens).catch(e=>console.log("getUserRegisteredTokens error", e));
    }, []);

    return tokens;
};
