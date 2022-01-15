import React, { useContext, useEffect, useRef, useState } from "react";
import TextLogo from "./TextLogo";
import Logo from "~/components/icons/logo";
import { Near } from "~/components/icons/Near";
import { Link, useLocation } from "react-router-dom";
import { REF_FARM_CONTRACT_ID, wallet } from "~services/near";
import { PrimaryButton } from "~/components/button/Button";

function AccountEntry() {
  const [account, network] = wallet.getAccountId().split(".");
  const niceAccountId = `${account.slice(0, 10)}...${network || ""}`;

  const accountName =
    account.length > 10 ? niceAccountId : wallet.getAccountId();

  const isSignedIn = wallet.isSignedIn();

  if (!isSignedIn) {
    <PrimaryButton
      color="#1C9954"
      size="small"
      onClick={() => {
        wallet.requestSignIn(REF_FARM_CONTRACT_ID);
      }}
    >
      Connect to NEAR
    </PrimaryButton>;
  }

  return (
    <PrimaryButton
      color="#1C9954"
      size="small"
      onClick={() => {
        window.location.assign("/account");
      }}
    >
      {accountName}
    </PrimaryButton>
  );
}

const Header = () => {
  return (
    <div className="flex items-center justify-between py-6">
      <div className="flex items-center">
        <Logo color="#1C9954" />
        <div className="m-2" />
        <TextLogo />
      </div>
      {/*<PrimaryButton color="red" suffixIcon={<FaArrowDown />}>Connect to NEAR</PrimaryButton> */}
      <AccountEntry />
    </div>
  );
};

export default Header;
