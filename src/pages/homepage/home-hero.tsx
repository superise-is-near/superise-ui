import React from "react";
import { NavLink } from "react-router-dom";
import { PrimaryButton } from "~components/button/Button";
import BookIcon from "~assets/book.svg";
import NearIcon from "~assets/near.svg";

function HomeHero() {
  return (
    <section className="flex flex-col items-center homepage-container pb-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Crypto & NFT giveaways made easy.
      </h1>
      <a href="/#started">
        <PrimaryButton className="mt-8 py-4 px-8">Get Started</PrimaryButton>
      </a>
      <div
        className="bg-gray-300"
        style={{
          width: "100%",
          height: "314px",
          marginTop: 60,
          borderRadius: "50px",
        }}
      />
      <div className="mt-8 flex">
        <div className="flex flex-col items-center text-center text-sm font-semibold text-gray-700 mr-10">
          <div className="w-6 h-6 mb-2 overflow-hidden">
            <img
              className="w-6 h-6"
              width="24px"
              height="24px"
              src={BookIcon}
              alt="book icon"
            />
          </div>
          <div>Proudly Opensourced</div>
        </div>
        <div className="flex flex-col items-center text-center text-sm font-semibold text-gray-700">
          <div className="w-6 h-6 mb-2 overflow-hidden">
            <img
              className="w-6 h-6"
              width="24px"
              height="24px"
              src={NearIcon}
              alt="near icon"
            />
          </div>
          <div>Powered by NEAR</div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
