import dayjs from "dayjs";
import React from "react";
import FireFill from "~assets/fire-fill.svg";
import { usePrizePoolDisplayLists } from "~state/prize";
import GiveawayCard from "./giveaway-card";
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

function HottestGiveaway() {
  const prizes = usePrizePoolDisplayLists();
  if (!prizes) return null;

  return (
    <section
      id="hottest-giveaway"
      className="w-full flex flex-col items-center homepage-container"
    >
      <div className="w-13 h-13 mt-8">
        <img
          className="w-13 h-13"
          width="52px"
          height="52px"
          src={FireFill}
          alt="lighting"
        />
      </div>
      <h2 className="mt-4 text-4xl font-bold text-center">Hottest Giveaways</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-12 home-page-giveaway-cards"
        style={{ marginTop: "70px" }}
      >
        {prizes
          .filter((prize) => prize.status === "ONGOING")
          .map(({ cover, name, id, prize_type, requirements, end_time }) => (
            <GiveawayCard
              image={cover}
              title={name}
              prizeType={
                {
                  NFT: "NFT",
                  Crypto: "Crypto",
                  NFT_Crypto: "NFT and crypto",
                  No_Prize: "No prize",
                }[prize_type]
              }
              requirements={((requirements) => {
                if (!requirements) return "No requirements";
                let follow, retweet, like;
                try {
                  JSON.parse(requirements).forEach(
                    (requirement: {
                      requirement_type:
                        | "twitter_follow"
                        | "twitter_retweet"
                        | "twitter_like";
                    }) => {
                      if (requirement?.requirement_type === "twitter_follow")
                        follow = true;
                      if (requirement?.requirement_type === "twitter_retweet")
                        retweet = true;
                      if (requirement?.requirement_type === "twitter_like")
                        like = true;
                    }
                  );
                  if (follow && retweet && like)
                    return "Follow, like and retweet";
                  if (follow && like) return "Follow and like";
                  if (retweet && like) return "Like and retweet";
                  if (follow && retweet) return "Follow and retweet";
                  if (follow) return "Follow";
                  if (like) return "Like";
                  if (retweet) return "Retweet";
                  return "No requirements";
                } catch (e) {
                  return "No requirements";
                }
              })(requirements)}
              endTime={dayjs(end_time).format("Do MMM. HH:mm")}
              detailLink={`/box/${id}`}
            />
          ))}
      </div>
    </section>
  );
}

export default HottestGiveaway;
