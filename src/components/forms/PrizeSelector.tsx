import React, { FC, useState } from "react";
import { PrimaryButton, TextButton } from "~components/button/Button";
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
import { ParasNft } from "~domain/paras/models";
import clsx from "classnames";
import Modal from "~components/modal/modal";

function InputValueDisplay({
  value,
  onClick,
}: {
  value: SuperiseFtInputValue;
  onClick?: any;
}) {
  const { token, amount } = value;

  return (
    <div
      className={clsx(
        "flex items-center justify-between p-1 pr-4 border-2 rounded transition",
        onClick && "cursor-pointer hover:border-gray-700"
      )}
      onClick={onClick}
    >
      <img src={token.icon} className="w-12 h-12" />
      <span className="text-sm text-gray-700">
        {amount} {token.symbol}
      </span>
    </div>
  );
}

interface IPrizeSelectType {
  input: {
    value?: {
      ftValue: SuperiseFtInputValue[];
      nftValue: ParasNft[];
    };
    onChange?: Function;
  };
  balances: TokenBalancesView;
  tokens: TokenMetadata[];
}

const PrizeSelector: FC<IPrizeSelectType> = (props) => {
  const { input, balances, tokens } = props;
  const [showPrizeSelectType, setShowPrizeSelectType] = useState(false);
  const [showFTPrizeSelector, setShowFTPrizeSelector] = useState(false);
  const [showNFTPrizeSelector, setShowNFTPrizeSelector] = useState(false);

  const [ftInputValue, setFtInputValue] =
    useState<SuperiseFtInputValue>(EMPTY_INPUT_VALUE);
  const [nftInputValue, setNFTInputValue] = useState<ParasNft | undefined>();

  const isInputEmpty = () => {
    if (!input.value) return true;
    const ftInputValue = input.value.ftValue;
    const nftInputValue = input.value.nftValue;
    const isFtEmpty = !ftInputValue || ftInputValue.length === 0;
    const isNftEmpty = !nftInputValue || nftInputValue.length === 0;
    if (isFtEmpty && isNftEmpty) return true;
    return false;
  };
  console.log({
    showFTPrizeSelector,
    showNFTPrizeSelector,
    showPrizeSelectType,
  });
  return (
    <section>
      {isInputEmpty() && (
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
      {input.value &&
        input.value.nftValue &&
        input.value.nftValue.length > 0 &&
        input.value.nftValue.map((nft, index) => (
          <div
            key={index}
            className="flex justify-between py-2 px-4 border-2 border-gray-300 mb-1 items-center"
            onClick={() => {
              setNFTInputValue(nft);
            }}
          >
            <div
              className="flex items-center"
              style={{ width: "30px", height: "44px" }}
            >
              <img src={nft.img_url} alt={nft.img_url} />
            </div>
            <div className="text-gray-700">{nft.nft.metadata.title}</div>
          </div>
        ))}
      {nftInputValue && (
        <Modal
          onRequestClose={() => setNFTInputValue(undefined)}
          isOpen={!!nftInputValue}
          title="Remove from prize list"
        >
          <section>
            <div className="shadow-lg rounded-lg px-4 py-2 flex mb-5">
              <img
                className="mr-3"
                height="100px"
                width="80px"
                src={nftInputValue.img_url}
                alt={nftInputValue.nft.metadata.title}
              />
              <div>
                <div className="ml-2">
                  <h3 className="font-bold">
                    {nftInputValue.nft.metadata.title}
                  </h3>
                  <p>{nftInputValue.nft.metadata.description}</p>
                </div>
              </div>
            </div>
            <PrimaryButton
              isFull
              onClick={() => {
                input.onChange({
                  ...input.value,
                  nftValue: input.value.nftValue.filter(
                    (nft) =>
                      !(
                        nft.nft.token_id === nftInputValue.nft.token_id &&
                        nft.nft.owner_id === nftInputValue.nft.owner_id
                      )
                  ),
                });
                setNFTInputValue(undefined);
              }}
            >
              Remove
            </PrimaryButton>
          </section>
        </Modal>
      )}
      {input.value && input.value.ftValue && input.value.ftValue.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {input.value.ftValue.map((item: SuperiseFtInputValue) => {
            return (
              <InputValueDisplay
                key={item.id}
                value={item}
                onClick={() => {
                  setFtInputValue(item);
                  setShowFTPrizeSelector(true);
                }}
              />
            );
          })}
        </div>
      )}
      {!isInputEmpty() && (
        <TextButton
          icon={<FaPlusSquare />}
          onClick={(e) => {
            e.preventDefault();
            setShowPrizeSelectType(true);
          }}
        >
          Add another prize
        </TextButton>
      )}
      {showPrizeSelectType && (
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
      )}
      {showFTPrizeSelector && (
        <FTPrizeSelector
          isOpen={showFTPrizeSelector}
          input={input}
          balances={balances}
          tokens={tokens}
          onRequestClose={() => setShowFTPrizeSelector(false)}
          ftInputValue={ftInputValue}
          setFtInputValue={setFtInputValue}
        />
      )}
      {showNFTPrizeSelector && (
        <NFTPrizeSelector
          isOpen={showNFTPrizeSelector}
          onRequestClose={() => setShowNFTPrizeSelector(false)}
          onRequestConfirm={(nfts) => {
            setShowNFTPrizeSelector(false);
            input.onChange({ ...input.value, nftValue: nfts });
          }}
        />
      )}
    </section>
  );
};

export default PrizeSelector;
