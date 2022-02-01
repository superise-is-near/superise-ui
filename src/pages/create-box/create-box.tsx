import React, { FC, useState } from "react";
import GiveAwayPrizes from "./give-away-prizes";
import Clothes from "~/assets/clothes.svg";
import Clock from "~/assets/clock.svg";
import Hor from "~/assets/hor.svg";
import DeepClothes from "~/assets/deep-clothes.svg";
import DeepClock from "~/assets/deep-clock.svg";
import DeepHor from "~/assets/deep-hor.svg";
import SecondaryTitle from "./secondary-title";

const CreateBox: FC = () => {
  const [progress, setProgress] = useState(0);
  return (
    <main className="m-auto lg:max-w-2xl">
      <h1 className="text-5xl font-bold">Create Giveaway</h1>
      {/* progress 1, select prize */}
      <SecondaryTitle
        select={progress >= 0}
        className="mt-12"
        icon={Clothes}
        deepIcon={DeepClothes}
      >
        ADD GIVEAWAY PRIZES
      </SecondaryTitle>
      <GiveAwayPrizes collapsed={progress !== 0} setProgress={setProgress} />

      <SecondaryTitle
        select={progress === 1}
        className="mt-12"
        icon={Clock}
        deepIcon={DeepClock}
      >
        Requirements &amp; Timing
      </SecondaryTitle>

      <SecondaryTitle
        select={progress === 2}
        className="mt-12"
        icon={Hor}
        deepIcon={DeepHor}
      >
        CUSTOMIZE TWEET
      </SecondaryTitle>
    </main>
  );
};

export default CreateBox;
