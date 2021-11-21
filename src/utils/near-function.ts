import {wallet} from "~services/near";
import {deserialize, deserializeArray, serialize} from "class-transformer";
import {reject} from "lodash";
import {ClassConstructor} from "class-transformer/types/interfaces";


// export abstract class nearFunctionHolder<A,R> {
//     contract: string;
//     methodName: string;
//     arg: A;
//     clz: ClassConstructor<R>;
//
//     build(a: A) {
//         this.arg = a
//     }
//     abstract call(): Promise<R|R[]>;
// }

/**
 * 封装near的view类型方法调用
 * @param contractId 合约名
 * @param methodName 方法名
 * @param arg 参数
 * @param clz 返回值反序列化的类型信息
 * @param isArray 返回值是否是数组
 */
export function wrapNearViewCall<A, R>(contractId: string, methodName: string, arg: A, clz: ClassConstructor<R>, isArray: boolean):
    Promise<R | R[]> {
    return Promise.resolve(() => {
        try {
            return  serialize(arg)
        } catch (e) {
            reject(`Fail to serialize when call ${contractId + "." + methodName}$ ,the arg is {arg: ${arg}$} `)
        }
    }).then(desArgSuccess => {
        return wallet.account()
            .viewFunction(contractId, methodName, desArgSuccess)
    }).then((raw) => {
        try {
            return isArray ? deserializeArray(clz, raw) : deserialize(clz, raw);
        } catch (e) {
            reject(`Fail to deserialize,return result is ${raw}$,exception: ${e}$`);
        }
    });
}
