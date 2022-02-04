import React, { FC, useMemo } from "react";
import { AssetsActivity } from "~domain/superise/models";

interface IActivityList {
  loginAccount: string;
}

const activityData = [
  {
    activitity_id: 1,
    time: "11h",
    sender: "xsb.testnet",
    receiver: "superise.near",
    tx_hash: "xxxx",
    message: "Giveaway #1 created",
    asset_type: "FT",
    contract_id: "wNear.testnet",
    amount: "5",
    nft_id: "",
  },
  {
    activitity_id: 2,
    time: "11h",
    sender: "xsb.testnet",
    receiver: "superise.near",
    tx_hash: "xxxx",
    message: "Giveaway #1 created",
    asset_type: "NFT",
    contract_id: "parasid.testnet",
    amount: "5",
    nft_id: "Moon Card #12",
  },
  {
    activitity_id: 3,
    time: "11h",
    sender: "superise.near",
    receiver: "xsb.testnet",
    tx_hash: "xxxx",
    message: "Giveaway #2 won",
    asset_type: "FT",
    contract_id: "wNear.testnet",
    amount: "5",
    nft_id: "",
  },
  {
    activitity_id: 4,
    time: "11h",
    sender: "superise.testnet",
    receiver: "xsb.testnet",
    tx_hash: "xxxx",
    message: "Giveaway #2 won",
    asset_type: "NFT",
    contract_id: "parasid.testnet",
    amount: "1",
    nft_id: "Moon Card #12",
  },
];

const ActivityList: FC<IActivityList> = ({ loginAccount }) => {
  const activities: AssetsActivity[] = activityData;
  return (
    <ul>
      {activityData.map((item) => {
        const {
          activitity_id,
          message,
          sender,
          receiver,
          asset_type,
          time,
          amount,
          nft_id,
          contract_id,
        } = item;

        const isIncrease = receiver === loginAccount;
        const color = isIncrease ? "#3B82F6" : "#F97316";
        const directionText = isIncrease ? "+" : "-";
        const assetsDescription = (() => {
          if (asset_type === "NEAR") return `${amount} NEAR`;
          if (asset_type === "FT") return `${amount} ${contract_id}`;
          if (asset_type === "NFT") return `${amount} ${nft_id}`;
          return `${amount} Unknow type`;
        })();

        return (
          <li
            key={activitity_id}
            className="flex justify-between px-4 py-4 border-b border-gray-300 last:border-0"
          >
            <section className="flex flex-col items-start">
              <span className="text-base font-normal text-gray-700 leading-6">
                {message}
              </span>
              <span className="mt-1 text-sm font-normal text-gray-400 leading-5">
                {sender} -&gt; {receiver}
              </span>
            </section>
            <section className="flex flex-col items-end">
              <span
                className="text-base font-medium text-gray-700 leading-6"
                style={{ color }}
              >
                {directionText} {assetsDescription}
              </span>
              <span className="mt-1 text-sm font-normal text-gray-400 leading-5">
                {time}
              </span>
            </section>
          </li>
        );
      })}
    </ul>
  );
};

export default ActivityList;
