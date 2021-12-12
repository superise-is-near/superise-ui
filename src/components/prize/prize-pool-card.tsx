import React, { Fragment, useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import { PrizePoolDisplay } from "~domain/superise/models";
import { fancyTimeFormat } from '~utils/time';
import { getWhitelistedTokens } from "~domain/ref/methods";
import { getAmount } from "~domain/near/global";
import { ftoReadableNumber } from "~utils/numbers";
import {convertAmountToNumber} from "~domain/near/ft/methods";

export const useEndtimer = (
  end_time: number
): { timeLabel: string; countdownText: string; dateText: string, timeText: string, fontClass: string } => {
  const timerRef: { current: NodeJS.Timeout | null } = useRef();
  const [timeLabel, setTimeLabel] = useState<string>('Opening in');
  const [dateText, setDataText] = useState<string>('');
  const [timeText, setTimeText] = useState<string>('');
  const [countdownText, setCountdownText] = useState<string>('');
  const [fontClass, setFontClass] = useState<string>('');

  const calculateTime = () => {
    if (dayjs() <= dayjs(end_time)) {
      const difference = dayjs(end_time).diff(dayjs());
      setCountdownText(fancyTimeFormat(difference/1000));
      setDataText('');
      setTimeText('');
      setTimeLabel('Opening in');
      setFontClass('font-mono');
    } else {
      setCountdownText('');
      setDataText(dayjs(end_time).format('MMM D, YYYY'));
      setTimeText(dayjs(end_time).format('h:mma '));
      setTimeLabel('Opened at')
      setFontClass('');
    }
  }

  useEffect(() => {
    calculateTime();
    timerRef.current = setInterval(calculateTime, 1000);
    return () => {
      clearInterval(timerRef.current);
    }
  }, [])

  return { timeLabel, countdownText, dateText, timeText, fontClass};
};

export default function PrizePoolCard(props: {
  pool: PrizePoolDisplay,
  onClick?: (event: React.MouseEvent) => void;
}) {
  const timerRef: { current: NodeJS.Timeout | null } = useRef();
  const { pool, onClick } = props;
  const { end_time } = pool;
  const { timeLabel, countdownText, dateText, timeText, fontClass } = useEndtimer(end_time);

  let priceNumber = convertAmountToNumber(pool.ticket_price.amount);
  const priceText = priceNumber > 0 ? `${priceNumber} ${pool.ticket_price.token_id}` : 'FREE'

  return <div className="p-8 overflow-hidden bg-white border border-transparent rounded cursor-pointer transform duration-200 hover:scale-105" onClick={onClick}>
    <img src={pool.cover} className="w-4/12 m-auto"/>
    <div className="mt-8">
      <h2 className="text-base font-bold leading-6">{pool.name}</h2>
      <span className="text-sm font-normal leading-5">{pool.describe}</span>
    </div>
    <div className="flex justify-between p-4 mt-8 -mx-8 -mb-8 bg-gray-900">
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-400 leading-6">Ticket price</span>
        <span className="mt-2 text-base font-semibold text-white leading-6">{priceText}</span>
      </div>  
      <div className="flex flex-col items-end">
        <span className="text-base font-semibold text-gray-400 leading-6">{timeLabel}</span>
        {countdownText && <span className={`text-right align text-lg leading-6 font-semibold text-white mt-2 ${fontClass}`}>{countdownText}</span>}
        {dateText && <span className={`text-right align text-lg leading-6 font-semibold text-white mt-2 ${fontClass}`}>{dateText}</span>}
        {timeText && <span className={`text-right align text-lg leading-6 font-semibold text-white mt-2 ${fontClass}`}>{timeText}</span>}
      </div>  
    </div>
    </div>
}
