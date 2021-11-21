import {FT, NFT, PrizeToken} from "~domain/superise/model/PrizeToken";
import {getAmount, getGas, wrapNearViewCall} from "~utils/near";
import {ClassConstructor} from "class-transformer/types/interfaces";
import {TokenMetadata} from "~domain/near/ft/models";
import {ONE_YOCTO_NEAR, REF_FI_CONTRACT_ID, wallet} from "~services/near";
import {toNonDivisibleNumber} from "~utils/numbers";
import {FinalExecutionOutcome} from "near-api-js/lib/providers";

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
export namespace viewMethodsOfSuperise {
    // export function view_prizes(): Promise<Prize[]> {
    //     return wrapNearViewCall<void,Prize>(contractName,"view_prizes",this.arg,this.clz,true) as Promise<Prize[]>;
    // }
}

interface DepositOptions {
    token: TokenMetadata;
    amount: string;
    msg?: string;
}

interface WithdrawOptions {
    token: TokenMetadata;
    amount: string;
    unregister?: boolean;
}

export namespace changeMethodsOfSuperise {

    export function deposit_ft({token, amount, msg = ''}: DepositOptions): Promise<FinalExecutionOutcome> {
        return wallet.account().functionCall(
            token.id,
            'ft_transfer_call',
            {
                receiver_id: REF_FI_CONTRACT_ID,
                amount: toNonDivisibleNumber(token.decimals, amount),
                msg
            },
            getGas(ONE_YOCTO_NEAR), getAmount('100000000000000'))
    }

    export function withdraw_ft({token, amount, unregister = false,}: WithdrawOptions) {
        return wallet.account().functionCall(
            REF_FI_CONTRACT_ID,
            'withdraw_ft',
            {
                receiver_id: REF_FI_CONTRACT_ID,
                amount: toNonDivisibleNumber(token.decimals, amount),
            },
            getGas(ONE_YOCTO_NEAR), getAmount('100000000000000'))
    }

    // export function add_ft_prize(prize: FT): Promise<void> {
    //     return null
    // }
    //
    // function add_nft_prize(prize: NFT): Promise<void> {
    //     return null
    // }
    // function delete_prize(index: number): Promise<void> {
    //     return null
    // }
}

