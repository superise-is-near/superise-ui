import React, { FC, useEffect, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import { useTokenBalances, useWhitelistTokens } from "~state/token";
import SelectToken from "~components/forms/SelectToken";
import { TokenMetadata, TokenMetadataWithAmount } from "~domain/near/ft/models";
import { ftGetBalance } from "~domain/near/ft/methods";
import { accurateNDecimal, toReadableNumber } from "~utils/numbers";
import clsx from "classnames";
import AddIcon from "~assets/add-white.svg";

interface ICryptoSelectModal {
  cryptos: TokenMetadataWithAmount[];
  setCryptos: React.Dispatch<React.SetStateAction<TokenMetadataWithAmount[]>>;
  showCryptoSelectModal: boolean;
  setShowCryptoSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CryptoSelectModal: FC<ICryptoSelectModal> = ({
  cryptos,
  setCryptos,
  showCryptoSelectModal,
  setShowCryptoSelectModal,
}) => {
  const balances = useTokenBalances();
  const tokens = useWhitelistTokens() || [];

  const [selectToken, setSelectToken] = useState<TokenMetadata | undefined>(
    undefined
  );
  const [selectTokenBalance, setSelectTokenBalance] = useState<string>("0");
  const [inputBalance, setInputBalance] = useState<string>("");
  useEffect(() => {
    tokens && tokens.length > 0 && setSelectToken(tokens[0]);
  }, [tokens]);
  useEffect(() => {
    selectToken && ftGetBalance(selectToken.id).then(setSelectTokenBalance);
  }, [selectToken]);

  if (!selectToken) return null;
  // accuracy token 2 decimal
  const selectTokenAccracy2Decimal = accurateNDecimal(
    2,
    toReadableNumber(selectToken.decimals, selectTokenBalance)
  );
  // check if input balance less than select token balance
  const numberRangeNormal: boolean =
    Number(inputBalance) <= Number(selectTokenAccracy2Decimal);

  return (
    <Modal
      isOpen={showCryptoSelectModal}
      onRequestClose={() => setShowCryptoSelectModal(false)}
    >
      <h3 className="text-2xl font-semibold text-center my-2">
        Select Crypto Prize
      </h3>
      <p
        className={clsx(
          "text-sm text-center mb-6",
          numberRangeNormal ? "text-gray-400" : "text-red-500"
        )}
      >
        Available:
        {` ${selectTokenAccracy2Decimal} ${selectToken.symbol}`}
      </p>
      <div className="mb-8 border rounded-2xl border-gray-300 p-4 flex justify-between focus-within:border-indigo-600">
        <input
          type="text"
          className="border-0 p-0 m-0"
          onChange={(e) => setInputBalance(e.target.value)}
          placeholder={`Amount of ${selectToken.symbol}`}
        />
        <SelectToken
          tokens={tokens}
          selected={
            <div
              className="rounded-full overflow-hidden"
              style={{ width: "25px", height: "25px" }}
            >
              <img
                src={selectToken.icon}
                width="25px"
                height="25px"
                alt={selectToken.symbol}
              />
            </div>
          }
          onSelect={setSelectToken}
          balances={balances}
        />
      </div>
      <PrimaryButton
        disabled={inputBalance.length === 0 || !numberRangeNormal}
        isFull
        className="py-3"
        prefixIcon={
          <img
            src={AddIcon}
            className="w-6 h-6 mr-1"
            width="24px"
            height="24px"
            alt="hor image"
          />
        }
        onClick={() => {
          const hasAdd = cryptos.find((crypto) => crypto.id === selectToken.id);
          if (hasAdd) {
            setCryptos(
              cryptos.map((crypto) =>
                crypto.id === selectToken.id
                  ? {
                      ...crypto,
                      amount: Number(crypto.amount) + Number(inputBalance),
                    }
                  : crypto
              )
            );
          } else {
            setCryptos([
              ...cryptos,
              {
                ...selectToken,
                amount: Number(inputBalance),
              },
            ]);
          }
          setShowCryptoSelectModal(false);
        }}
      >
        Add Crypto
      </PrimaryButton>
    </Modal>
  );
};

export default CryptoSelectModal;
