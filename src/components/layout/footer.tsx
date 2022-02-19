import React from "react";
import { Link } from "react-router-dom";
import Logo from "~assets/logo.svg";

export default () => {
  return (
    <div className="mt-6 text-gray-500 flex justify-between">
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
      <div className="flex items-end">
        <a href="https://twitter.com/superise_" target="_blank">
          <div className="ml-4 font-bold cursor-pointer hover:underline">
            TWITTER
          </div>
        </a>

        <a href="https://discord.gg/pPDXrKV6" target="_blank">
          <div className="ml-4 font-bold cursor-pointer hover:underline">
            DISCORD
          </div>
        </a>

        <a href="https://github.com/surprise-is-near" target="_blank">
          <div className="ml-4 font-bold cursor-pointer hover:underline">
            GITHUB
          </div>
        </a>

        <a href="mailto:contact@superise.xyz" target="_blank">
          <div className="ml-4 font-bold cursor-pointer hover:underline">
            CONTACT US
          </div>
        </a>
      </div>
    </div>
  );
};
