import React, { useState } from 'react';
import Modal from 'react-modal';
import Card from '~/components/Card'
import { toPrecision, toReadableNumber } from '~/utils/numbers';
import { toRealSymbol } from '~/utils/token';
import { nearMetadata, TokenBalancesView, TokenMetadata } from '~domain/near/ft/models';
import { PrimaryButton } from '~components/button/Button';
import InputAmount from '~components/forms/InputAmount';
import TokenAmount from '~components/forms/TokenAmount';
import fakedata from '~/fakedata/account';

export default function WithdrawModal(props: ReactModal.Props) {

  const [amount, setAmount] = useState<string>('');
  const tokens = fakedata.whiteListTokens;
  const [selectedToken, setSelectedToken] = useState<TokenMetadata>(nearMetadata)

  // max should get from the balance from when switching tokens in ref, now just get
  // it from the fakedata.tokenListData
  const selectedTokenBlanceOnNear = fakedata.tokenListData.find((item) => item.id === selectedToken.id).ref;
  const max = `${selectedTokenBlanceOnNear}`

  const handleWithdraw = () => {
    console.log({ selectedToken, amount });
  }

  return (<Modal {...props}>
    <div style={{ width: '25vw', minWidth: '24rem' }}>
      <Card title="Withdraw Token">
        <div className="mt-8">
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
          <div className="mt-6">
            <PrimaryButton isFull onClick={handleWithdraw}>Withdraw</PrimaryButton>
          </div>
        </div>
      </Card>
    </div>
    </Modal>)
}
