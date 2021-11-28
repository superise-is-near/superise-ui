import React, { useState } from 'react';
import TokenAmount from './TokenAmount';
import fakedata from '~/fakedata/account';
import { nearMetadata, TokenMetadata } from '~domain/near/ft/models';
import SelectToken from './SelectToken';
import Icon from '~/components/tokens/Icon'

export type SuperiseFtInputValue = {
  id?: string|number;
  amount: string;
  token: TokenMetadata;
}

export default function SuperiseFtInput(props : {
  value: SuperiseFtInputValue;
  onChange?: (value: SuperiseFtInputValue) => void;
}) {
  const { amount, token } = props.value;
  const tokens = fakedata.whiteListTokens;

  // max should get from the balance from when switching tokens in ref, now just get
  // it from the fakedata.tokenListData
  const selectedTokenBlanceOnNear = fakedata.tokenListData.find((item) => item.id === token.id).ref;
  const max = `${selectedTokenBlanceOnNear}`

  const onSelectToken = (token: TokenMetadata) => {
    props.onChange({...props.value, amount: '', token })
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    console.log({ value })
    props.onChange({...props.value, amount: value, token })
  }

  return (
    <div className="flex items-center justify-between">
     <input type="number" onChange={handleInputChange} value={amount} className="mr-2 block rounded" />
    <SelectToken
      tokens={tokens}
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
  )
} 

