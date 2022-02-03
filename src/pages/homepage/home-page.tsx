import React from "react";
import HomeHero from "./home-hero";
import HottestGiveaway from "./hottest-giveaway";
import MiddleHero from "./middle-hero";

const HomePage = () => {
  return (
    <main className="flex flex-col items-center margin-0">
      <HomeHero />
      <MiddleHero />
      <HottestGiveaway />
    </main>
  );
};

export default HomePage;
