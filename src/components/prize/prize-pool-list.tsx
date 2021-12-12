import React, { Fragment } from "react";
import {FaArrowDown} from "react-icons/fa";
import {TokenMetadata} from "~domain/near/ft/models";
import { PrizePoolDisplay } from "~domain/superise/models";
import PrizePoolCard from './prize-pool-card';

function PrizePoolList(props: { pools: PrizePoolDisplay[], onClickPool: (id: number) => void, tokens: TokenMetadata[]}, ) {
  const { pools, onClickPool, tokens } = props;
  const unFinishedPools = pools.filter(item => !item.finish);
  const finishedPools = pools.filter(item => item.finish);
  return (
    <>
      <div className="grid grid-col-1 gap-8">
        {unFinishedPools.map(pool => <PrizePoolCard tokens={tokens} pool={pool} key={pool.id} onClick={() => onClickPool(pool.id)}/>)}
      </div>

      {finishedPools.length > 0 && (
        <div>
          <h1 className="my-8 mb-4 text-lg font-bold text-gray-900">Opened boxes <FaArrowDown style={{ display: 'inline' }}/></h1>
          <div className="grid grid-col-1 gap-8">
            {finishedPools.map(pool => <PrizePoolCard tokens={tokens} pool={pool} key={pool.id} onClick={() => onClickPool(pool.id)}/>)}
          </div>
        </div>
      )}
    </>
  )
}

export default PrizePoolList;
