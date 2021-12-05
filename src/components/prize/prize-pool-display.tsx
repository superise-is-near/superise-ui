import React, { Fragment, useEffect, useRef, useState } from "react";
import dayjs from 'dayjs';
import { PrizePoolDisplay } from "~domain/superise/models";

import { fancyTimeFormat } from '~utils/time';

export default function PrizePoolItem(props: {
  pool: PrizePoolDisplay,
  onClick?: (event: React.MouseEvent) => void;
}) {
  const timerRef: { current: NodeJS.Timeout | null } = useRef();
  const { pool, onClick } = props;
  const { end_time } = pool;

  let timeLabel = 'Opening in';
  let fontClass = 'font-mono';
  const [timeText, setTimeText] = useState<String>('');

  const calculateTime = () => {
    if (dayjs() <= dayjs(end_time)) {
      const difference = dayjs(end_time).diff(dayjs());
      setTimeText(fancyTimeFormat(difference/1000));
    } else {
      setTimeText(dayjs(end_time).format('MMM D, YYYY'))
    }
  }

  if (dayjs() >= dayjs(end_time)) {
    timeLabel = 'Opened at';
    fontClass = '';
  }

  useEffect(() => {
    calculateTime();
    timerRef.current = setInterval(calculateTime, 1000);
    return () => {
      clearInterval(timerRef.current);
    }
  }, [])
  
  const priceText = pool.ticket_price > 0 ? `${pool.ticket_price} NEAR` : 'FREE'

  return <div className="transform duration-200 hover:scale-105 rounded border-transparent overflow-hidden border bg-white p-8 cursor-pointer" onClick={onClick}>
    <img src={pool.cover} className="w-4/12 m-auto"/>
    <div className="mt-8">
      <h2 className="text-base font-bold leading-6">{pool.name}</h2>
      <span className="text-sm leading-5 font-normal">{pool.describe}</span>
    </div>
    <div className="bg-gray-900 -mx-8 -mb-8 mt-8 p-4 flex justify-between">
      <div className="flex flex-col">
        <span className="text-base leading-6 font-semibold text-gray-400">Ticket price</span>
        <span className="text-base leading-6 font-semibold text-white mt-2">{priceText}</span>
      </div>  
      <div className="flex flex-col items-end">
        <span className="text-base leading-6 font-semibold text-gray-400">{timeLabel}</span>
        <span className={`text-lg leading-6 font-semibold text-white mt-2 ${fontClass}`}>{timeText}</span>
      </div>  
    </div>
    </div>
}
