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

export function Token(props: TokenMetadata & { amount: string; totalAmount: string }) {
  const { symbol, icon, amount, totalAmount } = props;
  return (
    <div
      className="token flex items-center justify-between pt-3.5 pb-3.5 text-gray-700"
      title={totalAmount}
    >
      <div className="flex items-center">
        {icon ? (
          <img
            className="h-6 w-6 border rounded-full border-greenLight"
            src={icon}
            alt={toRealSymbol(symbol)}
          />
        ) : (
          <div className="h-6 w-6 border rounded-full border-greenLight"></div>
        )}
        <div className="pl-5 font-semibold text-sm">{toRealSymbol(symbol)}</div>
      </div>
      <div className="font-semibold text-sm">{amount}</div>
    </div>
  );
}

function TokenList(props: {
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
  hideEmpty?: boolean;
}) {
  const { tokens, balances, hideEmpty } = props;
  return(
    <div className="divide-y divide-gray-600">
      {tokens.map((token) => {
        const balance = balances[token.id] || '0';
        if (balance === '0' && hideEmpty) return null;
        const amount = toPrecision(
          toReadableNumber(token.decimals, balance),
          3,
          true
        );
        return <Token
          key={token.id}
          {...token}
          amount={amount}
          totalAmount={toReadableNumber(token.decimals, balance)}
        />
        })}
      {tokens.length === 0 ? (
        <div className="text-center text-gray-600 text-xs font-semibold pt-2 pb-2">
          No tokens deposited
        </div>
      ) : null}
    </div>
  )
}

function WithdrawModal(props: ReactModal.Props) {

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
export function Balance(props: {
  tokens: TokenMetadata[];
  balances:TokenBalancesView;
}) {
  const { tokens, balances } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card title="Balance" >
      <TokenList hideEmpty={true} tokens={tokens} balances={balances} />
      {tokens.length > 0 ? (
        <div className="flex items-center justify-center pt-5">
          <PrimaryButton isFull onClick={() => setIsOpen(true)}>Withdraw</PrimaryButton>
        </div>
      ) : null}
      <WithdrawModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            outline: 'none',
          },
        }}
      />
    </Card>
  );
}
