import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TwitterPool } from "~domain/superise/twitter_giveaway/models";
import arrowRightIcon from "~assets/arrow-right.svg";
import { wallet } from "~services/near";
import { view_account_prizepool_history } from "~domain/superise/methods";
import { AccountPrizePoolHistory, Record } from "~domain/superise/models";

const BoxHistoryList = () => {
  const [accountPrizePoolHistory, setAccountPrizePoolHistory] = useState<
    AccountPrizePoolHistory[]
  >([]);
  useEffect(() => {
    view_account_prizepool_history(wallet.getAccountId()).then(
      setAccountPrizePoolHistory
    );
  }, []);
  return (
    <div className="grid grid-col-1 gap-4">
      {accountPrizePoolHistory.map((history) => {
        const { id } = history.pool;
        const { status: boxStatus } = history.pool;
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
          <Link
            to={
              boxStatus === "PENDING"
                ? `/box/${id}/edit?progress=1`
                : `/box/${id}`
            }
            key={id}
          >
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
