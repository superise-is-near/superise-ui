import React, { Fragment, useState } from 'react';
import {wallet} from "~services/near";
import Card from "~/components/Card"
import { useHistory, useParams } from 'react-router-dom';
import { Balance } from '~/components/account/Account';
import fakedata from '~/fakedata/account';
import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import { PrimaryButton } from '~/components/button/Button'
import TokenAmount from '~components/forms/TokenAmount';
import { nearMetadata, TokenMetadata } from '~domain/near/ft/models';

export function AccountPage() {
  // TODO: replace fakedata with realdata
  const { id } = useParams< { id: string }>();

  const [amount, setAmount] = useState<string>('');
  const max = '0.327717045710573699999993';

  const tokens = fakedata.whiteListTokens;
  const [selectedToken, setSelectedToken] = useState<TokenMetadata>(
    id && tokens ? tokens.find((tok) => tok.id === id) : nearMetadata
  );
  const history = useHistory();

  return <div className="m-4">
    <Balance tokens={wallet.isSignedIn() ? fakedata.tokens : []} balances={fakedata.balances} />
    <div className="mt-8" />
    <Card>
      <h2 className="text-lg font-bold">Deposit</h2>
        <TokenAmount
          amount={amount}
          max={max}
          total={max}
          tokens={[nearMetadata, ...tokens]}
          selectedToken={selectedToken}
          onSelectToken={setSelectedToken}
          onChangeAmount={setAmount}
          text={selectedToken.symbol}
          balances={fakedata.balances}
        />
      {wallet.isSignedIn() ? (
          <PrimaryButton isFull>Deposit</PrimaryButton>
      ) : (
        <div>
          <PrimaryButton isFull onClick={() => {wallet.requestSignIn(REF_FARM_CONTRACT_ID)}}>Connect to Near</PrimaryButton>
        </div>
      )}
    </Card>
    <div className="mt-8">
      <PrimaryButton onClick={async () => {
        wallet.signOut();
        window.location.assign('/');
      }}>Sign out</PrimaryButton>
    </div>
  </div>

}
