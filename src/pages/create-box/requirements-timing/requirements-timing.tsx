import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { PrimaryButton } from "~components/button/Button";
import VerticalLine from "../vertical-line";
import CollapsedCard from "./CollapsedCard";
import RevealTime from "./reveal-time";
import TwitterRequirementsCard, {
  ITwitterRequirementsCard,
} from "./twitter-requirements-card";

interface IRequirements extends ITwitterRequirementsCard {
  progress: number;
  collapsed: boolean;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const RequirementsTiming: FC<IRequirements> = ({
  progress,
  collapsed,
  setProgress,
  follow,
  like,
  retweet,
  setFollow,
  setLike,
  setRetweet,
}) => {
  const history = useHistory();
  return (
    <section className="flex">
      <VerticalLine bgLight={progress <= 1} className="mr-4" />
      {collapsed && (
        <CollapsedCard
          follow={follow}
          like={like}
          retweet={retweet}
          setProgress={setProgress}
        />
      )}
      {!collapsed && (
        <div className="w-full">
          <h3 className="mt-4 mb-3 text-xs text-gray-700 font-semibold">
            REQUIREMENTS
          </h3>
          <TwitterRequirementsCard
            follow={follow}
            like={like}
            retweet={retweet}
            setFollow={setFollow}
            setLike={setLike}
            setRetweet={setRetweet}
          />

          <h3 className="mt-8 mb-3 text-xs text-gray-700 font-semibold">
            REVEAL TIME
          </h3>
          <RevealTime />

          <PrimaryButton
            size="large"
            className="my-6"
            onClick={() => {
              history.push({
                search: "?progress=2",
              });
              setProgress(2);
            }}
          >
            Continue
          </PrimaryButton>
        </div>
      )}
    </section>
  );
};

export default RequirementsTiming;
