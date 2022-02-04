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
}

const GiveAwayPrizes: FC<IGiveAwayPrizes> = ({ collapsed, setProgress }) => {
  const [showCryptoSelectModal, setShowCryptoSelectModal] = useState(false);
  const [showNFTSelectModal, setShowNFTSelectModal] = useState(false);

  const [nfts, setNfts] = useState<ParasNft[]>([]);
  const [cryptos, setCryptos] = useState<TokenMetadataWithAmount[]>([]);

  useEffect(() => {}, []);
  return (
    <section className="flex">
      <VerticalLine bgLight={!collapsed} className="mr-4" />
      {collapsed && (
        <CollapsedCard
          nfts={nfts}
          cryptos={cryptos}
          setProgress={setProgress}
        />
      )}
      {!collapsed && (
        <SelectPrizesCard
          setProgress={setProgress}
          cryptos={cryptos}
          setCryptos={setCryptos}
          nfts={nfts}
          setNfts={setNfts}
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
          nfts={nfts}
          setNfts={setNfts}
          showNFTSelectModal={showNFTSelectModal}
          setShowNFTSelectModal={setShowNFTSelectModal}
        />
      )}
    </section>
  );
};

export default GiveAwayPrizes;
