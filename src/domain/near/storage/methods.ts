import { wallet } from "~domain/near/global";
import { FTStorageBalance } from "~domain/near/storage/models";
import { ftViewFunction } from "~domain/near/ft/methods";

export const ftGetStorageBalance = (
  tokenId: string,
  accountId = wallet.getAccountId()
): Promise<FTStorageBalance | null> => {
  return ftViewFunction(tokenId, {
    methodName: "storage_balance_of",
    args: { account_id: accountId },
  });
};
