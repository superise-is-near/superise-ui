import React, { FC, useState, useEffect } from "react";
import GiveAwayPrizes from "./give-away-prizes";
import Clothes from "~/assets/clothes.svg";
import Clock from "~/assets/clock.svg";
import Hor from "~/assets/hor.svg";
import DeepClothes from "~/assets/deep-clothes.svg";
import DeepClock from "~/assets/deep-clock.svg";
import DeepHor from "~/assets/deep-hor.svg";
import SecondaryTitle from "./secondary-title";
import RequirementsTiming from "./requirements-timing";
import CustomTweet from "./custom-tweet";

const CreateBox: FC = () => {
  const [progress, setProgress] = useState(0);
  const [hasFillRequirements, setHasFillRequirements] = useState(false);

  useEffect(() => {
    if (progress === 1) {
      setHasFillRequirements(true);
    }
  }, [progress]);

  // progress 2
  const [follow, setFollow] = useState<boolean>(false);
  const [retweet, setRetweet] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);

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

      {/* progress 2, select requirements */}
      <SecondaryTitle
        select={progress >= 1}
        className="mt-12"
        icon={Clock}
        deepIcon={DeepClock}
      >
        Requirements &amp; Timing
      </SecondaryTitle>
      {hasFillRequirements && (
        <RequirementsTiming
          collapsed={progress !== 1}
          setProgress={setProgress}
          progress={progress}
          follow={follow}
          setFollow={setFollow}
          retweet={retweet}
          setRetweet={setRetweet}
          like={like}
          setLike={setLike}
        />
      )}

      {/* progress 3, send tweet */}
      <SecondaryTitle
        select={progress === 2}
        className="mt-12"
        icon={Hor}
        deepIcon={DeepHor}
      >
        CUSTOMIZE TWEET
      </SecondaryTitle>
      <CustomTweet
        progress={progress}
        follow={follow}
        like={like}
        retweet={retweet}
        username={"steve"}
      />
    </main>
  );
};

export default CreateBox;
