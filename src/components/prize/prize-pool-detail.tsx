import React, { Fragment } from "react";
import { FtPrize, PrizePool, Record } from "~domain/superise/models";
import Card from "~components/Card";
import {useWhitelistTokens} from "~state/token";
import {TokenMetadata} from "~domain/near/ft/models";
import {InputValueDisplay} from "~components/forms/PrizeSelector";
import {PrimaryButton} from "~components/button/Button";
import {useEndtimer} from "./prize-pool-card";
import {convertAmountToNumber} from "~domain/near/ft/methods";
import {join_pool} from "~domain/superise/methods";
import dayjs from 'dayjs';
import isSameOrAfter from'dayjs/plugin/isSameOrAfter';
import fakedata from '~fakedata/pool';

dayjs.extend(isSameOrAfter)

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
  let prize = convertAmountToNumber(pool.ticket_price);
  const priceText = prize > 0 ? `${prize} ${pool.ticket_token_id}` : 'FREE'

  // TODO: use the `finished` property from the pool instead of comparing the end_time
  const finished = dayjs().isSameOrAfter(dayjs(pool.end_time));

  // TODO: get records from the pool 
  const records = fakedata.records || [];

  console.log({ pool, finished });

  return (
    <>
      <Card>
        <img src={pool.cover} className="w-4/12 m-auto"/>
        <div className="mt-8">
          <h2 className="text-base font-bold leading-6">{pool.name}</h2>
          <span className="text-sm font-normal leading-5">{pool.describe}</span>
        </div>
        <div className="mt-6">
          <h2 className="text-base font-bold leading-6">What's inside</h2>
          <div className="mt-1 grid grid-col-1 gap-1">
            {pool.ft_prizes.map((item,idx) => {
              const { token_id, amount } = item;
            const token:TokenMetadata = tokens.find(item => item.id === token_id);
            if (!token) return null;
            let tmp = String(convertAmountToNumber(amount))
            return <InputValueDisplay value={{token,amount: tmp }} key={idx} />
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
        <div className="flex justify-between mt-6">
          <div className="flex flex-col">
            <span className="text-base font-semibold text-gray-400 leading-6">Ticket price</span>
            <span className="mt-2 text-base font-semibold text-gray-900 leading-6">{priceText}</span>
          </div>  
          <div className="flex flex-col items-end">
            <span className="text-base font-semibold text-gray-400 leading-6">{timeLabel}</span>
            <span className={`text-lg leading-6 font-semibold text-gray-900 mt-2 ${fontClass}`}>{timeText}</span>
          </div>  
        </div>
        { !finished && (
          <div className="mt-6">
            <PrimaryButton onClick={()=>join_pool(pool.id)} isFull>Join</PrimaryButton>
          </div>)
        }
      </Card>
      {
        finished && (
          <>
            <div className="mt-8" />
            <Card title="Result">
              <div className="mt-4 grid grid-cols-1 gap-2">
                {records.map((item:Record, idx:number) => {
                  const ftAmount = convertAmountToNumber(item.ft_prize.amount)
                  return <div key={idx}>{item.receiver} - {ftAmount} {item.ft_prize.token_id}</div>
                })}
              </div>
            </Card>
          </>
        )
      }
    </>
  )
}
