import {getAmount, getGas} from "~utils/near";
import {TokenMetadata} from "~domain/near/ft/models";
import {ONE_YOCTO_NEAR, REF_FI_CONTRACT_ID, wallet} from "~services/near";
import {toNonDivisibleNumber} from "~utils/numbers";
import {FinalExecutionOutcome} from "near-api-js/lib/providers";
import getConfig from "~domain/near/config";
import {FunctionCallOptions} from "~domain/near/models";
import {wrapNearViewCall} from "~domain/near/global";
import {FtPrize, NftPrize, PrizePool, PrizePoolDisplay} from "~domain/superise/models";

let config = getConfig()

interface DepositOptions {
    token: TokenMetadata;
    amount: string;
    msg?: string;
}


export function deposit_ft({token, amount, msg = ''}: DepositOptions): Promise<FinalExecutionOutcome> {
    return wallet.account().functionCall(
        token.id,
        'ft_transfer_call',
        {
            receiver_id: config.SUPERISE_CONTRACT_ID,
            amount: toNonDivisibleNumber(token.decimals, amount),
            msg
        },
        getGas('300000000000000'), getAmount(ONE_YOCTO_NEAR))
}

interface WithdrawOptions {
    token: TokenMetadata;
    amount: string;
    // unregister?: boolean;
}

export function withdraw_ft({token, amount}: WithdrawOptions) {
    return wallet.account().functionCall(
        config.SUPERISE_CONTRACT_ID,
        'withdraw_ft',
        {
            receiver_id: REF_FI_CONTRACT_ID,
            amount: toNonDivisibleNumber(token.decimals, amount),
        },
        getGas(ONE_YOCTO_NEAR), getAmount('100000000000000'))
}

type CreatePrizePoolParam =  {
    id: number,
    name: string,
    describe: string,
    cover: string,
    begin_time: number,
    end_time: number,
    fts?: FtPrize[],
    nfs?: NftPrize[]
}
export function create_prize_pool(param: CreatePrizePoolParam, option: FunctionCallOptions): Promise<FinalExecutionOutcome> {
    return wallet.account().functionCall(config.SUPERISE_CONTRACT_ID,
            'create_prize_pool',
        param,getGas(option.gas),getAmount(option.amount))
}

export function view_prize_pool(id: number): Promise<PrizePool> {
    return wrapNearViewCall<number,PrizePool>(
        config.SUPERISE_CONTRACT_ID,
        'view_prize_pool',id,PrizePool,false) as Promise<PrizePool>;
}

export function get_id(): Promise<number> {
    return wallet.account().viewFunction(config.SUPERISE_CONTRACT_ID,'get_id');
}

export function view_prize_pool_list(): Promise<PrizePoolDisplay[]> {
    return null;
}