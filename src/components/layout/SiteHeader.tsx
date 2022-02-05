import React, { useContext, useEffect, useRef, useState } from "react";
import TextLogo from "./TextLogo";
import Logo from "~components/icons/logo";
import { Near } from "~components/icons/Near";
import { Link, useHistory, useLocation } from "react-router-dom";
import { REF_FARM_CONTRACT_ID, wallet } from "~services/near";
import { PrimaryButton } from "~components/button/Button";
import getConfig from "~domain/near/config";

function AccountEntry() {
  const [account, network] = wallet.getAccountId().split(".");
  const niceAccountId = `${account.slice(0, 10)}...${network || ""}`;

  const accountName =
    account.length > 10 ? niceAccountId : wallet.getAccountId();

  const isSignedIn = wallet.isSignedIn();
  const history = useHistory();

  if (!isSignedIn) {
    return (
      <PrimaryButton
        onClick={() => {
          wallet.requestSignIn(getConfig().SUPERISE_CONTRACT_ID);
        }}
      >
        Connect to NEAR
      </PrimaryButton>
    );
  }

  return (
    <PrimaryButton
      onClick={() => {
        history.push("/account");
      }}
    >
      {accountName}
    </PrimaryButton>
  );
}

const Header = () => {
  return (
    <div className="flex items-center justify-between py-6">
      <Link to="/">
        <div className="flex items-center">
          <Logo />
          <div className="m-2" />
          <TextLogo />
        </div>
      </Link>
      {/*<PrimaryButton color="red" suffixIcon={<FaArrowDown />}>Connect to NEAR</PrimaryButton> */}
      <AccountEntry />
    </div>
  );
};

export default Header;
