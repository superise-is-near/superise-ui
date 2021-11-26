import getConfig from "~domain/near/config";
import {wallet} from "~services/near";
import {REF_FI_CONTRACT_ID} from "~domain/ref/constants";

export interface RefFiViewFunctionOptions {
    methodName: string;
    args?: object;
}

export interface RefFiFunctionCallOptions extends RefFiViewFunctionOptions {
    gas?: string;
    amount?: string;
}
export const refFiViewFunction = ({methodName, args}: RefFiViewFunctionOptions) => {
    return wallet.account().viewFunction(REF_FI_CONTRACT_ID, methodName, args);
};

/**
 * 获取ref白名单token
 */
export const getRefWhitelistedTokens = async (): Promise<string[]> => {
    return refFiViewFunction({ methodName: 'get_whitelisted_tokens' });
};
