import React, { Fragment, useState, useMemo, useEffect } from "react";
import { PrizePool, Record } from "~domain/superise/models";
import Card from "~components/Card";
import { TokenMetadata } from "~domain/near/ft/models";
import { PrimaryButton } from "~components/button/Button";
import { useEndtimer } from "./prize-pool-card";
import { convertAmountToNumber } from "~domain/near/ft/methods";
import { join_pool } from "~domain/superise/methods";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import RequestSigninModal from "~components/modal/request-signin-modal";
import RequirementsModal from "~components/modal/requirements-modal";
import { wallet } from "~domain/near/global";
import Confetti from "react-confetti";
import { TwitterPool } from "~domain/superise/twitter_giveaway/models";
import TwitterCard from "~/components/TweetCard";
import { InputValueDisplay } from "~components/forms/PrizeSelector";
import { ParasNft } from "~domain/paras/models";
import { nft_token } from "~domain/near/nft/methods";

dayjs.extend(isSameOrAfter);
import { useLocation } from "react-router-dom";
import { join_twitter_pool } from "~domain/superise/twitter_giveaway/methods";

const getTokenSymbol = (tokens: TokenMetadata[] = [], id: string = "") => {
  let symbolText = id;
  const foundToken = tokens.find((item) => item.id === id);
  if (foundToken) symbolText = foundToken.symbol;
  return symbolText;
};

export default function PrizepoolDetail(props: {
  pool: TwitterPool;
  tokens: TokenMetadata[];
}) {
  const { pool, tokens } = props;
  console.log({ pool });
  const { timeLabel, countdownText, dateText, timeText, fontClass } =
    useEndtimer(pool.end_time, pool.finish);
  // let prize = convertAmountToNumber(pool.ticket_price);
  // const priceText = useMemo(() => {
  //   if (prize <= 0) return "Free";
  //   let text = pool.ticket_token_id;
  //   const foundToken = tokens.find((item) => item.id === pool.ticket_token_id);
  //   if (foundToken) text = foundToken.symbol;
  //   return `${prize} ${text}`;
  // }, [tokens]);
  const location = useLocation();

  useEffect(() => {
    if (location.search.indexOf("show_requirements_modal=1") !== -1) {
      setShowRequirementsModal(true);
    }
  }, [location.search]);

  const { join_accounts, creator_id } = pool.prize_pool;
  const loginAccountName = wallet.getAccountId();
  const isAlreadyJoined = join_accounts.indexOf(loginAccountName) !== -1;

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRequrementsModal, setShowRequirementsModal] =
    useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);

  const [parasNfts, setParasNfts] = useState<ParasNft[]>([]);

  useEffect(() => {
    Promise.all(
      pool.prize_pool.nft_prizes.map(async (item, idx) =>
        ParasNft.newWithImgUrl(
          await nft_token(item.nft.contract_id, item.nft.nft_id),
          item.nft.contract_id
        )
      )
    ).then((value) => setParasNfts(value));
  }, []);
  console.log({ pool });

  const joinPool = async () => {
    setJoining(true);
    try {
      const res = await join_twitter_pool(pool.prize_pool.id);
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
  };
  return (
    <>
      <Card>
        {showLoginModal && (
          <RequestSigninModal
            isOpen={showLoginModal}
            onRequestClose={() => setShowLoginModal(false)}
            text="Please connect to NEAR wallet before joining this box."
          />
        )}
        <div>
          <h2 className="text-base font-bold leading-6">Twitter URL</h2>
          <span className="text-sm font-normal leading-5">
            <TwitterCard url={pool.twitter_link} />
          </span>
        </div>
        <RequirementsModal
          isOpen={showRequrementsModal}
          onRequestClose={() => setShowRequirementsModal(false)}
          handleClickConnectTwitter={() => {
            window.location = `/twitter/authenticate?near_account=${loginAccountName}&pool_id=${pool.prize_pool.id}`;
          }}
          accountName={loginAccountName}
          onSuccess={joinPool}
        />
        <div className="mt-6">
          <h2 className="text-base font-bold leading-6">Prize list</h2>
          <div
            className="mt-1 grid grid-col-1 gap-2"
            style={{ maxWidth: "550px" }}
          >
            {pool.prize_pool.ft_prizes.map((item, idx) => {
              const { contract_id, balance } = item.ft;
              const token: TokenMetadata = tokens.find(
                (item) => item.id === contract_id
              );
              if (!token) return null;
              // let tmp = String(convertAmountToNumber(balance));
              let tmp = "todo";
              return (
                <div
                  className="flex items-center justify-between p-2 border border-gray-100 rounded-sm shadow-sm"
                  key={idx}
                >
                  <img src={token.icon} className="w-10 h-10" />
                  <span className="text-sm text-gray-700">
                    {tmp} {token.symbol}
                  </span>
                </div>
              );
            })}
            {parasNfts.map((parasNft) => (
              <InputValueDisplay
                key={`${parasNft.nft.contract_id} ${parasNft.nft.token.token_id}`}
                value={{
                  id: parasNft.nft.token.token_id,
                  amount: "",
                  token: {
                    icon: parasNft.img_url,
                    symbol: parasNft.nft.token.metadata.title,
                  } as TokenMetadata,
                }}
              />
            ))}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-base font-bold leading-6">Participants</h2>
          <div className="mt-1 grid grid-col-1 gap-1">
            {pool.prize_pool.join_accounts.map((name, idx) => {
              const joinedText =
                name === loginAccountName ? (
                  <span className="inline-block px-2 ml-1 text-sm text-white bg-gray-900 rounded">
                    You
                  </span>
                ) : (
                  ""
                );
              return (
                <span key={idx} className="text-gray-800">
                  {name} {joinedText}
                </span>
              );
            })}
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-base font-bold leading-6">Created by</h2>
          <div className="mt-1 grid grid-col-1 gap-1">
            <span className="text-gray-800">{creator_id}</span>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          {/*<div className="flex flex-col">*/}
          {/*  <span className="text-base font-semibold text-gray-400 leading-6">*/}
          {/*    Ticket price*/}
          {/*  </span>*/}
          {/*  <span className="mt-2 text-base font-semibold text-gray-900 leading-6">*/}
          {/*    {priceText}*/}
          {/*  </span>*/}
          {/*</div>*/}
          <div className="flex flex-col items-end">
            <span className="text-base font-semibold text-gray-400 leading-6">
              {timeLabel}
            </span>
            {countdownText && (
              <span
                className={`text-lg leading-6 font-semibold text-gray-900 mt-2 ${fontClass}`}
              >
                {countdownText}
              </span>
            )}
            {dateText && (
              <span
                className={`text-lg leading-6 font-semibold text-gray-900 mt-2 ${fontClass}`}
              >
                {dateText}
              </span>
            )}
            {timeText && (
              <span
                className={`text-lg leading-6 font-semibold text-gray-900 mt-2 ${fontClass}`}
              >
                {timeText}
              </span>
            )}
          </div>
        </div>
        {!pool.finish && !isAlreadyJoined && (
          <div className="mt-6">
            <PrimaryButton
              onClick={async () => {
                const isSignedIn = wallet.isSignedIn();
                if (!isSignedIn) {
                  setShowLoginModal(true);
                  return;
                }

                if (pool.white_list.indexOf(loginAccountName) === -1) {
                  setShowRequirementsModal(true);
                  return;
                }

                joinPool();
              }}
              isFull
              loading={joining}
            >
              Join
            </PrimaryButton>
          </div>
        )}
        {!pool.finish && isAlreadyJoined && (
          <div className="mt-6">
            <PrimaryButton
              disabled
              onClick={async () => {
                const isSignedIn = wallet.isSignedIn();
                if (!isSignedIn) {
                  setShowLoginModal(true);
                  return;
                }
                setJoining(true);

                try {
                  await join_pool(pool.prize_pool.id);
                } catch (e) {
                  // TODO: read the join_pool return value to determine if it's successfully joined
                  setJoining(false);
                  return;
                }
                setJoining(false);
                // TODO: find a good way to refresh the data
                location.reload();
              }}
              isFull
              loading={joining}
            >
              You have joined
            </PrimaryButton>
          </div>
        )}
      </Card>
      {/* {pool.finish && (
        <>
          <Confetti recycle={false} numberOfPieces={300} />
          <div className="mt-8" />
          <Card title="Result">
            <div className="mt-4 grid grid-cols-1 gap-2">
              {pool.records.map((item: Record, idx: number) => {
                const ftAmount = convertAmountToNumber(
                  item.ft_prize.ft.balance
                );
                const joinedText =
                  item.receiver === loginAccountName ? (
                    <span className="inline-block px-2 ml-1 text-sm text-white bg-gray-900 rounded">
                      You
                    </span>
                  ) : (
                    ""
                  );
                return (
                  <div
                    className="flex justify-between p-2 rounded-sm shadow-sm shadow-cyan-500/50 bg-gray-50"
                    key={idx}
                  >
                    <div className="text-gray-900">
                      {item.receiver} {joinedText}
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {ftAmount}{" "}
                      {getTokenSymbol(tokens, item.ft_prize.ft.contract_id)}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </>
      )} */}
    </>
  );
}
