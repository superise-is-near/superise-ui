import { TokenMetadata } from "~domain/near/ft/models";
import { wallet } from "~domain/near/global";
import { toReadableNumber } from "~utils/numbers";
import { RefFiViewFunctionOptions } from "~domain/ref/methods";

export const ftViewFunction = (
  tokenId: string,
  { methodName, args }: RefFiViewFunctionOptions
) => {
  return wallet.account().viewFunction(tokenId, methodName, args);
};

export interface FTStorageBalance {
  total: string;
  available: string;
}
export const ftGetStorageBalance = (
  tokenId: string,
  accountId = wallet.getAccountId()
): Promise<FTStorageBalance | null> => {
  return ftViewFunction(tokenId, {
    methodName: "storage_balance_of",
    args: { account_id: accountId },
  });
};

export const ftGetTokenMetadata = async (
  id: string
): Promise<TokenMetadata> => {
  let metaData = await wallet.account().viewFunction(id, "ft_metadata");
  return { id, ...metaData };
};

/**
 * 获取ft的余额
 * @param tokenId
 * @param decimals
 */
export const ftGetBalance = async (
  tokenId: string,
  decimals?: number
): Promise<string> => {
  return wallet
    .account()
    .viewFunction(tokenId, "ft_balance_of", {
      account_id: wallet.getAccountId(),
    })
    .then((res) => toReadableNumber(decimals, res))
    .catch((res) => "0");
};

/**
 * 获取可存入余额
 * @param tokenId
 * @param decimals
 */
export const getDepositableBalance = async (
  tokenId: string,
  decimals?: number
): Promise<string> => {
  if (tokenId === "NEAR") {
    if (wallet.isSignedIn()) {
      return wallet
        .account()
        .getAccountBalance()
        .then(({ available }) => {
          return toReadableNumber(decimals, available);
        });
    } else {
      return toReadableNumber(decimals, "0");
    }
  } else if (tokenId) {
    return ftGetBalance(tokenId)
      .then((res) => {
        return toReadableNumber(decimals, res);
      })
      .catch((res) => "0");
  } else {
    return "";
  }
};
