import {wallet} from "~services/near";
import {deserialize, serialize} from "class-transformer";
import {reject} from "lodash";
import {ClassConstructor} from "class-transformer/types/interfaces";

export function wrapNearViewCall<A, R>(contractId: string, methodName: string, arg: A, clz: ClassConstructor<R>):
    (arg: A) => Promise<R> {
    return (arg) =>
        Promise.resolve(() => {
            let desArg;
            try {
                desArg = serialize(arg)
            } catch (e) {
                reject(`Fail to serialize when call ${contractId + "." + methodName}$ ,the arg is {arg: ${arg}$} `)
            }
            return desArg
        }).then(desArgSuccess => {
            return wallet.account()
                .viewFunction(contractId, methodName, desArgSuccess)
        }).then((raw) => {
            let tmp;
            try {
                tmp = deserialize(clz, raw);
            } catch (e) {
                reject(`Fail to deserialize,return result is ${raw}$,exception: ${e}$`);
            }
            return tmp as R;
        });
}
