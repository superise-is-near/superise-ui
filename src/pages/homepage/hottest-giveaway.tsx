import React from "react";
import FireFill from "~assets/fire-fill.svg";
import GiveawayCard from "./giveaway-card";

function HottestGiveaway() {
  return (
    <section
      id="hottest-giveaway"
      className="w-full flex flex-col items-center homepage-container"
    >
      <div className="w-13 h-13 mt-8">
        <img
          className="w-13 h-13"
          width="52px"
          height="52px"
          src={FireFill}
          alt="lighting"
        />
      </div>
      <h2 className="mt-4 text-4xl font-bold text-center">Hottest Giveaways</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 home-page-giveaway-cards"
        style={{ marginTop: "70px" }}
      >
        <GiveawayCard />
        <GiveawayCard />
        <GiveawayCard />
        <GiveawayCard />
        <GiveawayCard />
        <GiveawayCard />
      </div>
    </section>
  );
}

export default HottestGiveaway;
