import React, { FC, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import Section from "~components/section";
import Spacer from "~components/spacer";
import AssetsList, { IAssetsList } from "~pages/account/assets-list";
import { TokenBalancesView } from "~domain/near/ft/models";
import { ParasNft } from "~domain/paras/models";

interface IWithdrawModal extends ReactModal.Props, IAssetsList {
  onWidthdraw: (params: { fts: TokenBalancesView; nfts: ParasNft[] }) => any;
}

const WithdrawModal: FC<IWithdrawModal> = ({
  onRequestClose,
  isOpen,
  nfts,
  fts,
  tokens,
  onWidthdraw,
}) => {
  const [selectedFts, setSelectedFts] = useState<TokenBalancesView>([]);
  const [selectedNfts, setSelectedNfts] = useState([]);

  const handleClickWidthdraw = () => {
    onWidthdraw({ fts: selectedFts, nfts: selectedNfts });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h3 className="my-2 text-2xl font-semibold text-center">
        Widthdraw Assets
      </h3>
      <AssetsList
        onFtsChange={(fts) => {
          setSelectedFts(fts);
        }}
        onNftsChange={(nfts) => {
          setSelectedNfts(nfts);
        }}
        selectedFts={selectedFts}
        selectedNfts={selectedNfts}
        nfts={nfts}
        fts={fts}
        tokens={tokens}
        selectable
      />
      <Spacer h="24px" />
      <PrimaryButton size="large" isFull onClick={handleClickWidthdraw}>
        Widthdraw
      </PrimaryButton>
    </Modal>
  );
};

export default WithdrawModal;
