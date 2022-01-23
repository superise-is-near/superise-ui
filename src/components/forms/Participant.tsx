import React, { useState, FC } from "react";
import Switch from "react-switch";
import {
  TwitterLikeRequirmentInputValue,
  TwitterRetweetRequirmentInputValue,
  TwitterFollowRequirmentInputValue,
  RequirmentType,
} from "~domain/superise/twitter_giveaway/models";

export type requirementsValue = (
  | TwitterLikeRequirmentInputValue
  | TwitterFollowRequirmentInputValue
  | TwitterRetweetRequirmentInputValue
)[];

interface IPrizeSelectType {
  value: requirementsValue;
  onChange?: (value: requirementsValue) => void;
  readonly?: boolean;
}

export const defaultRequirments = [
  {
    requirment_type: RequirmentType.TwitterFollow,
    screen_name: "",
    required: false,
  },
  {
    requirment_type: RequirmentType.TwitterRetweet,
    tweet_link: "",
    required: false,
  },
  {
    requirment_type: RequirmentType.TwitterLike,
    tweet_link: "",
    required: false,
  },
];

const Participant: FC<IPrizeSelectType> = ({ value, onChange, readonly }) => {
  const followRequirment = value.find(
    (item) => item.requirment_type === RequirmentType.TwitterFollow
  ) as TwitterFollowRequirmentInputValue;
  const retweetRequirment = value.find(
    (item) => item.requirment_type === RequirmentType.TwitterRetweet
  ) as TwitterRetweetRequirmentInputValue;
  const likeRequirment = value.find(
    (item) => item.requirment_type === RequirmentType.TwitterLike
  ) as TwitterLikeRequirmentInputValue;

  return (
    <section>
      <div className="flex justify-between w-full px-4 py-3 mt-2 border border-gray-300 rounded-md">
        <div>Follow @{followRequirment.screen_name}</div>
        {!readonly && (
          <Switch
            offColor="#9CA3AF"
            onColor="#111827"
            onChange={() => {
              const updatedRequirments = value.map((item) => {
                if (item.requirment_type !== RequirmentType.TwitterFollow)
                  return item;
                return { ...item, required: !item.required };
              });
              onChange(updatedRequirments);
            }}
            checked={followRequirment.required}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        )}
      </div>
      <div className="flex justify-between w-full px-4 py-3 mt-2 border border-gray-300 rounded-md">
        <div>Retweet this tweet</div>
        {!readonly && (
          <Switch
            offColor="#9CA3AF"
            onColor="#111827"
            onChange={() => {
              const updatedRequirments = value.map((item) => {
                if (item.requirment_type !== RequirmentType.TwitterRetweet)
                  return item;
                return { ...item, required: !item.required };
              });
              onChange(updatedRequirments);
            }}
            checked={retweetRequirment.required}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        )}
      </div>
      <div className="flex justify-between w-full px-4 py-3 mt-2 border border-gray-300 rounded-md">
        <div>Like this tweet</div>
        {!readonly && (
          <Switch
            offColor="#9CA3AF"
            onColor="#111827"
            onChange={() => {
              const updatedRequirments = value.map((item) => {
                if (item.requirment_type !== RequirmentType.TwitterLike)
                  return item;
                return { ...item, required: !item.required };
              });
              onChange(updatedRequirments);
            }}
            checked={likeRequirment.required}
            uncheckedIcon={false}
            checkedIcon={false}
          />
        )}
      </div>
    </section>
  );
};

export default Participant;
