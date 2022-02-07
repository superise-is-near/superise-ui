import React, { useState } from "react";
import sortupIcon from "~assets/sort-up.svg";
import { TokenMetadata, FtAssets } from "~domain/near/ft/models";
import { toReadableNumber } from "~utils/numbers";
import Token from "~components/tokens/Token";
import { FormattedMessage } from "react-intl";

interface TokenListProps {
  tokens: TokenMetadata[];
  sortBy: string;
  currentSort: string;
  onSortChange?: (sortBy: string) => void;
  onClick?: (token: TokenMetadata) => void;
  balances?: FtAssets;
}

const SortButton = (props: { className: string; onClick: () => void }) => {
  return (
    <div {...props}>
      <img src={sortupIcon} width={14} height={14} />
    </div>
  );
};

export default function Table({
  tokens,
  sortBy,
  currentSort,
  onSortChange,
  onClick,
  balances,
}: TokenListProps) {
  return (
    tokens.length > 0 && (
      <table className="w-full mt-10 text-sm text-left text-gray-400 table-auto">
        <thead
          className="sticky z-30 -top-6"
          style={{ background: "rgb(29, 41, 50)" }}
        >
          <tr className="font-normal border-b border-gray-500 border-opacity-30">
            <th
              className={`font-normal w-2/5 pb-2 pl-6  ${
                sortBy === "asset" ? "text-greenLight" : ""
              }`}
            >
              <FormattedMessage id="asset_label" defaultMessage="Asset" />
              <SortButton
                onClick={() => onSortChange("asset")}
                className={`inline-block cursor-pointer ${
                  sortBy === "asset" && currentSort === "down"
                    ? "transform rotate-180"
                    : ""
                }`}
              />
            </th>
            <th
              className={`font-normal pb-2 pr-3 w-1/5 ${
                sortBy === "total" ? "text-greenLight" : ""
              }`}
            >
              <FormattedMessage id="total_label" defaultMessage="Total" />
              <SortButton
                onClick={() => onSortChange("total")}
                className={`inline-block cursor-pointer ${
                  sortBy === "total" && currentSort === "down"
                    ? "transform rotate-180"
                    : ""
                }`}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.filter(Boolean).map((token) => (
            <Token
              key={token.id}
              token={token}
              onClick={onClick}
              // render={render}
              sortBy={sortBy}
              totalAmount={
                balances
                  ? toReadableNumber(token.decimals, balances[token.id])
                  : ""
              }
            />
          ))}
        </tbody>
      </table>
    )
  );
}
