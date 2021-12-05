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
import {
  useDepositableBalance,
  useFtAssets,
  useTokenBalances,
  useUserRegisteredTokens,
  useWhitelistTokens
} from "~state/token";
import {nearViewCall} from "~domain/near/global";
import {wrapNear} from "~domain/near/wrap-near";
import {deposit_ft} from "~domain/superise/methods";



export function AccountPage() {
  // TODO: replace fakedata with realdata
  const { id } = useParams< { id: string }>();

  const [amount, setAmount] = useState<string>('');

  const balances = useTokenBalances();
  const ftAssets = useFtAssets();
  const mypools = fakedata_pool.display_pools;

  // max should get from the balance from when switching tokens, now just get
  // it from the fakedata.tokenListData
  // const selectedTokenBlanceOnNear = fakedata.tokenListData.find((item:any) => item.id === selectedToken.id).near;
  // const max = `${selectedTokenBlanceOnNear}`

  const userTokens = useUserRegisteredTokens();
  const tokens = useWhitelistTokens();
  const [selectedToken, setSelectedToken] = useState<TokenMetadata>(
      id && tokens ? tokens.find((tok: any) => tok.id === id) : nearMetadata
  );
  const max = useDepositableBalance(selectedToken?.id, selectedToken?.decimals);

  const handleDeposit = () => {
    // TODO: call API with amount and selectedToken;
    if(selectedToken.id === nearMetadata.id) {
      return wrapNear(amount);
    }
    deposit_ft({token: selectedToken,amount})
  }

  return <CenterWrap>
    <Assets tokens={tokens} balances={ftAssets} />
    <div className="mt-8" />
    <Card title="Deposit">
        <TokenAmount
          amount={amount}
          max={max}
          total={max}
          tokens={[nearMetadata, ...tokens]}
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
    <Card title="History">
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
