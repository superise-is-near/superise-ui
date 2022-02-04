import { TokenMetadata } from "~domain/near/ft/models";
import {Transaction, wallet} from "~domain/near/global";
import { toReadableNumber } from "~utils/numbers";
import { RefFiViewFunctionOptions } from "~domain/ref/methods";
import {
  BANANA_ID,
  CHEDDAR_ID,
  CUCUMBER_ID,
  HAPI_ID,
  icons as metadataDefaults,
  NEAR_ICON,
} from "~domain/near/ft/metadata";
import {AccountId} from "~domain/superise/models";

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
  let metadata = await wallet.account().viewFunction(id, "ft_metadata");
  if (
    !metadata.icon ||
    metadata.icon === NEAR_ICON ||
    metadata.id === BANANA_ID ||
    metadata.id === CHEDDAR_ID ||
    metadata.id === CUCUMBER_ID ||
    metadata.id === HAPI_ID
  ) {
    let transferId: string[] = id.split(".");
    transferId[transferId.length - 1] = "near";
    metadata.icon = metadataDefaults[transferId.join(".")];
  }
  return { id, ...metadata };
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