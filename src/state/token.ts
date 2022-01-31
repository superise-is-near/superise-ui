import { useCallback, useEffect, useRef, useState } from "react";
import { TokenBalancesView, TokenMetadata } from "~/src/domain/near/ft/models";
import {
  getWhitelistedTokens,
  getTokenBalances,
  getUserRegisteredTokens,
} from "~/src/domain/ref/methods";
import {
  ftGetBalance,
  ftGetTokenMetadata,
  getDepositableBalance,
} from "~/src/domain/near/ft/methods";
import {
  toPrecision,
  toReadableNumber,
  toRoundedReadableNumber,
} from "~/src/utils/numbers";
import { toRealSymbol } from "~/src/utils/token";
import { wallet } from "~/src/domain/near/global";
import { view_account_balance } from "~/src/domain/superise/methods";

interface TokenData {
  tokensData: TokenMetadata[];
  loading: boolean;
  trigger: any;
}
export const useTokensData = (
  tokens: TokenMetadata[],
  balances?: TokenBalancesView
): TokenData => {
  const [count, setCount] = useState(0);
  const [result, setResult] = useState<TokenMetadata[]>([]);
  const fetchIdRef = useRef(0);
  const setResultAtIndex = (data: TokenMetadata, index: number) => {
    setResult((oldResults) => {
      const newResults = [...oldResults];
      newResults[index] = data;
      return newResults;
    });
    setCount((c) => c + 1);
  };

  const trigger = useCallback(() => {
    if (!!balances) {
      setCount(0);
      setResult([]);
      const currentFetchId = fetchIdRef.current;
      for (let i = 0; i < tokens.length; i++) {
        const index = i;
        const item = tokens[index];
        getDepositableBalance(item.id, item.decimals)
          .then((max: string) => {
            if (currentFetchId !== fetchIdRef.current) {
              throw new Error();
            }
            return max;
          })
          .then((max: string) => {
            const nearCount = toPrecision(max, 3) || "0";
            const refCount = toRoundedReadableNumber({
              decimals: item.decimals,
              number: balances ? balances[item.id] : "0",
            });
            return {
              ...item,
              asset: toRealSymbol(item.symbol),
              near: Number(nearCount.replace(/[\,]+/g, "")),
              ref: Number(toPrecision(refCount, 3).replace(/[\,]+/g, "")),
              total:
                Number(nearCount.replace(/[\,]+/g, "")) +
                Number(toPrecision(refCount, 3).replace(/[\,]+/g, "")),
            };
          })
          .then((d: TokenMetadata) => setResultAtIndex(d, index));
      }
    }
  }, [balances, tokens.length]);

  useEffect(() => {
    trigger();
  }, [tokens, tokens.length]);

  return {
    trigger,
    loading: count < tokens.length,
    tokensData: result,
  };
};

export const useFtAssets = () => {
  const [balances, setBalances] = useState<TokenBalancesView>();
  useEffect(() => {
    view_account_balance(wallet.getAccountId())
      .then(setBalances)
      .catch((e) => {
        setBalances({});
      });
  }, []);
  return balances;
};

export const useTokenBalances = () => {
  const [balances, setBalances] = useState<TokenBalancesView>();

  useEffect(() => {
    getTokenBalances()
      .then(setBalances)
      .catch(() => setBalances({}));
  }, []);

  return balances;
};

export const useDepositableBalance = (tokenId: string, decimals?: number) => {
  const [depositable, setDepositable] = useState<string>("");
  const [max, setMax] = useState<string>("");
  useEffect(() => {
    if (tokenId === "NEAR") {
      if (wallet.isSignedIn()) {
        wallet
          .account()
          .getAccountBalance()
          .then(({ available }) => setDepositable(available));
      } else {
        setDepositable("0");
      }
    } else if (tokenId) ftGetBalance(tokenId).then(setDepositable);
  }, [tokenId]);

  useEffect(() => {
    const max = toReadableNumber(decimals, depositable) || "0";
    setMax(max);
  }, [depositable]);

  return max;
};

export const useUserRegisteredTokens = () => {
  const [tokens, setTokens] = useState<TokenMetadata[]>([]);

  useEffect(() => {
    getUserRegisteredTokens()
      .then((tokenIds) => {
        return Promise.all(
          tokenIds.map((tokenId) => ftGetTokenMetadata(tokenId))
        );
      })
      .then(setTokens);
  }, []);

  return tokens;
};

// TODO perf
// Load ft_metadata when first invoked,
// this metadata will never change
// Like ref: https://github.com/ref-finance/ref-ui/blob/main/src/store/RefDatabase.ts
export const useWhitelistTokens = (
  extraTokenIds: string[] = []
): TokenMetadata[] => {
  const [tokens, setTokens] = useState<TokenMetadata[]>();

  useEffect(() => {
    getWhitelistedTokens()
      .then((tokenIds) => {
        const allTokenIds = [...new Set([...tokenIds, ...extraTokenIds])];
        return Promise.all(
          allTokenIds.map((tokenId) => ftGetTokenMetadata(tokenId))
        );
      })
      .then(setTokens);
  }, []);

  return tokens;
};
