import React, { FC } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";

interface IPriceSelectType {
  isOpen: boolean;
  onRequestClose: () => {};
}
const PriceSelectType: FC<IPriceSelectType> = ({ isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Select prize type"
    >
      <section className="flex">
        <div className="w-24 h-24 grid place-items-center mr-5">FT</div>
        <div className="w-24 h-24 grid place-items-center">NFT</div>
      </section>
      <p className="mb-8">
        None fungible token, an item from Paras or Mintbase
      </p>
      <PrimaryButton isFull>Next</PrimaryButton>
    </Modal>
  );
};
export default PriceSelectType;
