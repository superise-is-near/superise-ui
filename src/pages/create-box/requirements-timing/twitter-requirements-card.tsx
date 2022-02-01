import React, { FC, useState } from "react";
import Switch from "react-switch";
import clsx from "classnames";

interface ISwitchCard {
  className?: string;
  children: string;
  checked: boolean;
  onChange: () => void;
}

const SwitchCard: FC<ISwitchCard> = ({
  children,
  onChange,
  checked,
  className,
}) => {
  return (
    <div
      className={clsx(
        "p-4 flex justify-between border border-gray-300",
        className
      )}
    >
      <div className="text-gray-600">{children}</div>
      <div className="grid place-items-center">
        <Switch
          offColor="#D1D5DB"
          onColor="#4F46E5"
          onChange={onChange}
          checked={checked}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
    </div>
  );
};

export interface ITwitterRequirementsCard {
  follow: boolean;
  like: boolean;
  retweet: boolean;
  setFollow: React.Dispatch<React.SetStateAction<boolean>>;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  setRetweet: React.Dispatch<React.SetStateAction<boolean>>;
}
const TwitterRequirementsCard: FC<ITwitterRequirementsCard> = ({
  follow,
  like,
  retweet,
  setFollow,
  setLike,
  setRetweet,
}) => {
  return (
    <section className="w-full mt-2">
      <SwitchCard
        checked={follow}
        onChange={() => setFollow(!follow)}
        className="rounded-t-2xl"
      >
        Follow Twitter account
      </SwitchCard>
      <SwitchCard
        checked={retweet}
        onChange={() => setRetweet(!retweet)}
        className="border-t-0 border-b-0"
      >
        Retweet Tweet
      </SwitchCard>
      <SwitchCard
        checked={like}
        onChange={() => setLike(!like)}
        className="rounded-b-2xl"
      >
        Like Tweet
      </SwitchCard>
    </section>
  );
};

export default TwitterRequirementsCard;
