import React, { FC, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import Section from "~components/section";
import Spacer from "~components/spacer";
import AssetsList, { IAssetsList } from "~pages/account/assets-list";
import { FtAssets } from "~domain/near/ft/models";
import { ParasNft } from "~domain/paras/models";

interface IWithdrawModal extends ReactModal.Props, IAssetsList {
  onWithdraw: (params: { fts: FtAssets; nfts: NftAssetsView }) => any;
}

const WithdrawModal: FC<IWithdrawModal> = ({
  onRequestClose,
  isOpen,
  nfts,
  fts,
  tokens,
  onWithdraw,
}) => {
  const [selectedFts, setSelectedFts] = useState<FtAssets>({});
  const [selectedNfts, setSelectedNfts] = useState<NftAssetsView>({});

  const handleClickWithdraw = () => {
    onWithdraw({ fts: selectedFts, nfts: selectedNfts });
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h3 className="my-2 text-2xl font-semibold text-center">
        Withdraw Assets
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
      <PrimaryButton size="large" isFull onClick={handleClickWithdraw}>
        Withdraw
      </PrimaryButton>
    </Modal>
  );
};

export default WithdrawModal;
