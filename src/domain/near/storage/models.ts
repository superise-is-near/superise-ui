import { NearAmount } from "~domain/near/models";

// ft存储费用
export const STORAGE_TO_REGISTER_WITH_FT = NearAmount.near_amount(0.1);

export interface FTStorageBalance {
  total: string;
  available: string;
}
