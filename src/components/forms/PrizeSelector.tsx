import React, { FC, useState } from "react";
import { TextButton } from "~components/button/Button";
import { SuperiseFtInputValue } from "./superise-ft-input";
import {
  EMPTY_INPUT_VALUE,
  TokenBalancesView,
  TokenMetadata,
} from "~domain/near/ft/models";
import { FaPlusSquare } from "react-icons/fa";
import PrizeSelectType from "./PrizeSelectType";
import FTPrizeSelector from "./FTPrizeSelector";
import NFTPrizeSelector from "./NFTPrizeSelector";

function InputValueDisplay({
  value,
  onClick,
}: {
  value: SuperiseFtInputValue;
  onClick?: any;
}) {
  const { token, amount } = value;

  let className =
    "flex items-center justify-between p-1 pr-4 border-2 rounded transition";
  if (onClick) className += " cursor-pointer hover:border-gray-700";

  return (
    <div className={className} onClick={onClick}>
      <img src={token.icon} className="w-12 h-12" />
      <span className="text-sm text-gray-700">
        {amount} {token.symbol}
      </span>
    </div>
  );
}

interface IPrizeSelectType {
  input: {
    value?: SuperiseFtInputValue[];
    onChange?: Function;
  };
  balances: TokenBalancesView;
  tokens: TokenMetadata[];
}

const PrizeSelector: FC<IPrizeSelectType> = ({ input, balances, tokens }) => {
  const [showPrizeSelectType, setShowPrizeSelectType] = useState(false);
  const [showFTPrizeSelector, setShowFTPrizeSelector] = useState(false);
  const [showNFTPrizeSelector, setShowNFTPrizeSelector] = useState(false);

  const [ftInputValue, setFtInputValue] =
    useState<SuperiseFtInputValue>(EMPTY_INPUT_VALUE);

  return (
    <section>
      {input.value.length === 0 && (
        <TextButton
          icon={<FaPlusSquare />}
          onClick={(e) => {
            e.preventDefault();
            setShowPrizeSelectType(true);
          }}
        >
          Add the first prize
        </TextButton>
      )}
      {input.value.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {input.value.map((item: SuperiseFtInputValue) => {
            return (
              <InputValueDisplay
                value={item}
                onClick={() => {
                  setFtInputValue(item);
                  setShowPrizeSelectType(true);
                }}
              />
            );
          })}
          <TextButton
            icon={<FaPlusSquare />}
            onClick={(e) => {
              e.preventDefault();
              setShowPrizeSelectType(true);
            }}
          >
            Add another prize
          </TextButton>
        </div>
      )}
      <PrizeSelectType
        isOpen={showPrizeSelectType}
        onRequestClose={() => setShowPrizeSelectType(false)}
        showFTPrizeSelector={() => {
          setShowPrizeSelectType(false);
          setShowFTPrizeSelector(true);
        }}
        showNFTPrizeSelector={() => {
          setShowPrizeSelectType(false);
          setShowNFTPrizeSelector(true);
        }}
      />
      <FTPrizeSelector
        isOpen={showFTPrizeSelector}
        input={input}
        balances={balances}
        tokens={tokens}
        onRequestClose={() => setShowFTPrizeSelector(false)}
        ftInputValue={ftInputValue}
        setFtInputValue={setFtInputValue}
      />
      <NFTPrizeSelector isOpen={showNFTPrizeSelector} />
    </section>
  );
};

export default PrizeSelector;
