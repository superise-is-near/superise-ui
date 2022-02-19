import React from "react";
import Logo from "~assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { wallet } from "~services/near";
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
          <img
            src={Logo}
            alt="logo"
            width="auto"
            height="36px"
            loading="lazy"
          />
        </div>
      </Link>
      {/*<PrimaryButton color="red" suffixIcon={<FaArrowDown />}>Connect to NEAR</PrimaryButton> */}
      <AccountEntry />
    </div>
  );
};

export default Header;
