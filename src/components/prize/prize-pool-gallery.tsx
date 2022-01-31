import React, { Fragment } from "react";
import { PrizePool, PrizePoolDisplay } from "~domain/superise/models";
import { TwitterPoolDisplay } from "~domain/superise/twitter_giveaway/models";

function Gallery(props: { pools: TwitterPoolDisplay[] }) {
  return (
    <div className="mt-8">
      {props.pools.length === 0 ? (
        <div className="pt-2 pb-2 text-xs font-semibold text-center text-gray-600">
          No boxes
        </div>
      ) : null}
      {props.pools.map((pool) => {
        return (
          <a
            href={`/#/box/${pool.id}`}
            className="inline-block p-4 rounded hover:bg-gray-100"
            key={pool.id}
          >
            <div className="flex flex-col items-center inline-block">
              <div
                className="w-24 h-24 bg-black bg-center bg-cover"
                key={pool.id}
                style={{ backgroundImage: `url(${pool.cover})` }}
              />
              <span className="mt-2 text-sm text-gray-700">{pool.name}</span>
            </div>
          </a>
        );
      })}
    </div>
  );
}

Gallery.defaultProps = {
  pools: [],
};

export default Gallery;
