import SpecialWallet from "~/src/services/SpecialWallet";
import getConfig from "~/src/domain/near/config";
import { keyStores, Near, utils } from "near-api-js";
import BN from "bn.js";
import { ClassConstructor } from "class-transformer/types/interfaces";
import { deserialize, deserializeArray, serialize } from "class-transformer";
import { reject } from "lodash";
import { functionCall } from "near-api-js/lib/transaction";
import { RefFiFunctionCallOptions } from "~/src/domain/ref/methods";

export const ONE_YOCTO_NEAR = "0.000000000000000000000001";

export interface Transaction {
  receiverId: string;
  functionCalls: RefFiFunctionCallOptions[];
}
export const executeMultipleTransactions = async (
  transactions: Transaction[],
  callbackUrl?: string
) => {
  const nearTransactions = await Promise.all(
    transactions.map((t, i) => {
      return wallet.createTransaction({
        receiverId: t.receiverId,
        nonceOffset: i + 1,
        actions: t.functionCalls.map((fc) =>
          functionCall(
            fc.methodName,
            fc.args,
            getGas(fc.gas),
            getAmount(fc.amount)
          )
        ),
      });
    })
  );

  return wallet.requestSignTransactions(nearTransactions, callbackUrl);
};

const config = getConfig();
export const near = new Near({
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  ...config,
});
export const wallet = new SpecialWallet(near, getConfig().SUPERISE_CONTRACT_ID);

export const getGas = (gas: string) =>
  gas ? new BN(gas) : new BN("100000000000000");
export const getAmount = (amount: string) =>
  amount ? new BN(utils.format.parseNearAmount(amount)) : new BN("0");

/**
 * 封装near的view类型方法调用
 * @param contractId 合约名
 * @param methodName 方法名
 * @param arg 参数
 * @param clz 返回值反序列化的类型信息
 * @param isArray 返回值是否是数组
 */
export function nearViewCall<A, R>(
  contractId: string,
  methodName: string,
  arg: A,
  clz: ClassConstructor<R>,
  isArray: boolean
): Promise<R | R[]> {
  return Promise.resolve(() => {
    try {
      return serialize(arg);
    } catch (e) {
      reject(
        `Fail to serialize when call ${
          contractId + "." + methodName
        }$ ,the arg is {arg: ${arg}$} `
      );
    }
  })
    .then((desArgSuccess) => {
      return wallet
        .account()
        .viewFunction(contractId, methodName, desArgSuccess);
    })
    .then((raw) => {
      try {
        return isArray ? deserializeArray(clz, raw) : deserialize(clz, raw);
      } catch (e) {
        reject(`Fail to deserialize,return result is ${raw}$,exception: ${e}$`);
      }
    });
}

/**
 * 封装near的view类型方法调用
 * @param contractId 合约名
 * @param methodName 方法名
 * @param arg 参数
 * @param clz 返回值反序列化的类型信息
 * @param isArray 返回值是否是数组
 */
export function nearFunctionCall<A, R>(
  contractId: string,
  methodName: string,
  arg: A,
  clz: ClassConstructor<R>,
  isArray: boolean
): Promise<R | R[]> {
  return Promise.resolve(() => {
    try {
      return serialize(arg);
    } catch (e) {
      reject(
        `Fail to serialize when call ${
          contractId + "." + methodName
        }$ ,the arg is {arg: ${arg}$} `
      );
    }
  })
    .then((desArgSuccess) => {
      return wallet
        .account()
        .viewFunction(contractId, methodName, desArgSuccess);
    })
    .then((raw) => {
      try {
        return isArray ? deserializeArray(clz, raw) : deserialize(clz, raw);
      } catch (e) {
        reject(`Fail to deserialize,return result is ${raw}$,exception: ${e}$`);
      }
    });
}
