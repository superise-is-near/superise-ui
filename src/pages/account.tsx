import React, { useEffect, useState } from "react";
import Card from "~components/Card";
import { useHistory } from "react-router-dom";
import Assets from "~components/account/assets";
import { wallet } from "~services/near";
import { PrimaryButton } from "~components/button/Button";
import PrizePoolGallary from "~components/prize/prize-pool-gallery";
import { useFtAssets, useWhitelistTokens } from "~state/token";
import { useAccountHistory } from "~state/prize";
import RequestSigninModal from "~components/modal/request-signin-modal";
import { nft_tokens_for_owner_in_paras } from "~domain/paras/methods";
import { ParasNft } from "~domain/paras/models";
import Footer from "~components/layout/footer";

export function AccountPage() {
  let history = useHistory();
  const isSignedIn = wallet.isSignedIn();
  if (!isSignedIn)
    return (
      <RequestSigninModal
        isOpen
        text="Connect to NEAR wallet first before visiting the account page."
      />
    );
  const ftAssets = useFtAssets();
  const historyPools = useAccountHistory();
  const tokens = useWhitelistTokens() || [];

  const [nfts, setNfts] = useState<ParasNft[]>([]);

  useEffect(() => {
    nft_tokens_for_owner_in_paras("xsb.testnet", null).then((nfts) =>
      setNfts(nfts)
    );
  }, []);
  return (
    <div className="m-auto lg:max-w-2xl">
      {/*
      {nfts.map((e) => {
        console.log("url", getImgUrlFromCid(e.nft.metadata.media));
        return <img src={getImgUrlFromCid(e.nft.metadata.media)} />;
      })}
        */}
      <Assets tokens={tokens} balances={ftAssets} nftAssets={nfts} />
      <div className="mt-8" />
      <div className="mt-8" />
      <Card title="History">
        <PrizePoolGallary pools={historyPools} />
      </Card>
      <div className="mt-8">
        <PrimaryButton
          onClick={async () => {
            wallet.signOut();
            history.push("/");
          }}
        >
          Sign out
        </PrimaryButton>
      </div>
      <Footer />
    </div>
  );
}
