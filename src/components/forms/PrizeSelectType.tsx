import React, { FC, Dispatch, SetStateAction } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import clsx from "classnames";

interface IPriceSelectType {
  isOpen: boolean;
  onRequestClose: () => void;
  selectPrizeType: "FT" | "NFT";
  setSelectPrizeType: Dispatch<SetStateAction<"FT" | "NFT">>;
}

const PriceSelectType: FC<IPriceSelectType> = ({
  isOpen,
  onRequestClose,
  selectPrizeType,
  setSelectPrizeType,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Select prize type"
    >
      <section className="flex mb-4">
        <div
          className={clsx(
            "w-24 h-24 grid place-items-center mr-5 rounded-lg cursor-pointer",
            selectPrizeType === "FT" && "border-2 border-black"
          )}
          style={{ background: "#E5E7EB" }}
          onClick={() => setSelectPrizeType("FT")}
        >
          FT
        </div>
        <div
          className={clsx(
            "w-24 h-24 grid place-items-center bg-nft-color rounded-lg cursor-pointer",
            selectPrizeType === "NFT" && "border-2 border-black"
          )}
          style={{
            background:
              "linear-gradient(225.34deg, #FFFFFF 0%, #FFFF7F 101.17%)",
          }}
          onClick={() => setSelectPrizeType("NFT")}
        >
          NFT
        </div>
      </section>
      <p className="mb-8">
        None fungible token, an item from Paras or Mintbase
      </p>
      <PrimaryButton isFull>Next</PrimaryButton>
    </Modal>
  );
};
export default PriceSelectType;
