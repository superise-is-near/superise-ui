import React, { FC } from "react";
import PencilIcon from "~assets/pencil.svg";

interface ICollapsedCard {
  follow: boolean;
  like: boolean;
  retweet: boolean;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
}

const generateTitle = ({
  follow,
  like,
  retweet,
}: {
  follow: boolean;
  like: boolean;
  retweet: boolean;
}): string => {
  if (follow && like && retweet) return "Follow, Like & Retweet";

  if (follow && like) return "Follow & Like";
  if (retweet && like) return "Retweet & Like";
  if (follow && retweet) return "Follow & Retweet";

  if (follow) return "Follow";
  if (like) return "Like";
  if (retweet) return "Retweet";

  return "No Requirements";
};

const CollapsedCard: FC<ICollapsedCard> = ({
  follow,
  like,
  retweet,
  setProgress,
}) => {
  return (
    <section className="w-full mt-2">
      <div className="p-4 flex justify-between border border-gray-300 rounded-2xl">
        <div className="text-gray-600">
          {generateTitle({ follow, like, retweet })}
        </div>
        <div className="grid place-items-center">
          <img
            src={PencilIcon}
            width="24px"
            height="24px"
            alt="modify image"
            onClick={() => setProgress(1)}
            role="button"
          />
        </div>
      </div>
    </section>
  );
};

export default CollapsedCard;
