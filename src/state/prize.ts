import { TokenMetadata } from "~/src/domain/near/ft/models";
import { useEffect, useState } from "react";
import { getWhitelistedTokens } from "~/src/domain/ref/methods";
import { ftGetTokenMetadata } from "~/src/domain/near/ft/methods";
import { PrizePool, PrizePoolDisplay } from "~/src/domain/superise/models";
import { view_user_pool } from "~/src/domain/superise/methods";
import { wallet } from "~/src/domain/near/global";
import {
  TwitterPool,
  TwitterPoolDisplay,
} from "~/src/domain/superise/twitter_giveaway/models";
import {
  view_twitter_prize_pool,
  view_twitter_prize_pool_list,
} from "~/src/domain/superise/twitter_giveaway/methods";

export const usePrizePoolDisplayLists = (): TwitterPoolDisplay[] => {
  const [prizePoolDisplay, setPrizePoolDisplay] =
    useState<TwitterPoolDisplay[]>();

  useEffect(() => {
    view_twitter_prize_pool_list().then(setPrizePoolDisplay);
    // view_prize_pool_list().then(setPrizePoolDisplay);
  }, []);

  return prizePoolDisplay;
};

export const useTwitterPool = (pool_id: number): TwitterPool => {
  const [prizePool, setPrizePool] = useState<TwitterPool>();

  useEffect(() => {
    view_twitter_prize_pool(pool_id).then(setPrizePool);
    // view_prize_pool(pool_id).then(setPrizePool);
  }, []);
  return prizePool;
};

export const useAccountHistory = (): TwitterPoolDisplay[] => {
  const [history, setHistory] = useState<TwitterPoolDisplay[]>();
  useEffect(() => {
    view_user_pool(wallet.getAccountId())
      .then(setHistory)
      .catch((e) => {
        setHistory([]);
      });
  }, []);
  return history;
};
