import React, { useState } from 'react';
import Card from '~/components/Card'
import { toPrecision, toReadableNumber } from '~/utils/numbers';
import { toRealSymbol } from '~/utils/token';


export interface TokenMetadata {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
  ref?: number;
  near?: number;
  total?: number;
}

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
  // TODO: add type information
  tokens: [],
  balances: any,
  hideEmpty?: boolean
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
    </div>
  )
}
export function Balance(props: {
  tokens: [],
  balances: any,
}) {
  const { tokens, balances } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card>
      <h2 className="text-lg font-bold">Balance</h2>
      <TokenList hideEmpty={true} tokens={tokens} balances={balances} />
      {tokens.length > 0 ? (
        <div className="flex items-center justify-center pt-5">
          <button
            className={`flex flex-row w-full justify-center px-5 py-2 mt-6 text-white disabled:cursor-not-allowed mx-auto`}
            style={{
              background: 'linear-gradient(180deg, #00C6A2 0%, #008B72 100%)',
                borderRadius: '5px',
            }}
            onClick={() => setIsOpen(true)}
          >
          Withdraw 
          </button>
        </div>
      ) : null}
    </Card>
  );
}
