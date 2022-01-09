import React from "react";
import { Near } from "~/components/icons/Near";
import { Link } from "react-router-dom";
import { wallet } from "~services/near";
import getConfig from "~domain/near/config";
import SurpriseIcon from "~assets/logo.svg";
import LanguageIcon from "~assets/language.svg";
import clsx from "classnames";

function AccountEntry() {
  const [account, network] = wallet.getAccountId().split(".");
  const niceAccountId = `${account.slice(0, 10)}...${network || ""}`;

  const accountName =
    account.length > 10 ? niceAccountId : wallet.getAccountId();

  return (
    <div className="bg-primary text-white py-1 px-5 rounded-full">
      <div className="flex items-center text-xs cursor-pointer font-bold">
        <div className="pr-2">
          <Near />
        </div>
        {wallet.isSignedIn() ? (
          <Link to="/account">{accountName}</Link>
        ) : (
          <button
            onClick={() =>
              wallet.requestSignIn(getConfig().SUPERISE_CONTRACT_ID)
            }
          >
            <span className="text-xs">Conect to NEAR</span>
          </button>
        )}
      </div>
    </div>
  );
}

function NavigationBar() {
  return (
    <>
      <nav
        className="fixed z-50 top-0 w-full flex items-center justify-between px-20 m-auto col-span-8 shadow text-dark bg-white"
        style={{ height: "80px" }}
      >
        <Link className="flex justify-center items-center" to="/">
          <SurpriseIcon />
          <p className="font-bold text-xl ml-4 primary">Surprise</p>
        </Link>
        <div className="flex font-medium">
          <Link
            to="/"
            className={clsx(
              "mr-4 rounded hover:text-gray-500 transition ease-in-out delay-50",
              "underline underline-offset"
            )}
          >
            Product
          </Link>
          <a
            href="https://sixth-motion-b7e.notion.site/Surprise-Roadmap-813c17e1bd994f5c811eb5d5d076f00f"
            className={clsx(
              "mr-4 rounded hover:text-gray-500 transition ease-in-out delay-50"
            )}
            target="_blank"
            rel="noreferrer opener"
          >
            Roadmap
          </a>
          <Link
            to=""
            className={clsx(
              "mr-4 rounded hover:text-gray-500 transition ease-in-out delay-50"
            )}
          >
            Contact us
          </Link>
        </div>
        <div className="flex justify-center align-center">
          <div className="grid place-items-center mr-4 cursor-pointer">
            <LanguageIcon />
          </div>
          <AccountEntry />
        </div>
      </nav>
      <div style={{ marginTop: "80px" }}></div>
    </>
  );
}

export default NavigationBar;
//
// export default {}
