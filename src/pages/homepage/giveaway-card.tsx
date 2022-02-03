import React from "react";
import { PrimaryButton } from "~components/button/Button";
import IndigoClothes from "~assets/indigo-clothes.svg";
import IndigoClock from "~assets/indigo-clock.svg";

const demoImage =
  "https://s3-alpha-sig.figma.com/img/10d7/2e94/2249250dfe81b1045cb19240c5875f09?Expires=1644796800&Signature=WDjxbzyaIR1bkZbmtmPmSznerMOxTZfMh41d5mpGhTj24Je7WcgC7rWP~kBQ3zUo6RWdchQCtjZf4XEdC7v6DrNlXO4BcVLEfi2Qcy1BxCtyir20OLa~KxCAoCgL8tP5z2L1yeYexV1pujqnUgs3~JJVa1ml3iZShaD2kQVa~wR4kziPEJQak5c8FFnjBXbsI~NE6hp2J6bhDk-1dIwDF~CgTeFSa~b8rLhhE14INT9GoSKsD3fxiII6zOrUpH1W0vtr8na~GBq-~UmT96dvAx3K96wIMmSrr5Dc5J9G8Fgcv1fFWWjLPGQtMKpNCca77n7txxehDud8vFIPZgueXA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";

function GiveawayCard() {
  return (
    <section className="relative">
      <div className="absolute top-0 w-25 h-25 rounded-xl overflow-hidden">
        <img
          className="w-25 h-25"
          src={demoImage}
          alt="demoImage"
          width="100px"
          height="100px"
        />
      </div>
      <div
        className="bg-white px-4 pb-4 rounded-2xl border-gray-300 border"
        style={{ marginTop: "50px", paddingTop: "50px" }}
      >
        <div className="mt-8 flex">
          <div className="w-6 h-6 mr-4">
            <img
              style={{ width: "24px", height: "24px" }}
              className="w-6 h-6"
              src={IndigoClothes}
              alt="clothes"
              width="100px"
              height="100px"
            />
          </div>
          <div>
            <h5>CryptoFluffs #254</h5>
            <p className="mt-1 text-sm text-gray-400">NFT</p>
          </div>
        </div>

        <div className="mt-4 flex">
          <div className="w-6 h-6 mr-4">
            <img
              style={{ width: "24px", height: "24px" }}
              className="w-6 h-6"
              src={IndigoClock}
              alt="clock"
              width="100px"
              height="100px"
            />
          </div>
          <div>
            <h5>Follow, Like &amp; Retweet</h5>
            <p className="mt-1 text-sm text-gray-400">
              Ends on 13th Feb. 18:45
            </p>
          </div>
        </div>
        <PrimaryButton className="mt-6" size="large" isFull>
          View Giveaway
        </PrimaryButton>
      </div>
    </section>
  );
}

export default GiveawayCard;
