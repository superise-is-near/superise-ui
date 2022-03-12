import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTwitterPool } from "~state/prize";
import PageLoading from "~components/page-loading";
import { useWhitelistTokens } from "~state/token";
import TwitterCard from "~components/twitter-card";
import Spacer from "~components/spacer";
import ProgressBar from "~components/progress-bar";
import { PrimaryButton } from "~components/button/Button";
import RequirementsModal from "~components/modal/requirements-modal";
import RequestSigninModal from "~components/modal/request-signin-modal";
import { wallet } from "~domain/near/global";
import { nft_token } from "~domain/near/nft/methods";
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
import { AssetsDisplay } from "~pages/create-box/give-away-prizes/select-prizes-card";
import { TwitterPool } from "~domain/superise/twitter_giveaway/models";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";
import { convertAmountToNumber, toReadableNumber } from "~utils/numbers";
import Section from "~components/section";
import boxIcon from "~assets/box-blue.svg";
import Confetti from "react-confetti";
import { NftAsset, Record } from "~domain/superise/models";
import { getTokenSymbol } from "~domain/near/ft/methods";
import { ParasNft } from "~domain/paras/models";
import NFTResult from "./nft-result-content";

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showRequrementsModal, setShowRequirementsModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const tokens = useWhitelistTokens();
  const twitterPool: TwitterPool = useTwitterPool(Number(id));
  const loginAccountName = wallet.getAccountId();
  const [joining, setJoining] = useState<boolean>(false);
  const { timeLabel, countdownText, dateText, timeText } = useEndtimer(
    (twitterPool || {}).end_time,
    (twitterPool || {}).status
  );

  const [showMoreParticipants, setShowMoreParticipants] = useState<boolean>(
    false
  );

  const [parasNfts, setParasNfts] = useState<ParasNft[]>([]);
  const [fts, setFts] = useState<TokenMetadataWithAmount[]>([]);

  useEffect(() => {
    if (!twitterPool || !tokens) return;
    Promise.all(
      twitterPool.prize_pool.nft_prizes.map(async (item) =>
        ParasNft.newWithImgUrl(
          await nft_token(item.nft.contract_id, item.nft.nft_id),
          item.nft.contract_id
        )
      )
    ).then((value) => setParasNfts(value));
    Promise.all(
      twitterPool.prize_pool.ft_prizes.map((item) => {
        const foundToken =
          tokens.find((token) => token.id === item.ft.contract_id) ?? tokens[0];
        return {
          id: item.prize_id,
          // amount: toReadableNumber(Number(item.ft.balance)),
          amount: toReadableNumber(foundToken.decimals, item.ft.balance),
          ...foundToken,
        } as any as TokenMetadataWithAmount;
      })
    ).then((value) => setFts(value));
  }, [twitterPool, tokens]);

  const location = useLocation();
  useEffect(() => {
    if (location.search.indexOf("show_requirements_modal=1") !== -1) {
      setShowRequirementsModal(true);
    }
    if (location.search.indexOf("show-success-info=1") !== -1) {
      sessionStorage.removeItem("like");
      sessionStorage.removeItem("retweet");
      sessionStorage.removeItem("follow");
      sessionStorage.removeItem("endDate");
      sessionStorage.removeItem("endHour");
      sessionStorage.removeItem("tweet");
    }
  }, [location.search]);

  const JoinButton = useMemo(() => {
    if (!twitterPool || twitterPool.status !== "ONGOING") return;
    const isAlreadyJoined =
      twitterPool.prize_pool.join_accounts.indexOf(loginAccountName) !== -1;
    if (isAlreadyJoined) {
      return (
        <div className="flex items-center mt-4">
          <img src={boxIcon} />
          <div className="ml-4 text-base text-gray-600">
            You are taking part
          </div>
        </div>
      );
    }
    return (
      <>
        <Spacer h="16px" />
        <PrimaryButton
          isFull
          onClick={handleClickJoin}
          loading={joining}
          size="large"
        >
          Join Giveaway
        </PrimaryButton>
      </>
    );
  }, [twitterPool?.prize_pool?.join_accounts, joining]);

  if (!twitterPool || !tokens) return <PageLoading />;

  async function joinPool() {
    setJoining(true);
    try {
      const res = await join_twitter_pool(twitterPool.prize_pool.id);
    } catch (e) {
      // TODO: read the join_pool return value to determine if it's successfully joined
      setJoining(false);
      return;
    }
    setJoining(false);
    setShowRequirementsModal(false);
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

  const requirements: TwitterRequirment[] = twitterPool.requirements
    ? JSON.parse(twitterPool.requirements)
    : [];

  const progress = (() => {
    return (
      Math.min(
        (dayjs().unix() * 1000 - twitterPool.create_time) /
          (twitterPool.end_time - twitterPool.create_time),
        1
      ) * 100
    );
  })();

  return (
    <div className="px-5 m-auto lg:max-w-2xl">
      {showLoginModal && (
        <RequestSigninModal
          isOpen={showLoginModal}
          onRequestClose={() => setShowLoginModal(false)}
          text="Please connect to NEAR wallet before joining this box."
        />
      )}
      <RequirementsModal
        pool_id={twitterPool.prize_pool.id}
        accountName={loginAccountName}
        isOpen={showRequrementsModal}
        requirementsValue={JSON.parse(twitterPool.requirements)}
        onRequestClose={() => {
          setShowRequirementsModal(false);
        }}
        onSuccess={joinPool}
      />
      <h2 className="text-5xl font-bold leading-none">
        Giveaway #{twitterPool.prize_pool.id}
      </h2>
      <Spacer h="48px" />
      <Section>
        <div style={{ maxHeight: "359px" }}>
          <TwitterCard url={twitterPool.twitter_link} />
        </div>
      </Section>
      <Spacer h="16px" />
      <Section>
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
        <ProgressBar percentage={progress} />
        {JoinButton}
      </Section>

      {twitterPool.status === "FINISHED" && (
        <>
          <Confetti recycle={false} numberOfPieces={300} />
          <Spacer h="32px" />
          <h3 className="text-base font-semibold leading-6">WINNERS</h3>
          <Spacer h="16px" />
          <Section>
            <div className="-mx-4 -my-4">
              {twitterPool.records.map((item: Record, idx: number) => {
                const joinedText =
                  item.receiver === loginAccountName ? (
                    <span className="inline-block px-2 ml-1 text-sm text-white bg-gray-900 rounded">
                      You
                    </span>
                  ) : (
                    ""
                  );
                let prizeContent;
                if (item.ft_prize) {
                  const ftAmount = convertAmountToNumber(
                    item.ft_prize.ft.balance
                  );
                  prizeContent = (
                    <div className="text-sm font-semibold text-gray-900">
                      {ftAmount}{" "}
                      {getTokenSymbol(tokens, item.ft_prize.ft.contract_id)}
                    </div>
                  );
                }
                if (item.nft_prize) {
                  prizeContent = <NFTResult nftAsset={item.nft_prize.nft} />;
                }

                return (
                  <div
                    className="flex items-center justify-between p-4 border-b border-gray-300 last:border-0"
                    key={idx}
                  >
                    <div className="text-gray-900">
                      {item.receiver} {joinedText}
                    </div>
                    <div>{prizeContent}</div>
                  </div>
                );
              })}
            </div>
          </Section>
        </>
      )}

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">PRIZES</h3>
      </div>
      <Spacer h="16px" />
      <AssetsDisplay nfts={parasNfts} cryptos={fts} readonly />

      <Spacer h="16px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">REQUIREMENTS</h3>
      </div>
      <Spacer h={"16px"} />
      <Section>
        <div className="-mx-4 -my-4">
          {requirements.map((item, index) => {
            const { requirment_type } = item;
            let content;
            switch (requirment_type) {
              case RequirmentType.TwitterFollow: {
                const typedRequirement = item as TwitterFollowRequirment;
                content = (
                  <div>
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
                  <div>
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
                  <div>
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
            return (
              <div
                key={index}
                className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-0"
              >
                {content}
              </div>
            );
          })}
        </div>
      </Section>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">PARTICIPANTS</h3>
        <span className="text-sm font-bold text-gray-500">
          {twitterPool.prize_pool.join_accounts.length} TOTAL
        </span>
      </div>
      <Spacer h={"16px"} />
      <Section>
        {twitterPool.prize_pool.join_accounts.length === 0 ? (
          <div className="flex flex-col items-center ">
            {twitterPool.status === "ONGOING" ? (
              <span className="text-base font-normal text-gray-500 leading-6">
                Be the first to join!
              </span>
            ) : (
              <span className="text-base font-normal text-gray-500 leading-6">
                No participants.
              </span>
            )}
          </div>
        ) : (
          <ul className="-mx-4 -my-4">
            {twitterPool.prize_pool.join_accounts
              .slice(0, !showMoreParticipants ? 3 : Infinity)
              .map((item, index) => {
                return (
                  <li
                    key={index}
                    className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-b-0"
                  >
                    {item}
                  </li>
                );
              })}
            {!showMoreParticipants && twitterPool.prize_pool.join_accounts.length > 3 && (
              <li
                onClick={() => {
                  setShowMoreParticipants(true);
                }}
                className="px-4 py-4 text-base font-normal text-gray-400 text-gray-600 cursor-pointer leading-6">
                +{twitterPool.prize_pool.join_accounts.length - 3} more
              </li>
            )}
          </ul>
        )}
      </Section>

      <Spacer h="32px" />
      <div className="flex flex-col items-center">
        <span className="font-semibold text-gray-700">CREATED BY</span>
        <span className="text-gray-500">
          {twitterPool.prize_pool.creator_id}
        </span>
      </div>
    </div>
  );
};

export default BoxPage;
