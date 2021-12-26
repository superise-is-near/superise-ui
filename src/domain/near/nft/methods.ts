import {wallet} from "~domain/near/global";

export function nft_tokens_for_owner(
  contract: string,
  account_id: string,
  from_index: string = "0",
  limit: number | null): Promise<Nft[]> {
  return wallet
    .account().viewFunction(
      contract,
      'nft_tokens_for_owner',
      {
        "account_id": account_id,
        "from_index": from_index,
        "limit": limit
      })

}