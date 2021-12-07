import React from "react";
import { PrizePool } from "~domain/superise/models";
import Card from "~components/Card";
import {useWhitelistTokens} from "~state/token";
import {TokenMetadata} from "~domain/near/ft/models";
import {InputValueDisplay} from "~components/forms/PrizeSelector";
import {PrimaryButton} from "~components/button/Button";
import {useEndtimer} from "./prize-pool-card";

export default function PrizepoolDetail(props: {
  pool: PrizePool,
}) {
  const { pool } = props;
  const ftPrizes = Object.keys(pool.ft_prizes)
    .reduce((acc, key) => {
      return [...acc, pool.ft_prizes[key]]
    }, []);

  const tokens = useWhitelistTokens();

  const { timeLabel, timeText, fontClass } = useEndtimer(pool.end_time);
  const priceText = pool.ticket_price > 0 ? `${pool.ticket_price} NEAR` : 'FREE'

  return (
    <Card>
      <img src={pool.cover} className="w-4/12 m-auto"/>
      <div className="mt-8">
        <h2 className="text-base font-bold leading-6">{pool.name}</h2>
        <span className="text-sm leading-5 font-normal">{pool.describe}</span>
      </div>
      <div className="mt-6">
        <h2 className="text-base font-bold leading-6">What's inside</h2>
        <div className="mt-1 grid grid-col-1 gap-1">
        {ftPrizes.map((item,idx) => {
          const { id, amount } = item;
          const token:TokenMetadata = tokens.find(item => item.id === id);
          if (!token) return null;
          return <InputValueDisplay value={{token, amount}} key={idx} />
        })}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-base font-bold leading-6">Participants</h2>
        <div className="mt-1 grid grid-col-1 gap-1">
          {pool.join_accounts.map((name,idx) => {
            return <span key={idx} className="text-gray-800">{name}</span>
          })}
        </div>
      </div>
      <div className="mt-6  flex justify-between">
        <div className="flex flex-col">
          <span className="text-base leading-6 font-semibold text-gray-400">Ticket price</span>
          <span className="text-base leading-6 font-semibold text-gray-900 mt-2">{priceText}</span>
        </div>  
        <div className="flex flex-col items-end">
          <span className="text-base leading-6 font-semibold text-gray-400">{timeLabel}</span>
          <span className={`text-lg leading-6 font-semibold text-gray-900 mt-2 ${fontClass}`}>{timeText}</span>
        </div>  
      </div>
      <div className="mt-6">
        <PrimaryButton isFull>Join</PrimaryButton>
      </div>
    </Card>)
}
