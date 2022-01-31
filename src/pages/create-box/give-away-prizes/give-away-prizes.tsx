import React, { FC } from "react";
import VerticalLine from "./vertical-line";
import AddIcon from "~assets/add.svg";
import { PrimaryButton } from "~components/button/Button";

const GiveAwayPrizes: FC<{ className?: string }> = ({ className }) => {
  return (
    <section className="flex">
      <VerticalLine bgLight className="mr-4" />
      <div className="w-full mt-2">
        <div className="p-4 flex justify-between border border-gray-300 rounded-t-2xl">
          <div>
            <div>NFT</div>
            <div>Paras or Mintbase</div>
          </div>
          <div className="grid place-items-center">
            <img src={AddIcon} width="24px" height="24px" alt="add" />
          </div>
        </div>
        <div className="p-4 flex justify-between border border-t-0 border-gray-300 rounded-b-2xl">
          <div>
            <div>Crypto</div>
            <div>NEAR or OCTA</div>
          </div>
          <div className="grid place-items-center">
            <img src={AddIcon} width="24px" height="24px" alt="add" />
          </div>
        </div>
        <PrimaryButton size="large" className="my-6" disabled>
          Continue
        </PrimaryButton>
      </div>
    </section>
  );
};

export default GiveAwayPrizes;
