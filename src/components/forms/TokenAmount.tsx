import React from "react";
import { wallet } from "../../services/near";
import { toRoundedReadableNumber } from "../../utils/numbers";
import { TokenMetadata, FtAssets } from "~domain/near/ft/models";
import Icon from "~components/tokens/Icon";
import InputAmount from "./InputAmount";
import SelectToken from "./SelectToken";
import { toPrecision } from "~utils/numbers";
import { FormattedMessage } from "react-intl";

interface TokenAmountProps {
  amount?: string;
  max?: string;
  total?: string;
  tokens: TokenMetadata[];
  selectedToken: TokenMetadata;
  balances?: FtAssets;
  onMax?: (input: HTMLInputElement) => void;
  onSelectToken?: (token: TokenMetadata) => void;
  onSearchToken?: (value: string) => void;
  onChangeAmount?: (amount: string) => void;
  text?: string;
  disabled?: boolean;
}

export default function TokenAmount({
  amount,
  max,
  total,
  tokens,
  selectedToken,
  balances,
  onSelectToken,
  onSearchToken,
  onChangeAmount,
  text,
  disabled = false,
}: TokenAmountProps) {
  const render = (token: TokenMetadata) =>
    toRoundedReadableNumber({
      decimals: token.decimals,
      number: balances ? balances[token.id] : "0",
    });

  const isSignedIn = wallet.isSignedIn();

  return (
    <>
      <div className="flex justify-end text-xs font-semibold pb-0.5 w-3/5">
        <span className="text-primaryText" title={total}>
          <FormattedMessage id="balance" defaultMessage="Balance" />
          :&nbsp;
          {toPrecision(total, 3, true)}
        </span>
      </div>
      <fieldset className="relative flex overflow-hidden align-center my-2">
        <InputAmount
          className="w-3/5 pr-1 border border-gray-300 rounded"
          id="inputAmount"
          name={selectedToken?.id}
          max={max}
          value={amount}
          onChangeAmount={onChangeAmount}
          disabled={!isSignedIn || disabled}
        />
        <SelectToken
          tokens={tokens}
          render={render}
          selected={
            selectedToken && (
              <div className="flex items-center justify-end font-semibold">
                <Icon token={selectedToken} />
              </div>
            )
          }
          onSelect={onSelectToken}
          balances={balances}
        />
      </fieldset>
    </>
  );
}
