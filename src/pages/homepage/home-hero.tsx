import React from "react";
import { PrimaryButton } from "~components/button/Button";
import BookIcon from "~assets/book.svg";
import NearIcon from "~assets/near.svg";
import heroImage from "~assets/hero-image.png";

function HomeHero() {
  return (
    <section className="flex flex-col items-center pb-12 homepage-container">
      <h1 className="text-4xl font-bold text-center sm:text-5xl">
        Crypto & NFT giveaways like it's 2077.
      </h1>
      <a href="/box/create">
        <PrimaryButton className="px-8 py-4 mt-8">Get Started</PrimaryButton>
      </a>
      <img src={heroImage} className="pt-4 mt-12" />
      <div className="flex mt-8">
        <div className="flex flex-col items-center mr-10 text-sm font-semibold text-center text-gray-700">
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
        <div className="flex flex-col items-center text-sm font-semibold text-center text-gray-700">
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
