import React, { Fragment } from 'react';
import { PrizePool } from '~domains/superise/model/PrizePool'

function Gallery(props: {
  pools: PrizePool[]
}) {
  return (
    <div className="mt-8">
      {props.pools.length === 0 ? (
        <div className="text-center text-gray-600 text-xs font-semibold pt-2 pb-2">
          No boxes
        </div>
      ) : null}
      {props.pools.map(pool => {
        return (
          <a href={`/box/${pool.id}`} className="hover:bg-gray-100 p-4 rounded inline-block">
          <div className="flex flex-col items-center inline-block">
            <div
              className="w-24 h-24 bg-black bg-center bg-cover"
              key={pool.id}
              style={{ backgroundImage: `url(${pool.cover})` }}
            />
            <span className="text-gray-700 mt-2 text-sm">
              {pool.name}
            </span>
          </div>
          </a>
            )
      })}
    </div>
  )
}

export default Gallery;
