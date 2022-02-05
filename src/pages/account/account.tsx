import React, { useEffect, useState } from "react";
import { wallet } from "~services/near";
import { PrimaryButton } from "~components/button/Button";
import { useFtAssets, useWhitelistTokens } from "~state/token";
import { useAccountHistory } from "~state/prize";
import RequestSigninModal from "~components/modal/request-signin-modal";
import { nft_tokens_for_owner_in_paras } from "~domain/paras/methods";
import { ParasNft } from "~domain/paras/models";
import SecondaryTitle from "~pages/create-box/secondary-title";
import Clothes from "~/assets/clothes.svg";
import Spacer from "~components/spacer";
import Section from "~components/section";
import BoxHistoryList from "./box-history-list";
import ActivityList from "./assets-activity";
import basketIcon from "~/assets/basket.svg";
import bookIcon from "~/assets/book-open.svg";
import outIcon from "~/assets/out.svg";
import { TokenBalancesView } from "~domain/near/ft/models";
import WithdrawModal from "./withdraw-modal";
import AssetsList from "./assets-list";
import {
  withdraw_ft_transaction,
  withdraw_nft,
} from "~domain/superise/methods";

const AccountPage = () => {
  let [isSigningOut, setIsSigningOut] = useState(false);
  let [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const isSignedIn = wallet.isSignedIn();
  const ftAssets: TokenBalancesView = useFtAssets() || {};
  const historyPools = useAccountHistory();
  const tokens = useWhitelistTokens() || [];
  const loginAccount = wallet.getAccountId();

  const [nfts, setNfts] = useState<ParasNft[]>([]);

  useEffect(() => {
    nft_tokens_for_owner_in_paras(loginAccount, null).then((nfts) =>
      setNfts(nfts)
    );
  }, []);

  if (!isSignedIn)
    return (
      <RequestSigninModal
        isOpen
        text="Connect to NEAR wallet first before visiting the account page."
      />
    );
  return (
    <div className="m-auto mt-5 lg:max-w-2xl">
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        nfts={nfts}
        fts={ftAssets}
        tokens={tokens}
        onWithdraw={async ({ fts, nfts }) => {
          // TODO: xsb will help to debug this API
          console.log({ fts, nfts });
          const ftPromises = Object.keys(fts).map((key) => {
            return withdraw_ft_transaction("wrap.testnet", fts["wrap.testnet"]);
          });
          const nftPromises = nfts.map((item) => {
            return withdraw_nft(item.nft.contract_id, item.nft.token.token_id);
          });
          Promise.all([...ftPromises, ...nftPromises])
            .then((r) => {
              console.log({ r });
              setIsWithdrawModalOpen(false);
            })
            .catch((e) => {
              console.log({ e });
              setIsWithdrawModalOpen(false);
            });
        }}
        onRequestClose={() => {
          setIsWithdrawModalOpen(false);
        }}
      />
      <h2 className="text-5xl font-bold leading-none">Account</h2>
      <SecondaryTitle select={true} className="mt-12" icon={basketIcon}>
        ASSETS
      </SecondaryTitle>
      <Spacer h="16px" />
      <Section>
        <AssetsList nfts={nfts} fts={ftAssets} tokens={tokens} />
        <Spacer h="32px" />
        <PrimaryButton
          isFull
          size="large"
          onClick={() => {
            setIsWithdrawModalOpen(true);
          }}
        >
          Withdraw Assets
        </PrimaryButton>
      </Section>

      <SecondaryTitle icon={Clothes} select className="mt-8">
        GIVEAWAY HISTORY
      </SecondaryTitle>
      <Spacer h="16px" />
      <Section>
        <BoxHistoryList />
      </Section>

      <SecondaryTitle icon={bookIcon} select className="mt-8">
        ACTIVITY
      </SecondaryTitle>
      <Spacer h="16px" />
      <Section>
        <div className="-mx-4 -my-4">
          <ActivityList loginAccount={wallet.getAccountId()} />
        </div>
      </Section>

      <Spacer h="48px" />
      <PrimaryButton
        loading={isSigningOut}
        size="large"
        isFull
        prefixIcon={<img src={outIcon} />}
        onClick={() => {
          setIsSigningOut(true);
          setTimeout(() => {
            wallet.signOut();
            window.location.href = "/";
          }, 1000);
        }}
      >
        Disconnect Wallet
      </PrimaryButton>
    </div>
  );
};

export default AccountPage;
