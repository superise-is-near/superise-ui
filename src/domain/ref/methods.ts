import getConfig from "~domain/near/config";
import { wallet } from "~services/near";
import { REF_FI_CONTRACT_ID } from "~domain/ref/constants";
import { FtBalancesView } from "~domain/near/ft/models";
import { getAmount, getGas } from "~domain/near/global";
import { functionCall } from "near-api-js/lib/transaction";

export interface RefFiViewFunctionOptions {
  methodName: string;
  args?: object;
}

export interface RefFiFunctionCallOptions extends RefFiViewFunctionOptions {
  gas?: string;
  amount?: string;
}

export const refFiViewFunction = ({
  methodName,
  args,
}: RefFiViewFunctionOptions) => {
  return wallet.account().viewFunction(REF_FI_CONTRACT_ID, methodName, args);
};

/**
 * 获取ref白名单token
 */
export const getWhitelistedTokens = async (): Promise<string[]> => {
  return refFiViewFunction({ methodName: "get_whitelisted_tokens" });
};

export const getTokenBalances = (): Promise<FtBalancesView> => {
  return refFiViewFunction({
    methodName: "get_deposits",
    args: { account_id: wallet.getAccountId() },
  });
};

export const getUserRegisteredTokens = (
  accountId: string = wallet.getAccountId()
): Promise<string[]> => {
  return refFiViewFunction({
    methodName: "get_user_whitelisted_tokens",
    args: { account_id: accountId },
  });
};

export const refFiFunctionCall = ({
  methodName,
  args,
  gas,
  amount,
}: RefFiFunctionCallOptions) => {
  return wallet
    .account()
    .functionCall(
      REF_FI_CONTRACT_ID,
      methodName,
      args,
      getGas(gas),
      getAmount(amount)
    );
};

export const refFiManyFunctionCalls = (
  functionCalls: RefFiFunctionCallOptions[]
) => {
  const actions = functionCalls.map((fc) =>
    functionCall(fc.methodName, fc.args, getGas(), getAmount())
  );

  return wallet
    .account()
    .sendTransactionWithActions(REF_FI_CONTRACT_ID, actions);
};
