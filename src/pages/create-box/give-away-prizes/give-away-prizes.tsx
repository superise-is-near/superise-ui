import React, { useState, FC, useEffect } from "react";
import CryptoSelectModal from "./crypto-select-modal";
import NFTSelectModal from "./nft-select-modal";
import SelectPrizesCard from "./select-prizes-card";
import VerticalLine from "../vertical-line";
import { ParasNft } from "~domain/paras/models";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";
import CollapsedCard from "./CollapsedCard";

interface IGiveAwayPrizes {
  collapsed: boolean;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  parasNfts: ParasNft[];
  cryptos: TokenMetadataWithAmount[];
  setParasNfts: React.Dispatch<React.SetStateAction<ParasNft[]>>;
  setCryptos: React.Dispatch<React.SetStateAction<TokenMetadataWithAmount[]>>;
}

const GiveAwayPrizes: FC<IGiveAwayPrizes> = ({
  collapsed,
  setProgress,
  parasNfts,
  cryptos,
  setCryptos,
  setParasNfts,
}) => {
  const [showCryptoSelectModal, setShowCryptoSelectModal] = useState(false);
  const [showNFTSelectModal, setShowNFTSelectModal] = useState(false);

  return (
    <section className="flex">
      <VerticalLine bgLight={!collapsed} className="mr-4" />
      {collapsed && (
        <CollapsedCard
          nfts={parasNfts}
          cryptos={cryptos}
          setProgress={setProgress}
        />
      )}
      {!collapsed && (
        <SelectPrizesCard
          setProgress={setProgress}
          cryptos={cryptos}
          setCryptos={setCryptos}
          nfts={parasNfts}
          setNfts={setParasNfts}
          onClickAddNFT={() => setShowNFTSelectModal(true)}
          onClickAddCrypto={() => setShowCryptoSelectModal(true)}
        />
      )}

      {showCryptoSelectModal && (
        <CryptoSelectModal
          cryptos={cryptos}
          setCryptos={setCryptos}
          showCryptoSelectModal={showCryptoSelectModal}
          setShowCryptoSelectModal={setShowCryptoSelectModal}
        />
      )}

      {showNFTSelectModal && (
        <NFTSelectModal
          nfts={parasNfts}
          setNfts={setParasNfts}
          showNFTSelectModal={showNFTSelectModal}
          setShowNFTSelectModal={setShowNFTSelectModal}
        />
      )}
    </section>
  );
};

export default GiveAwayPrizes;
