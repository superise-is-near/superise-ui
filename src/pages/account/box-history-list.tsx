import React, { FC } from "react";
import { Link } from "react-router-dom";
import { TwitterPool } from "~domain/superise/twitter_giveaway/models";
import arrowRightIcon from "~assets/arrow-right.svg";

export const fakePools = [
  {
    name: "Twitter Pool",
    describe: "Twitter Pool",
    cover: "https://baidu.com",
    prize_pool: { id: 1 },
    status: "PENDING",
    end_time: 16,
    create_time: 14,
    updated_time: 15,
    white_list: ["demo.near"],
    requirements: "",
    twitter_link: "https://twitter.com",
    records: [],
  },
  {
    name: "Twitter Pool",
    describe: "Twitter Pool",
    cover: "https://baidu.com",
    prize_pool: { id: 2 },
    status: "ONGOING",
    end_time: 16,
    create_time: 14,
    updated_time: 15,
    white_list: ["demo.near"],
    requirements: "",
    twitter_link: "https://twitter.com",
    records: [],
  },
  {
    name: "Twitter Pool",
    describe: "Twitter Pool",
    cover: "https://baidu.com",
    prize_pool: { id: 3 },
    status: "FINISHED",
    end_time: 16,
    create_time: 14,
    updated_time: 15,
    white_list: ["demo.near"],
    requirements: "",
    twitter_link: "https://twitter.com",
    records: [],
  },
];

interface IBoxHistoryList {
  pools?: TwitterPool[];
}

const BoxHistoryList: FC<IBoxHistoryList> = () => {
  return (
    <div className="grid grid-col-1 gap-4">
      {fakePools.map((twitterPool) => {
        const { id } = twitterPool.prize_pool;
        const { status: boxStatus } = twitterPool;
        const { boxStatusText, boxStatusColor } = (() => {
          let boxStatusText;
          let boxStatusColor;
          switch (boxStatus) {
            default:
            case "PENDING":
              boxStatusText = "Draft";
              boxStatusColor = "#F97316";
              break;
            case "FINISHED":
              boxStatusText = "Completed";
              boxStatusColor = "#22C55E";
              break;
            case "ONGOING":
              boxStatusText = "In Progress";
              boxStatusColor = "#3B82F6";
              break;
          }
          return { boxStatusText, boxStatusColor };
        })();

        return (
          <Link to={`/box/${id}`} key={id}>
            <div key={id} className="flex items-center">
              <div className="w-12 h-12 bg-gray-300 rounded-lg"></div>
              <section className="flex flex-col ml-4">
                <span className="text-base font-normal text-gray-600 leading-6">
                  Giveaway #{id}
                </span>
                <span
                  className="text-base font-normal leading-6"
                  style={{ color: boxStatusColor }}
                >
                  {boxStatusText}
                </span>
              </section>
              <div className="flex-auto" />
              <img src={arrowRightIcon} />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BoxHistoryList;
