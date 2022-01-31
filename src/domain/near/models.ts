import { ONE_YOCTO_NEAR } from "~/src/domain/near/global";

export interface FunctionCallOptions {
  gas?: string;
  amount?: string;
}

export const defaultGas: FunctionCallOptions = {
  gas: "300000000000000",
  amount: ONE_YOCTO_NEAR,
};
