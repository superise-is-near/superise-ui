import React, { FC } from "react";
import { ParasNft } from "~domain/paras/models";
import { FtAssets, TokenMetadata } from "~domain/near/ft/models";
import { toPrecision, toReadableNumber } from "~utils/numbers";
import { toRealSymbol } from "~utils/token";
import CheckFillIcon from "~/assets/check-fill.svg";
import CheckNFillIcon from "~/assets/check-nfill.svg";
import {NftAssetsView} from "~domain/near/nft/models";

export interface IAssetsList {
  nfts: NftAssetsView;
  fts: FtAssets;
  tokens: TokenMetadata[];
  selectable?: boolean;
  selectedFts?: FtAssets;
  selectedNfts?: ParasNft[];
  onFtsChange?: (fts: FtAssets) => any;
  onNftsChange?: (nfts: ParasNft[]) => any;
}

const AssetsList: FC<IAssetsList> = ({
  nfts,
  fts,
  tokens,
  selectable,
  selectedFts = {},
  selectedNfts = [],
  onFtsChange,
  onNftsChange,
}) => {
  return (
    <div className="grid grid-col-1 gap-4">
      {nfts.map((item, idx) => {
        const selected = !!selectedNfts.find(
          (selected) => selected.nft.token.token_id === item.nft.token.token_id
        );
        return (
          <div className="flex items-center" key={idx}>
            <div className="w-12 h-12 mr-4 overflow-hidden rounded-lg">
              <img
                className="object-cover w-12 h-12"
                src={item.img_url}
                width="48px"
                height="48px"
              />
            </div>
            <div className="text-gray-600">{item.nft.token.metadata.title}</div>
            <div className="flex-auto" />
            {selectable && (
              <img
                src={selected ? CheckFillIcon : CheckNFillIcon}
                width="24px"
                height="24px"
                alt="check image"
                onClick={() => {
                  let updatedNfts = [...selectedNfts];
                  if (!selected) updatedNfts = [...updatedNfts, item];
                  if (selected)
                    updatedNfts = updatedNfts.filter(
                      (nft) =>
                        nft.nft.token.token_id !== item.nft.token.token_id
                    );
                  onNftsChange(updatedNfts);
                }}
                role="button"
              />
            )}
          </div>
        );
      })}
      {Object.keys(fts).map((key) => {
        const foundToken = tokens.find((token) => token.id === key);
        if (!foundToken) return null;
        const balance = fts[key] || "0";
        if (balance === "0") return null;
        const amount = toPrecision(
          toReadableNumber(foundToken.decimals, balance),
          3,
          true
        );
        const selected = !!selectedFts[key];
        return (
          <div className="flex items-center" key={key}>
            <div className="w-12 h-12 mr-4 overflow-hidden rounded-lg">
              <img
                className="object-cover w-12 h-12"
                src={foundToken.icon}
                width="48px"
                height="48px"
              />
            </div>
            <div className="text-gray-600">
              {amount} {toRealSymbol(foundToken.symbol)}
            </div>
            <div className="flex-auto" />
            {selectable && (
              <img
                src={selected ? CheckFillIcon : CheckNFillIcon}
                width="24px"
                height="24px"
                alt="check image"
                onClick={() => {
                  let updatedFts = { ...selectedFts };
                  if (!selected) updatedFts[key] = fts[key];
                  if (selected) delete updatedFts[key];
                  onFtsChange(updatedFts);
                }}
                role="button"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AssetsList;
