import React, { useState, FC } from "react";
import Switch from "react-switch";

interface IPrizeSelectType {
  follow: string;
  hasFollow: boolean;
  hasRetweet: boolean;
  hasLike: boolean;
}

const Participant: FC<IPrizeSelectType> = ({
  follow,
  hasFollow,
  hasRetweet,
  hasLike,
}) => {
  return (
    <section>
      <div className="w-full mt-2 rounded-md border-gray-300 border px-4 py-3 flex justify-between">
        <div>Follow {follow}</div>
        <Switch
          offColor="#9CA3AF"
          onColor="#111827"
          onChange={() => {}}
          checked={hasFollow}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
      <div className="w-full mt-2 rounded-md border-gray-300 border px-4 py-3 flex justify-between">
        <div>Retweet this tweet</div>
        <Switch
          offColor="#9CA3AF"
          onColor="#111827"
          onChange={() => {}}
          checked={hasRetweet}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
      <div className="w-full mt-2 rounded-md border-gray-300 border px-4 py-3 flex justify-between">
        <div>Like this tweet</div>
        <Switch
          offColor="#9CA3AF"
          onColor="#111827"
          onChange={() => {}}
          checked={hasLike}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
    </section>
  );
};

export default Participant;
