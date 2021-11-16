import {PrizeToken} from "~domain/superise/model/PrizeToken";
import {Prize} from "~domain/superise/model/Prize";
import {wrapNearViewCall} from "~utils/near-function";
import {ClassConstructor} from "class-transformer/types/interfaces";

// let superiseViewMethodCaller = wrapNearViewCall()
// todo 修改合约名
const contractName = "123"

// class superiseMethodCaller<A,R> extends nearFunctionHolder<A, R>{
//
//     constructor(methodName: string, clz: ClassConstructor<R>) {
//         super();
//         this.contract = contractName
//         this.methodName = methodName
//         this.clz = clz
//     }
//     call(): Promise<R|R[]> {
//         return wrapNearViewCall<A,R>(this.contract,this.methodName,this.arg,this.clz);
//     }
//
// }
namespace viewMethodsOfSuperise{
    function view_prizes(): Promise<Prize[]> {
        return wrapNearViewCall<void,Prize[]>(contractName,"view_prizes",this.arg,this.clz);
    }
}
namespace changeMethodsOfSuperise {
    function add_prize(prize: PrizeToken): Promise<void> {
        return null
    }
    function delete_prize(index: number): Promise<void> {
        return null
    }
}

