import React, { FC, useState, Dispatch, SetStateAction } from "react";
import { PrimaryButton } from "~/src/components/button/Button";
import Modal from "~/src/components/modal/modal";
import clsx from "classnames";

interface IPriceSelectType {
  isOpen: boolean;
  onRequestClose: () => void;
  showFTPrizeSelector: () => void;
  showNFTPrizeSelector: () => void;
}

const PriceSelectType: FC<IPriceSelectType> = ({
  isOpen,
  onRequestClose,
  showFTPrizeSelector,
  showNFTPrizeSelector,
}) => {
  const [selectPrizeType, setSelectPrizeType] = useState<"FT" | "NFT">("FT");
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Select prize type"
    >
      <section className="flex mb-4">
        <div
          className={clsx(
            "w-24 h-24 grid place-items-center mr-5 rounded-lg cursor-pointer bg-gray-200",
            selectPrizeType === "FT" &&
              "border-2 border-black bg-superise-gradient"
          )}
          onClick={() => setSelectPrizeType("FT")}
        >
          FT
        </div>
        <div
          className={clsx(
            "w-24 h-24 grid place-items-center bg-nft-color rounded-lg cursor-pointer bg-gray-200",
            selectPrizeType === "NFT" &&
              "border-2 border-black bg-superise-gradient"
          )}
          onClick={() => setSelectPrizeType("NFT")}
        >
          NFT
        </div>
      </section>
      <p className="mb-8 text-sm font-normal leading-5">
        None fungible token, an item from Paras or Mintbase
      </p>
      <PrimaryButton
        isFull
        onClick={() =>
          selectPrizeType === "FT"
            ? showFTPrizeSelector()
            : showNFTPrizeSelector()
        }
      >
        Next
      </PrimaryButton>
    </Modal>
  );
};
export default PriceSelectType;
