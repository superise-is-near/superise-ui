import React, { useState } from "react";
import TokenAmount from "./TokenAmount";
import fakedata from "~/fakedata/account";
import {
  nearMetadata,
  TokenBalancesView,
  TokenMetadata,
} from "~domain/near/ft/models";
import SelectToken from "./SelectToken";
import Icon from "~/components/tokens/Icon";
import getConfig from "~domain/near/config";

let config = getConfig();

export type SuperiseFtInputValue = {
  id?: string | number;
  amount: string;
  token: TokenMetadata;
};

export default function SuperiseFtInput(props: {
  value: SuperiseFtInputValue;
  onChange?: (value: SuperiseFtInputValue) => void;
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
}) {
  const { amount, token } = props.value || { amount: "", token: nearMetadata };

  const onSelectToken = (token: TokenMetadata) => {
    props.onChange({ ...props.value, amount: "", token });
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    props.onChange({ ...props.value, amount: value, token });
  };

  return (
    <div className="flex items-center justify-between">
      <input
        type="number"
        onChange={handleInputChange}
        value={amount}
        className="block mr-2 rounded"
      />
      <SelectToken
        tokens={props.tokens}
        selected={
          token && (
            <div className="flex items-center justify-end font-semibold">
              <Icon token={token} />
            </div>
          )
        }
        onSelect={onSelectToken}
        balances={props.balances}
      />
    </div>
  );
}
