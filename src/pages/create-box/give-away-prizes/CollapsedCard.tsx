import React, { FC } from "react";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";
import { ParasNft } from "~domain/paras/models";
import PencilIcon from "~assets/pencil.svg";

interface ICollapsedCard {
  showNfts: ParasNft[];
  showCryptos: TokenMetadataWithAmount[];
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}
const CollapsedCard: FC<ICollapsedCard> = ({
  showNfts,
  showCryptos,
  setProgress,
}) => {
  return (
    <section className="w-full mt-2">
      <div className="p-4 flex justify-between border border-gray-300 rounded-2xl">
        <div className="text-gray-600">
          {`${showNfts.length} NFT${showNfts.length > 1 ? "s" : ""} & ${
            showCryptos.length
          } FT${showCryptos.length > 1 ? "s" : ""}`}
        </div>
        <div className="grid place-items-center">
          <img
            src={PencilIcon}
            width="24px"
            height="24px"
            alt="modify image"
            onClick={() => setProgress(0)}
            role="button"
          />
        </div>
      </div>
    </section>
  );
};

export default CollapsedCard;
