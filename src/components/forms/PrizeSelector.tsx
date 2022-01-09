import React, { FC, useState } from "react";
import { TextButton } from "~components/button/Button";
import { SuperiseFtInputValue } from "./superise-ft-input";
import {
  nearMetadata,
  TokenBalancesView,
  TokenMetadata,
} from "~domain/near/ft/models";
import { FaPlusSquare } from "react-icons/fa";
import { InputValueDisplay } from "./PrizeSelect";
import PrizeSelectType from "./PrizeSelectType";

interface IPrizeSelectType {
  input: {
    value?: SuperiseFtInputValue[];
    onChange?: Function;
  };
  balances: TokenBalancesView;
  tokens: TokenMetadata[];
}

const PrizeSelector: FC<IPrizeSelectType> = ({ input }) => {
  const [isPrizeSelectTypeOpen, setIsPrizeSelectTypeOpen] = useState(false);

  const [selectPrizeType, setSelectPrizeType] = useState<"FT" | "NFT">("FT");
  return (
    <>
      {input.value.length === 0 && (
        <TextButton
          icon={<FaPlusSquare />}
          onClick={(e) => {
            e.preventDefault();
            setIsPrizeSelectTypeOpen(true);
          }}
        >
          Add the first prize
        </TextButton>
      )}
      <PrizeSelectType
        isOpen={isPrizeSelectTypeOpen}
        onRequestClose={() => setIsPrizeSelectTypeOpen(false)}
        selectPrizeType={selectPrizeType}
        setSelectPrizeType={setSelectPrizeType}
      />
    </>
  );
};

export default PrizeSelector;
