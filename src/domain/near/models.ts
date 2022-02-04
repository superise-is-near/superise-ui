import BN from "bn.js";
import { utils } from "near-api-js";
import { Action } from "near-api-js/lib/transaction";
import { RefFiViewFunctionOptions } from "~domain/ref/methods";
import { toNonDivisibleNumber } from "~utils/numbers";

export type AmountOfTGas = number;
// https://docs.near.org/docs/concepts/gas#costs-of-complex-actions
export class NearGas {
  //TGas as unit,
  // 1TGas = 1e12gas = 0.0001 Ⓝ in 2021/12/3,
  // 1TGas ≈ 1 millisecond of "compute" time
  public static ONE_TERA_GAS = "1000000000000";
  public static MAX_GAS = NearGas.TGas();
  public static TGas(amount_of_tgas: number = 300): BN {
    return new BN(this.ONE_TERA_GAS).muln(amount_of_tgas);
  }
}

// when transfer amount to contract
export type TRANSFERABLE_AMOUNT = string;
// when display to human
export type READABLE_AMOUNT = string;
// when call near-js-api
export type API_AMOUNT = BN;
export class NearAmount {
  public static ONE_YOCTO_NEAR_RAW = "0.000000000000000000000001";
  public static ONE_YOCTO_NEAR = NearAmount.yocto_near_amount();

  public static yocto_near_amount(amount_of_yocto: number = 1): API_AMOUNT {
    return new BN(utils.format.parseNearAmount(this.ONE_YOCTO_NEAR_RAW)).muln(
      amount_of_yocto
    );
  }

  public static near_amount(amount_of_near: number = 1): API_AMOUNT {
    return new BN(utils.format.parseNearAmount('1')).muln(
      amount_of_near
    );
  }



  public static toApiAmount(amount: READABLE_AMOUNT, decimals: number): string {
    if (decimals === null || decimals === undefined) return amount;
    const [wholePart, fracPart = ""] = amount.split(".");

    return `${wholePart}${fracPart.padEnd(decimals, "0").slice(0, decimals)}`
      .replace(/^0+/, "")
      .padStart(1, "0");
  }

  public static toReadable(
    amount: TRANSFERABLE_AMOUNT,
    decimals: number
  ): string {
    if (!decimals) return amount;

    const wholeStr = amount.substring(0, amount.length - decimals) || "0";
    const fractionStr = amount
      .substring(amount.length - decimals)
      .padStart(decimals, "0")
      .substring(0, decimals);

    return `${wholeStr}.${fractionStr}`.replace(/\.?0+$/, "");
  }
}

export interface FunctionCallOptions {
  gas?: BN;
  amount?: BN;
}

export const defaultGasAmount: FunctionCallOptions = {
  gas: NearGas.MAX_GAS,
  amount: NearAmount.ONE_YOCTO_NEAR,
};

export interface RefFiFunctionCallOptions extends RefFiViewFunctionOptions {
  methodName: string;
  args?: object;
  gas?: string;
  amount?: string;
}

// export const defaultGas: FunctionCallOptions = {
//   gas: "300000000000000",
//   amount: ONE_YOCTO_NEAR,
// };
