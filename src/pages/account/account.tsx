import React, { useEffect, useState } from "react";
import { wallet } from "~services/near";
import { PrimaryButton } from "~components/button/Button";
import { useFtAssets, useWhitelistTokens } from "~state/token";
import { useAccountHistory } from "~state/prize";
import RequestSigninModal from "~components/modal/request-signin-modal";
import { ParasNft } from "~domain/paras/models";
import SecondaryTitle from "~pages/create-box/secondary-title";
import Clothes from "~/assets/clothes.svg";
import Spacer from "~components/spacer";
import Section from "~components/section";
import BoxHistoryList from "./box-history-list";
import basketIcon from "~/assets/basket.svg";
import outIcon from "~/assets/out.svg";
import { TokenBalancesView } from "~domain/near/ft/models";
import WithdrawModal from "./withdraw-modal";
import AssetsList from "./assets-list";
import {
  view_account_assets,
  withdraw_assets_transaction,
} from "~domain/superise/methods";
import { nft_token } from "~domain/near/nft/methods";

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
    view_account_assets(loginAccount).then((assets) => {
      Promise.all(
        assets.nft_assets.map((nft_asset) =>
          nft_token(nft_asset.contract_id, nft_asset.nft_id).then((nep177) =>
            ParasNft.newWithImgUrl(nep177, nft_asset.contract_id)
          )
        )
      ).then((nfts) => setNfts(nfts));
    });
  }, []);

  if (!isSignedIn)
    return (
      <RequestSigninModal
        isOpen
        text="Connect to NEAR wallet first before visiting the account page."
      />
    );

  const emptyAssets = (() => {
    const emptyNFT = nfts.length === 0;
    const emptyFT =
      Object.keys(ftAssets).length === 0 ||
      !Object.keys(ftAssets).find((key) => ftAssets[key] !== "0");
    return emptyNFT && emptyFT;
  })();
  return (
    <div className="m-auto mt-5 lg:max-w-2xl">
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        nfts={nfts}
        fts={ftAssets}
        tokens={tokens}
        onWithdraw={async ({ fts, nfts }) => {
          // TODO: xsb will help to debug this API
          // let nft_assets: NftAsset[] = nfts.map(e=>{return {contract_id: }})
          await withdraw_assets_transaction(
            nfts.map((e) => {
              return {
                contract_id: e.nft.contract_id,
                nft_id: e.nft.token.token_id,
              };
            }),
            Object.keys(fts).map((key) => {
              return { contract_id: key, balance: fts[key] };
            })
          );
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
          disabled={emptyAssets}
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

      {/* <SecondaryTitle icon={bookIcon} select className="mt-8">
        ACTIVITY
      </SecondaryTitle>
      <Spacer h="16px" />
      <Section>
        <div className="-mx-4 -my-4">
          <ActivityList loginAccount={wallet.getAccountId()} />
        </div>
      </Section> */}

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
