import React, { useState } from "react";
import { PrimaryButton } from "~/components/button/Button";
import { useHistory } from "react-router-dom";
import { usePrizePoolDisplayLists } from "~state/prize";
import PageLoading from "~components/page-loading";
import { useWhitelistTokens } from "~state/token";
import PrizePoolCard from "~components/prize/prize-pool-card";
import {
  FaArrowRight,
  FaTrain,
  FaTwitter,
  FaGithub,
  FaFire,
} from "react-icons/fa";
import { GiDramaMasks } from "react-icons/gi";
import { cardTheme, ColorCard, ColorCardTitle } from "~/components/ColorCard";
import Footer from "~components/layout/footer";

export default function Index() {
  let history = useHistory();

  const handleClickPool = (id: number) => {
    history.push(`/box/${id}`);
  };

  let prizePoolDisplays = usePrizePoolDisplayLists();
  const tokens = useWhitelistTokens();

  const [twitterLink, setTwitterLink] = useState("");
  if (!prizePoolDisplays || !tokens) return <PageLoading />;

  const featuredPool = prizePoolDisplays?.[0];
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ColorCard>
            <div className="grid grid-cols-1 gap-5">
              <ColorCardTitle>
                <span className="text-4xl">
                  Social media giveaway made easy and transparent.
                </span>
              </ColorCardTitle>
              <div className="lg:w-2/3">
                <PrizePoolCard
                  tokens={tokens}
                  pool={featuredPool}
                  onClick={() => handleClickPool(featuredPool.id)}
                />
              </div>
            </div>
          </ColorCard>
        </div>
        <div className="lg:col-span-5">
          <ColorCard theme="pink">
            <div className="grid grid-cols-1 gap-5">
              <FaTwitter size="36px" color={cardTheme.pink.fg} />
              <ColorCardTitle theme="pink">
                Paste the Twitter giveaway link to get start.
              </ColorCardTitle>
              <textarea
                onChange={(e) => setTwitterLink(e.target.value)}
                rows={5}
                className="border-0 rounded-sm"
                placeholder="Put twitter link here"
              />
              <PrimaryButton
                suffixIcon={<FaArrowRight />}
                onClick={() => {
                  history.push(`/box/create?twitter=${twitterLink}`);
                }}
              >
                CREATE GIVEAWAY BOX
              </PrimaryButton>
            </div>
          </ColorCard>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:auto-rows-fr">
        <div className="lg:col-span-7 xl:col-span-4">
          <ColorCard theme="purple">
            <div className="grid grid-cols-1 gap-5">
              <FaTrain size="36px" color={cardTheme.purple.fg} />
              <ColorCardTitle theme="purple">
                Waste no time managing giveways, it’s all automatical.
              </ColorCardTitle>
            </div>
          </ColorCard>
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <ColorCard theme="yellow">
            <div className="pb-20 grid grid-cols-1 gap-5">
              <GiDramaMasks size="36px" color={cardTheme.yellow.fg} />
              <ColorCardTitle theme="yellow">
                No fake giveaway, ever.
              </ColorCardTitle>
            </div>
          </ColorCard>
        </div>
        <div className="lg:col-span-12 xl:col-span-4">
          <ColorCard theme="green">
            <div className="grid grid-cols-1 gap-5">
              <FaGithub size="36px" color={cardTheme.green.fg} />
              <ColorCardTitle theme="green">
                <span className="block lg:w-7/12 xl:w-full">
                  Surprise is opensourced and proudly powered by the NEAR
                  protocol.
                </span>
              </ColorCardTitle>
            </div>
          </ColorCard>
        </div>
      </div>
      <div className="mt-8">
        <ColorCard theme="lightGreen">
          <div className="grid grid-cols-1 gap-5">
            <FaFire size="36px" color={cardTheme.lightGreen.fg} />
            <ColorCardTitle theme="lightGreen">Hot giveaways</ColorCardTitle>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              {prizePoolDisplays.slice(0, 5).map((pool, idx) => {
                return (
                  <div key={idx} className="md:col-span-6 lg:col-span-4">
                    <PrizePoolCard
                      key={idx}
                      tokens={tokens}
                      pool={pool}
                      onClick={() => handleClickPool(pool.id)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </ColorCard>
      </div>
      <Footer />
    </div>
  );
}
