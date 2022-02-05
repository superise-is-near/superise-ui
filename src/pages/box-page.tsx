import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
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
import { ParasNft } from "~domain/paras/models";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";
import { toReadableNumber } from "~utils/numbers";
import Section from "~components/section";

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const [showRequrementsModal, setShowRequirementsModal] =
    useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const tokens = useWhitelistTokens();
  const twitterPool: TwitterPool = useTwitterPool(Number(id));
  const loginAccountName = wallet.getAccountId();
  const [joining, setJoining] = useState<boolean>(false);
  //
  const { timeLabel, countdownText, dateText, timeText, fontClass } =
    useEndtimer((twitterPool || {}).end_time, (twitterPool || {}).status);

  const [parasNfts, setParasNfts] = useState<ParasNft[]>([]);
  const [fts, setFts] = useState<TokenMetadataWithAmount[]>([]);

  console.log({ twitterPool });
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
  }, [location.search]);

  const JoinButton = useMemo(() => {
    if (!twitterPool) return;
    const isAlreadyJoined =
      twitterPool.prize_pool.join_accounts.indexOf(loginAccountName) !== -1;
    if (isAlreadyJoined) {
      return (
        <div className="mt-6">
          <PrimaryButton disabled size="large" isFull>
            You have joined
          </PrimaryButton>
        </div>
      );
    }
    return (
      <PrimaryButton
        isFull
        onClick={handleClickJoin}
        loading={joining}
        size="large"
      >
        Join Giveaway
      </PrimaryButton>
    );
  }, [twitterPool?.prize_pool?.join_accounts, joining]);

  if (!twitterPool || !tokens) return <PageLoading />;

  console.log({ twitterPool });

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

  console.log({ twitterPool });

  const requirements: TwitterRequirment[] = JSON.parse(
    twitterPool.requirements
  );

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
          <TwitterCard url="https://twitter.com/0xSabri/status/1487348695859445761" />
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
        <Spacer h="16px" />
        {JoinButton}
      </Section>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">Prizes</h3>
      </div>
      <AssetsDisplay nfts={parasNfts} cryptos={fts} readonly />
      {console.log(twitterPool.prize_pool)}

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">REQUIREMENTS</h3>
      </div>
      <Spacer h={"12px"} />
      <Section>
        <div className="-mx-4 -my-4">
          {requirements.map((item) => {
            const { requirment_type } = item;
            let content;
            switch (requirment_type) {
              case RequirmentType.TwitterFollow: {
                const typedRequirement = item as TwitterFollowRequirment;
                content = (
                  <div className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-0">
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
                  <div className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-0">
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
                  <div className="px-4 py-4 text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-0">
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
      </Section>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">PARTICIPANTS</h3>
        <span className="text-sm font-bold text-gray-500">
          {twitterPool.prize_pool.join_accounts.length} TOTAL
        </span>
      </div>
      <Spacer h={"12px"} />
      <Section>
        {twitterPool.prize_pool.join_accounts.length === 0 ? (
          <div className="flex flex-col items-center ">
            <span className="text-base font-normal text-gray-500 leading-6">
              Be the first to join!
            </span>
            <Spacer h="16px" />
            {JoinButton}
          </div>
        ) : (
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
        )}
      </Section>

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
