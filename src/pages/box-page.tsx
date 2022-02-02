import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PrizePoolDetail from "~components/prize/prize-pool-detail";
import { useTwitterPool } from "~state/prize";
import PageLoading from "~components/page-loading";
import { useWhitelistTokens } from "~state/token";
import Footer from "~components/layout/footer";
import TwitterCard from "~components/twitter-card";
import Spacer from "~components/spacer";
import ProgressBar from "~components/progress-bar";
import { PrimaryButton } from "~components/button/Button";
import RequirementsModal from "~components/modal/requirements-modal";
import RequestSigninModal from "~components/modal/request-signin-modal";
import { wallet } from "~domain/near/global";
import {
  join_twitter_pool,
  TwitterRequirment,
  RequirmentType,
  TwitterFollowRequirment,
  TwitterLikeRequirment,
  TwitterRetweetRequirment,
} from "~domain/superise/twitter_giveaway/methods";
import dayjs from "dayjs";
import { useEndtimer } from "~components/prize/prize-pool-card";

const Card = ({ children }: { children?: any }) => {
  return (
    <div className="px-4 py-[22px] py-4 bg-white border border-gray-300 rounded-2xl">
      {children}
    </div>
  );
};

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showRequrementsModal, setShowRequirementsModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const tokens = useWhitelistTokens();
  const twitterPool = useTwitterPool(Number(id));
  const loginAccountName = wallet.getAccountId();
  const [joining, setJoining] = useState<boolean>(false);

  // TODO: should not use .finish once we have a better status management for a twitterbox
  const { timeLabel, countdownText, dateText, timeText, fontClass } =
    useEndtimer((twitterPool || {}).end_time, (twitterPool || {}).finish);

  // console.log({ timeLabel, countdownText, dateText, timeText })

  if (!twitterPool || !tokens) return <PageLoading />;

  console.log({ timeLabel, countdownText, dateText, timeText });

  // console.log({ prizePool })

  async function joinPool() {
    setJoining(true);
    try {
      const res = await join_twitter_pool(twitterPool.prize_pool.id);
      console.log({ res });
    } catch (e) {
      // TODO: read the join_pool return value to determine if it's successfully joined
      console.log({ e });
      setJoining(false);
      return;
    }
    setJoining(false);
    // TODO: find a good way to refresh the data
    window.location.reload();
  }
  async function handleClickJoin() {
    const isSignedIn = wallet.isSignedIn();
    if (!isSignedIn) {
      setShowLoginModal(true);
      return;
    }

    if (twitterPool.white_list.indexOf(loginAccountName) === -1) {
      setShowRequirementsModal(true);
      return;
    }

    joinPool();
  }

  console.log({ twitterPool });

  const requirements: TwitterRequirment[] = JSON.parse(
    twitterPool.requirements
  );

  return (
    <div className="m-auto lg:max-w-2xl">
      {showLoginModal && (
        <RequestSigninModal
          isOpen={showLoginModal}
          onRequestClose={() => setShowLoginModal(false)}
          text="Please connect to NEAR wallet before joining this box."
        />
      )}
      <RequirementsModal
        pool_id={twitterPool.prize_pool.id}
        accountName="liaa.near"
        isOpen={showRequrementsModal}
        requirementsValue={JSON.parse(twitterPool.requirements)}
        onRequestClose={() => {
          setShowRequirementsModal: false;
        }}
        onSuccess={() => {
          // call join pool
        }}
      />
      <h2 className="text-5xl font-bold leading-none">
        Giveaway #{twitterPool.prize_pool.id}
      </h2>
      <Spacer h="48px" />
      <Card>
        <div style={{ maxHeight: "359px" }}>
          <TwitterCard url="https://twitter.com/0xSabri/status/1487348695859445761" />
        </div>
      </Card>
      <Spacer h="16px" />
      <Card>
        <div className="grid grid-cols-2">
          <div className="text-base font-normal leading-6">
            <div className="text-gray-900">{timeLabel}</div>
            <div className="text-gray-900 opacity-50">
              {dateText || countdownText} {timeText}
            </div>
          </div>
          <div className="text-base font-normal leading-6">
            <div className="text-gray-900">Created at</div>
            <div className="text-gray-900 opacity-50">
              {dayjs(twitterPool.create_time).format("MMM D, YYYY hh:mma")}
            </div>
          </div>
        </div>

        <Spacer h="24px" />
        <ProgressBar percentage={10} />
        <Spacer h="16px" />
        <PrimaryButton isFull onClick={handleClickJoin}>
          Join Giveaway
        </PrimaryButton>
      </Card>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">Prizes</h3>
      </div>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">REQUIREMENTS</h3>
      </div>
      <Spacer h={"12px"} />
      <Card>
        <div className="-mx-4 -my-4">
          {requirements.map((item) => {
            const { requirment_type } = item;
            let content;
            switch (requirment_type) {
              case RequirmentType.TwitterFollow: {
                const typedRequirement = item as TwitterFollowRequirment;
                content = (
                  <div className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">
                    Follow{" "}
                    <a
                      className="underline"
                      href={`https://twitter.com/${typedRequirement.screen_name}`}
                      target="_blank"
                    >
                      @{typedRequirement.screen_name}
                    </a>
                  </div>
                );
                break;
              }
              case RequirmentType.TwitterLike: {
                const typedRequirement = item as TwitterLikeRequirment;
                content = (
                  <div className="px-4 py-4 text-base font-normal text-gray-600 leading-6">
                    Like{" "}
                    <a
                      className="underline"
                      href={typedRequirement.tweet_link}
                      target="_blank"
                    >
                      this tweet
                    </a>
                  </div>
                );
                break;
              }

              case RequirmentType.TwitterRetweet: {
                const typedRequirement = item as TwitterRetweetRequirment;
                content = (
                  <div className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">
                    Retweet{" "}
                    <a
                      className="underline"
                      href={typedRequirement.tweet_link}
                      target="_blank"
                    >
                      this tweet
                    </a>
                  </div>
                );
                break;
              }
            }
            return content;
          })}
        </div>
      </Card>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">PARTICIPANTS</h3>
        <span className="text-sm font-bold text-gray-500">
          {twitterPool.prize_pool.join_accounts.length} TOTAL
        </span>
      </div>
      <Spacer h={"12px"} />
      <Card>
        <ul className="-mx-4 -my-4">
          {twitterPool.prize_pool.join_accounts.slice(0, 3).map((item) => {
            return (
              <li className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-b-0">
                {item}
              </li>
            );
          })}
          {twitterPool.prize_pool.join_accounts.length > 3 && (
            <li className="px-4 py-4 text-base font-normal text-gray-400 text-gray-600 leading-6">
              +{twitterPool.prize_pool.join_accounts.length - 3} more
            </li>
          )}
        </ul>
      </Card>

      <Spacer h="32px" />
      <div className="flex flex-col items-center">
        <span className="font-semibold text-gray-700">CREATED BY</span>
        <span className="text-gray-500">liaa.near</span>
      </div>

      {/*<PrizePoolDetail pool={prizePool} tokens={tokens} /> */}
      <Footer />
    </div>
  );
};

export default BoxPage;
