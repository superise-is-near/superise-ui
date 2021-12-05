import React from "react";
import { PrizePool } from "~domain/superise/models";
import Card from "~components/Card";
import {useWhitelistTokens} from "~state/token";
import {TokenMetadata} from "~domain/near/ft/models";
import {InputValueDisplay} from "~components/forms/PrizeSelector";
import {PrimaryButton} from "~components/button/Button";

export default function PrizepoolDetail(props: {
  pool: PrizePool,
}) {
  const { pool } = props;
  const ftPrizes = Object.keys(pool.ft_prizes)
    .reduce((acc, key) => {
      return [...acc, pool.ft_prizes[key]]
    }, []);
  const tokens = useWhitelistTokens();
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
        <PrimaryButton isFull>Join</PrimaryButton>
      </div>
    </Card>)
}
