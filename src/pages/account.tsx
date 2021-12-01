import React, { Fragment, useState } from 'react';
import Card from "~/components/Card"
import { useHistory, useParams } from 'react-router-dom';
import Assets from '~/components/account/assets';
import fakedata from '~/fakedata/account.json';
import fakedata_pool from '~/fakedata/pool.json';
import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import { PrimaryButton } from '~/components/button/Button'
import TokenAmount from '~components/forms/TokenAmount';
import { nearMetadata, TokenMetadata } from '~domain/near/ft/models';
import PrizePoolGallary from '~components/prize/prize-pool-gallery'
import CenterWrap from '~components/layout/center-wrap';
import { toReadableNumber } from '~utils/numbers';
import {useTokenBalances, useUserRegisteredTokens} from "~state/token";



export function AccountPage() {
  // TODO: replace fakedata with realdata
  const { id } = useParams< { id: string }>();

  const [amount, setAmount] = useState<string>('');

  const tokens = fakedata.whiteListTokens;
  const balances = useTokenBalances();
  const mypools = fakedata_pool.pools;
  const [selectedToken, setSelectedToken] = useState<TokenMetadata>(
    id && tokens ? tokens.find((tok: any) => tok.id === id) : nearMetadata
  );
  // max should get from the balance from when switching tokens, now just get
  // it from the fakedata.tokenListData
  const selectedTokenBlanceOnNear = fakedata.tokenListData.find((item:any) => item.id === selectedToken.id).near;
  const max = `${selectedTokenBlanceOnNear}`

  const userTokens = useUserRegisteredTokens();


  const handleDeposit = () => {
    // TODO: call API with amount and selectedToken;
    console.log({ amount, selectedToken });
  }

  return <CenterWrap>
    <Assets tokens={userTokens} balances={balances} />
    <div className="mt-8" />
    <Card title="Deposit">
        <TokenAmount
          amount={amount}
          max={max}
          total={max}
          tokens={[nearMetadata, ...userTokens]}
          selectedToken={selectedToken}
          onSelectToken={setSelectedToken}
          onChangeAmount={setAmount}
          text={selectedToken.symbol}
          balances={balances}
        />
      {wallet.isSignedIn() ? (
          <PrimaryButton isFull onClick={handleDeposit}>Deposit</PrimaryButton>
      ) : (
        <div>
          <PrimaryButton isFull onClick={() => {wallet.requestSignIn(REF_FARM_CONTRACT_ID)}}>Connect to Near</PrimaryButton>
        </div>
      )}
    </Card>
    <div className="mt-8" />
    <Card title="My boxes">
      <PrizePoolGallary pools={mypools}/>
    </Card>
    <div className="mt-8">
      <PrimaryButton onClick={async () => {
        wallet.signOut();
        window.location.assign('/');
      }}>Sign out</PrimaryButton>
    </div>
  </CenterWrap>

}
