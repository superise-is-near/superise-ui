import React, { useState } from "react";
import Card from "~components/Card";
import { useParams } from "react-router-dom";
import { toPrecision, toReadableNumber } from "~utils/numbers";
import { toRealSymbol } from "~utils/token";
import {
  nearMetadata,
  TokenBalancesView,
  TokenMetadata,
} from "~domain/near/ft/models";
import { PrimaryButton } from "~components/button/Button";
import WithdrawModal from "./withdraw-modal";
import TokenAmount from "~components/forms/TokenAmount";
import { REF_FARM_CONTRACT_ID, wallet } from "~services/near";
import Modal from "~components/modal/modal";
import { wrapNear } from "~domain/near/wrap-near";
import { deposit_ft } from "~domain/superise/methods";
import { useDepositableBalance, useUserRegisteredTokens } from "~state/token";
import { ParasNft } from "~domain/paras/models";
import { InputValueDisplay } from "~components/forms/PrizeSelector";

export function Token(
  props: TokenMetadata & { amount: string; totalAmount: string }
) {
  const { symbol, icon, amount, totalAmount } = props;
  return (
    <div
      className="mt-2 pl-2 pr-4 token flex items-center justify-between pt-3.5 pb-3.5 text-gray-700 border-2 rounded transition"
      title={totalAmount}
    >
      <div className="flex items-center">
        {icon ? (
          <img
            className="w-6 h-6 border rounded-full border-greenLight"
            src={icon}
            alt={toRealSymbol(symbol)}
          />
        ) : (
          <div className="w-6 h-6 border rounded-full border-greenLight"></div>
        )}
        <div className="pl-5 text-sm font-semibold">{toRealSymbol(symbol)}</div>
      </div>
      <div className="text-sm font-semibold">{amount}</div>
    </div>
  );
}

function TokenList(props: {
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
  hideEmpty?: boolean;
}) {
  const { tokens, balances, hideEmpty } = props;
  return (
    <div className="divide-y divide-gray-600">
      {tokens.map((token) => {
        const balance = balances[token.id] || "0"; //toFixed(balances[token.id] || 0) || '0';
        if (balance === "0" && hideEmpty) return null;
        const amount = toPrecision(
          toReadableNumber(token.decimals, balance),
          3,
          true
        );
        // console.log("tokenList map token", token);
        return (
          <Token
            key={token.id}
            {...token}
            amount={amount}
            totalAmount={toReadableNumber(token.decimals, balance)}
          />
        );
      })}
      {tokens.length === 0 ? (
        <div className="pt-2 pb-2 text-xs font-semibold text-center text-gray-600">
          No tokens deposited
        </div>
      ) : null}
    </div>
  );
}

export default function Assets(props: {
  tokens: TokenMetadata[];
  balances: TokenBalancesView;
  nftAssets: ParasNft[];
}) {
  const { id } = useParams<{ id: string }>();
  const { tokens, balances, nftAssets } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState<boolean>(false);

  const [amount, setAmount] = useState<string>("");
  const userTokens = useUserRegisteredTokens();
  const [selectedToken, setSelectedToken] = useState<TokenMetadata>(
    id && tokens ? tokens.find((tok: any) => tok.id === id) : nearMetadata
  );
  const max = useDepositableBalance(selectedToken?.id, selectedToken?.decimals);

  const handleDeposit = () => {
    // TODO: call API with amount and selectedToken;
    if (selectedToken.id === nearMetadata.id) {
      return wrapNear(amount);
    }
    deposit_ft({
      contract_id: selectedToken.id,
      decimals: selectedToken.decimals,
      amount,
    });
  };

  return (
    <Card title="Assets">
      {showDepositModal && (
        <Modal
          isOpen={showDepositModal}
          onRequestClose={() => {
            setShowDepositModal(false);
          }}
        >
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
            <PrimaryButton isFull onClick={handleDeposit}>
              Deposit
            </PrimaryButton>
          ) : (
            <div>
              <PrimaryButton
                isFull
                onClick={() => {
                  wallet.requestSignIn(REF_FARM_CONTRACT_ID);
                }}
              >
                Connect to Near
              </PrimaryButton>
            </div>
          )}
        </Modal>
      )}
      {nftAssets &&
        nftAssets.length > 0 &&
        nftAssets.map((parasNft: ParasNft) => (
          <div
            className="mt-2"
            key={`${parasNft.nft.contract_id} ${parasNft.nft.token.token_id}`}
          >
            <InputValueDisplay
              value={{
                id: parasNft.nft.token.token_id,
                amount: "",
                token: {
                  icon: parasNft.img_url,
                  symbol: parasNft.nft.token.metadata.title,
                } as TokenMetadata,
              }}
            />
          </div>
        ))}
      <TokenList hideEmpty={true} tokens={tokens} balances={balances} />
      {/*tokens.length > 0 ? (
        <div className="flex items-center justify-center pt-5">
          <PrimaryButton isFull onClick={() => setIsOpen(true)}>Withdraw</PrimaryButton>
        </div>
      ) : null */}
      <div className="flex items-center justify-center pt-5">
        <PrimaryButton isFull onClick={() => setShowDepositModal(true)}>
          Add assets
        </PrimaryButton>
      </div>
      <WithdrawModal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            outline: "none",
          },
        }}
      />
    </Card>
  );
}
