import React, { FC } from "react";
import AddIcon from "~assets/add.svg";
import { PrimaryButton } from "~components/button/Button";

interface ISelectPrizesCard {
  hasSelected?: boolean;
  onClickAddNFT: () => void;
  onClickAddCrypto: () => void;
}

const SelectPrizesCard: FC<ISelectPrizesCard> = ({
  hasSelected,
  onClickAddNFT,
  onClickAddCrypto,
}) => {
  return (
    <div className="w-full mt-2">
      <div className="p-4 flex justify-between border border-gray-300 rounded-t-2xl">
        <div>
          <div>{hasSelected && "Add another "}NFT</div>
          <div className="mt-1 text-sm text-gray-400">Paras or Mintbase</div>
        </div>
        <div className="grid place-items-center">
          <img
            className="cursor-pointer"
            src={AddIcon}
            width="24px"
            height="24px"
            alt="add"
            onClick={onClickAddNFT}
            tabIndex={-1}
            role="button"
          />
        </div>
      </div>
      <div className="p-4 flex justify-between border border-t-0 border-gray-300 rounded-b-2xl">
        <div>
          <div>{hasSelected && "Add more "}Crypto</div>
          <div className="mt-1 text-sm text-gray-400">NEAR or OCTA</div>
        </div>
        <div className="grid place-items-center">
          <img
            className="cursor-pointer"
            src={AddIcon}
            width="24px"
            height="24px"
            alt="add"
            onClick={onClickAddCrypto}
            tabIndex={-1}
            role="button"
          />
        </div>
      </div>
      <PrimaryButton size="large" className="my-6" disabled>
        Continue
      </PrimaryButton>
    </div>
  );
};

export default SelectPrizesCard;
