import { nft_tokens_for_owner } from "~domain/near/nft/methods";
import getConfig from "~domain/near/config";

let config = getConfig();
export function nft_tokens_for_owner_in_paras(
  account_id: string,
  limit: number | null,
  from_index: string = "0"
): Promise<Nft[]> {
  return nft_tokens_for_owner(
    config.PARAS_NFT_CONTRACT_ID,
    account_id,
    from_index,
    limit
  );
}

export function getImgUrlFromCid(cid: string): string {
  if (process.env.NEAR_ENV !== "mainnet") {
    return `https://ipfs.io/ipfs/${cid}`;
  }
  return `https://paras-cdn.imgix.net/${cid}`;
}
