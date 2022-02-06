import { TRANSFERABLE_AMOUNT } from "~domain/near/models";
import { Nft } from "~domain/near/nft/models";
import { nft_token, nft_token_metadata } from "~domain/near/nft/methods";
import getConfig from "~domain/near/config";
import { ParasNft } from "~domain/paras/models";
import { getImgUrlFromCid } from "~domain/paras/methods";

export type TokenId = string;
export type Balance = string;
export type PoolId = number;
// near account like xxx.near
export type AccountId = string;
export type TimeStamp = number;
export type MilliTimeStamp = number;
export type PrizeId = number;

export class PrizePoolDisplay {
  id: number;
  creator_id: string;
  name: string;
  describe: string;
  cover: string;

  end_time: number;
  ticket_price: FtPrize;
  joiner_sum: number;
  finish: boolean;
}

export class PrizePool {
  id: number = 0;
  creator_id: string = "";
  ft_prizes: FtPrize[] = [];
  nft_prizes: NftPrize[] = [];
  join_accounts: string[] = [];
}

export type Assets = {
  nft_assets: NftAsset[];
  ft_assets: FtAsset[];
};

export type NftAsset = {
  contract_id: string;
  nft_id: string;
};

export type FtAsset = {
  contract_id: string;
  balance: TRANSFERABLE_AMOUNT;
};

export type NftPrize = {
  prize_id?: PrizeId;
  nft: NftAsset;
};

export interface FtPrize {
  prize_id?: PrizeId;
  ft: FtAsset;
}

class Account {
  fts: Map<TokenId, Balance>;
  // nfts: UnorderedSet<PrizeToken::NFT>,
  pools: Set<PoolId>;
}

export class Record {
  time: number;
  ft_prize: FtPrize;
  receiver: AccountId;
}

export interface AssetsActivity {
  activity_id: number;
  time: MilliTimeStamp;
  sender: string;
  receiver: string;
  tx_hash: string;
  message: string; // 'Giveaway #1 created'
  asset_type: "FT" | "NFT" | "NEAR";
  contract_id: string; // eg: 'wNear.testnet', 'punk.testnet'
  amount: string;
  nft_id: string;
}

export class SuperiseDisplayableFt {
  ft_asset: FtAsset;
}

// can display with a img url
export class SuperiseDisplayableNft {
  nft_asset: NftAsset;
  nft_img_url: string;
  constructor(nft_assets: NftAsset, nft_img_url: string) {
    this.nft_asset = nft_assets;
    this.nft_img_url = nft_img_url;
  }
  public static async from(
    nft_asset: NftAsset
  ): Promise<SuperiseDisplayableNft> {
    switch (nft_asset.contract_id) {
      case getConfig().PARAS_NFT_CONTRACT_ID:
        return this.parasNftToDisplayable(nft_asset.nft_id);
      default:
        return Promise.reject("nonsupport nft contract");
    }
  }

  private static async parasNftToDisplayable(
    nft_id: string
  ): Promise<SuperiseDisplayableNft> {
    let metadataOfNep177 = await nft_token_metadata(
      getConfig().PARAS_NFT_CONTRACT_ID,
      nft_id
    );
    let imgUrlFromCid = getImgUrlFromCid(metadataOfNep177.media);
    return new SuperiseDisplayableNft(
      {
        contract_id: getConfig().PARAS_NFT_CONTRACT_ID,
        nft_id: nft_id,
      },
      imgUrlFromCid
    );
  }
}

export class SuperiseDisplayableNftFactory {
  public async toDisplayable(
    nft_asset: NftAsset
  ): Promise<SuperiseDisplayableNft> {
    switch (nft_asset.contract_id) {
      case getConfig().PARAS_NFT_CONTRACT_ID:
        return this.parasNftToDisplayable(nft_asset.nft_id);
      default:
        return Promise.reject("nonsupport nft contract");
    }
  }
  private async parasNftToDisplayable(
    nft_id: string
  ): Promise<SuperiseDisplayableNft> {
    let metadataOfNep177 = await nft_token_metadata(
      getConfig().PARAS_NFT_CONTRACT_ID,
      nft_id
    );
    let imgUrlFromCid = getImgUrlFromCid(metadataOfNep177.media);
    return {
      nft_asset: {
        contract_id: getConfig().PARAS_NFT_CONTRACT_ID,
        nft_id: nft_id,
      },
      nft_img_url: imgUrlFromCid,
    };
  }
}

export interface SuperiseDisplayableFt {}
