import React, { useEffect, useRef, useState, useMemo } from "react";
import dayjs from "dayjs";
import { PrizePoolDisplay } from "~domain/superise/models";
import { fancyTimeFormat } from "~utils/time";
import { convertAmountToNumber } from "~domain/near/ft/methods";
import { TokenMetadata } from "~domain/near/ft/models";
import {
  TwitterPoolDisplay,
  TwitterPoolStatus,
} from "~domain/superise/twitter_giveaway/models";

export const useEndtimer = (
  end_time: number,
  status: TwitterPoolStatus
): {
  timeLabel: string;
  countdownText: string;
  dateText: string;
  timeText: string;
  fontClass: string;
} => {
  const timerRef: { current: NodeJS.Timeout | null } = useRef();
  const [timeLabel, setTimeLabel] = useState<string>("Opening in");
  const [dateText, setDataText] = useState<string>("");
  const [timeText, setTimeText] = useState<string>("");
  const [countdownText, setCountdownText] = useState<string>("");
  const [fontClass, setFontClass] = useState<string>("");

  const calculateTime = () => {
    if (status !== "FINISHED" && dayjs(end_time) <= dayjs()) {
      setCountdownText("");
      setDataText("Wait for opening");
      setTimeLabel("Time's up");
      setFontClass("");
    } else if (status !== "FINISHED") {
      const difference = dayjs(end_time).diff(dayjs());
      setCountdownText(fancyTimeFormat(difference / 1000));
      setDataText("");
      setTimeText("");
      setTimeLabel("Opening in");
      setFontClass("font-mono");
    } else {
      setCountdownText("");
      setDataText(dayjs(end_time).format("MMM D, YYYY"));
      setTimeText(dayjs(end_time).format("h:mma "));
      setTimeLabel("Opened at");
      setFontClass("");
    }
  };

  useEffect(() => {
    calculateTime();
    timerRef.current = setInterval(calculateTime, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, [end_time, status]);

  return { timeLabel, countdownText, dateText, timeText, fontClass };
};

export default function PrizePoolCard(props: {
  pool: TwitterPoolDisplay;
  tokens: TokenMetadata[];
  onClick?: (event: React.MouseEvent) => void;
}) {
  const timerRef: { current: NodeJS.Timeout | null } = useRef();
  const { pool, onClick, tokens } = props;
  const { end_time, finish } = pool;
  const { timeLabel, countdownText, dateText, timeText, fontClass } =
    useEndtimer(end_time, finish);

  // let price = convertAmountToNumber("0");
  // const priceText = useMemo(() => {
  //   if (price <= 0) return "Free";
  //   let text = pool.ticket_price.token_id;
  //   const foundToken = tokens.find(
  //     (item) => item.id === pool.ticket_price.token_id
  //   );
  //   if (foundToken) text = foundToken.symbol;
  //   return `${price} ${text}`;
  // }, [tokens]);

  return (
    <div
      className="p-8 overflow-hidden bg-white border border-transparent rounded cursor-pointer transform duration-200 hover:scale-105"
      onClick={onClick}
    >
      <img src={pool.cover} className="w-4/12 m-auto" />
      <div className="mt-8">
        <h2 className="text-base font-bold leading-6">{pool.name}</h2>
        <span className="text-sm font-normal leading-5">{pool.describe}</span>
      </div>
      <div className="flex justify-between p-4 mt-8 -mx-8 -mb-8 bg-gray-900">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-400 leading-6">
            Ticket price
          </span>
          {/*<span className="mt-2 text-base font-semibold text-white leading-6">*/}
          {/*  {priceText}*/}
          {/*</span>*/}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-base font-semibold text-gray-400 leading-6">
            {timeLabel}
          </span>
          {countdownText && (
            <span
              className={`text-right align text-lg leading-6 font-semibold text-white mt-2 ${fontClass}`}
            >
              {countdownText}
            </span>
          )}
          {dateText && (
            <span
              className={`text-right align text-lg leading-6 font-semibold text-white mt-2 ${fontClass}`}
            >
              {dateText}
            </span>
          )}
          {timeText && (
            <span
              className={`text-right align text-lg leading-6 font-semibold text-white mt-2 ${fontClass}`}
            >
              {timeText}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
