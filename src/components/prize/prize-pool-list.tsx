import React from "react";
import { PrizePoolDisplay } from "~domain/superise/models";
import PrizePoolCard from './prize-pool-card';

function PrizePoolList(props: { pools: PrizePoolDisplay[], onClickPool: (id: number) => void }) {
  const { pools, onClickPool } = props;
  return <div className="grid grid-col-1 gap-8">
    {pools.map(pool => <PrizePoolCard pool={pool} key={pool.id} onClick={() => onClickPool(pool.id)}/>)}
    </div>
}

export default PrizePoolList;
