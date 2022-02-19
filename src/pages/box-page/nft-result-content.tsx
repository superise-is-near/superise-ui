import React, { useEffect, useState } from "react";
import { nft_token } from "~domain/near/nft/methods";
import { NftAsset } from "~domain/superise/models";
import { ParasNft } from "~domain/paras/models";

const NFTContent = ({ nftAsset }: { nftAsset: NftAsset }) => {
  const [paraseNFT, setParasNft] = useState<ParasNft>();
  async function getParasNft() {
    const token = await nft_token(nftAsset.contract_id, nftAsset.nft_id);
    setParasNft(ParasNft.newWithImgUrl(token, nftAsset.contract_id));
  }
  useEffect(() => {
    getParasNft();
  }, []);

  if (!paraseNFT) return <span>loading...</span>;
  return (
    <div>
      <div className="flex items-center">
        <div className="w-6 h-6 mr-4 overflow-hidden rounded-lg">
          <img
            className="w-6 h-6"
            src={paraseNFT.img_url}
            width="24px"
            height="24px"
            alt={paraseNFT.img_url}
          />
        </div>
        <div className="text-sm font-semibold text-gray-900">
          {paraseNFT.nft.token.metadata.title}
        </div>
      </div>
    </div>
  );
};

export default NFTContent;
