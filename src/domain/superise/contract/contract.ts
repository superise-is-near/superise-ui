import {FT, NFT, PrizeToken} from "~domain/superise/model/PrizeToken";
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
export namespace viewMethodsOfSuperise{
    // export function view_prizes(): Promise<Prize[]> {
    //     return wrapNearViewCall<void,Prize>(contractName,"view_prizes",this.arg,this.clz,true) as Promise<Prize[]>;
    // }
}
export namespace changeMethodsOfSuperise {
    export function add_ft_prize(prize: FT): Promise<void> {
        return null
    }

    function add_nft_prize(prize: NFT): Promise<void> {
        return null
    }
    function delete_prize(index: number): Promise<void> {
        return null
    }
}

