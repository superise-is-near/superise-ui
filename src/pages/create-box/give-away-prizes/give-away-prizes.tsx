import React, { useState } from "react";
import CryptoSelectModal from "./crypto-select-modal";
import NFTSelectModal from "./nft-select-modal";
import SelectPrizesCard from "./select-prizes-card";
import VerticalLine from "./vertical-line";
import { ParasNft } from "~domain/paras/models";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";

const GiveAwayPrizes = () => {
  const [showCryptoSelectModal, setShowCryptoSelectModal] = useState(false);
  const [showNFTSelectModal, setShowNFTSelectModal] = useState(false);

  const [showNfts, setShowNfts] = useState<ParasNft[]>([]);
  const [showCryptos, setShowCryptos] = useState<TokenMetadataWithAmount[]>([]);
  return (
    <section className="flex">
      <VerticalLine bgLight className="mr-4" />
      <SelectPrizesCard
        showCryptos={showCryptos}
        setShowCryptos={setShowCryptos}
        showNfts={showNfts}
        setShowNfts={setShowNfts}
        onClickAddNFT={() => setShowNFTSelectModal(true)}
        onClickAddCrypto={() => setShowCryptoSelectModal(true)}
      />

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

export default GiveAwayPrizes;
