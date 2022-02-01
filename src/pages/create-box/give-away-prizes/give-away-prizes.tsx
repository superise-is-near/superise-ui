import React, { useState } from "react";
import CryptoSelectModal from "./crypto-select-modal";
import NFTSelectModal from "./nft-select-modal";
import SelectPrizesCard from "./select-prizes-card";
import VerticalLine from "./vertical-line";
import { ParasNft } from "~domain/paras/models";

const GiveAwayPrizes = () => {
  const [showCryptoSelectModal, setShowCryptoSelectModal] = useState(false);
  const [showNFTSelectModal, setShowNFTSelectModal] = useState(false);

  const [showNfts, setShowNfts] = useState<ParasNft[]>([]);
  return (
    <section className="flex">
      <VerticalLine bgLight className="mr-4" />
      <SelectPrizesCard
        showNfts={showNfts}
        setShowNfts={setShowNfts}
        onClickAddNFT={() => setShowNFTSelectModal(true)}
        onClickAddCrypto={() => setShowCryptoSelectModal(true)}
      />

      {showCryptoSelectModal && (
        <CryptoSelectModal
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

export default GiveAwayPrizes;
