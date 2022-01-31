import React, { FC, useEffect, useState } from "react";
import { PrimaryButton, TextButton } from "~/src/components/button/Button";
import { SuperiseFtInputValue } from "./superise-ft-input";
import {
  EMPTY_INPUT_VALUE,
  TokenBalancesView,
  TokenMetadata,
} from "~/src/domain/near/ft/models";
import { FaPlusSquare } from "react-icons/fa";
import PrizeSelectType from "./PrizeSelectType";
import FTPrizeSelector from "./FTPrizeSelector";
import NFTPrizeSelector from "./NFTPrizeSelector";
import { ParasNft } from "~/src/domain/paras/models";
import clsx from "classnames";
import Modal from "~/src/components/modal/modal";
import { toReadableNumber } from "~/src/utils/numbers";
import { useWhitelistTokens } from "~/src/state/token";

export function InputValueDisplay({
  value,
  onClick,
}: {
  value: SuperiseFtInputValue;
  onClick?: any;
}) {
  const { token, amount } = value;
  const tokens = useWhitelistTokens();

  if (!tokens) return null;
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
        {toReadableNumber(
          tokens.find((_token) => token.id === _token.id)?.decimals ??
            tokens[0].decimals,
          amount
        )}{" "}
        {token.symbol}
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
        input.value.nftValue.map((parasNft, index) => (
          <InputValueDisplay
            value={{
              id: parasNft.nft.token.token_id,
              amount: "",
              token: {
                icon: parasNft.img_url,
                symbol: parasNft.nft.token.metadata.title,
              } as TokenMetadata,
            }}
            onClick={() => {
              setNFTInputValue(parasNft);
            }}
          />
        ))}
      {nftInputValue && (
        <Modal
          onRequestClose={() => setNFTInputValue(undefined)}
          isOpen={!!nftInputValue}
          title="Remove from prize list"
        >
          <section>
            <div className="shadow-lg rounded-lg px-4 py-2 flex mb-5">
              <div className="overflow-hidden h-12 w-12">
                <img
                  className="mr-3"
                  height="100px"
                  width="80px"
                  src={nftInputValue.img_url}
                  alt={nftInputValue.nft.token.metadata.title}
                />
              </div>
              <div>
                <div className="ml-2">
                  <h3 className="font-bold">
                    {nftInputValue.nft.token.metadata.title}
                  </h3>
                  <p>{nftInputValue.nft.token.metadata.description}</p>
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
                        nft.nft.token.token_id ===
                          nftInputValue.nft.token.token_id &&
                        nft.nft.token.owner_id ===
                          nftInputValue.nft.token.owner_id
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
