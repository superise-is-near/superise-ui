import React, { useState } from "react";
import Modal from "~components/modal/modal";
import NFTSelectModal from "./nft-select-modal";
import SelectPrizesCard from "./select-prizes-card";
import VerticalLine from "./vertical-line";

const GiveAwayPrizes = () => {
  const [showCryptoSelectModal, setShowCryptoSelectModal] = useState(false);
  const [showNFTSelectModal, setShowNFTSelectModal] = useState(false);
  return (
    <section className="flex">
      <VerticalLine bgLight className="mr-4" />
      <SelectPrizesCard
        onClickAddNFT={() => setShowNFTSelectModal(true)}
        onClickAddCrypto={() => setShowCryptoSelectModal(true)}
      />

      {showCryptoSelectModal && (
        <Modal
          isOpen={showCryptoSelectModal}
          onRequestClose={() => setShowCryptoSelectModal(false)}
        >
          Crypto
        </Modal>
      )}

      {showNFTSelectModal && (
        <NFTSelectModal
          showNFTSelectModal={showNFTSelectModal}
          setShowNFTSelectModal={setShowNFTSelectModal}
        />
      )}
    </section>
  );
};

export default GiveAwayPrizes;
