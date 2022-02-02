import React, { useState, FC } from "react";
import CryptoSelectModal from "./crypto-select-modal";
import NFTSelectModal from "./nft-select-modal";
import SelectPrizesCard from "./select-prizes-card";
import VerticalLine from "../vertical-line";
import { ParasNft } from "~domain/paras/models";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";
import CollapsedCard from "./CollapsedCard";

interface IGiveawayPrizes {
  collapsed: boolean;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const GiveawayPrizes: FC<IGiveawayPrizes> = ({ collapsed, setProgress }) => {
  const [showCryptoSelectModal, setShowCryptoSelectModal] = useState(false);
  const [showNFTSelectModal, setShowNFTSelectModal] = useState(false);

  const [showNfts, setShowNfts] = useState<ParasNft[]>([]);
  const [showCryptos, setShowCryptos] = useState<TokenMetadataWithAmount[]>([]);
  return (
    <section className="flex">
      <VerticalLine bgLight={!collapsed} className="mr-4" />
      {collapsed && (
        <CollapsedCard
          showNfts={showNfts}
          showCryptos={showCryptos}
          setProgress={setProgress}
        />
      )}
      {!collapsed && (
        <SelectPrizesCard
          setProgress={setProgress}
          showCryptos={showCryptos}
          setShowCryptos={setShowCryptos}
          showNfts={showNfts}
          setShowNfts={setShowNfts}
          onClickAddNFT={() => setShowNFTSelectModal(true)}
          onClickAddCrypto={() => setShowCryptoSelectModal(true)}
        />
      )}

      {showCryptoSelectModal && (
        <CryptoSelectModal
          showCryptos={showCryptos}
          setShowCryptos={setShowCryptos}
          showCryptoSelectModal={showCryptoSelectModal}
          setShowCryptoSelectModal={setShowCryptoSelectModal}
        />
      )}

      {showNFTSelectModal && (
        <NFTSelectModal
          showNfts={showNfts}
          setShowNfts={setShowNfts}
          showNFTSelectModal={showNFTSelectModal}
          setShowNFTSelectModal={setShowNFTSelectModal}
        />
      )}
    </section>
  );
};

export default GiveawayPrizes;
