import React, { useEffect, useState } from "react";
import MicroModal from "react-micro-modal";
import { TokenMetadata } from "~domain/near/ft/models";
import { ArrowDownIndigo } from "~components/icons";
import { isMobile } from "~utils/device";
import { FormattedMessage, useIntl } from "react-intl";
import { FtAssets } from "~domain/near/ft/models";
import closeIcon from "~assets/close.svg";
import CommenBasses from "~components/tokens/CommenBasses";
import Table from "~components/table/Table";
// import { useTokensData } from '~state/token';
import { toRealSymbol } from "~utils/token";
// import fakedata from '~fakedata/account'
import { useTokensData } from "~state/token";

function sort(a: any, b: any) {
  if (typeof a === "string" && typeof b === "string") {
    return a.localeCompare(b);
  } else if (typeof a === "number" && typeof b === "number") {
    return a - b;
  } else {
    return a;
  }
}

export default function SelectToken({
  tokens,
  selected,
  render,
  onSelect,
  standalone,
  placeholder,
  balances,
}: {
  tokens: TokenMetadata[];
  selected: string | React.ReactElement;
  standalone?: boolean;
  placeholder?: string;
  render?: (token: TokenMetadata) => string;
  onSelect?: (token: TokenMetadata) => void;
  onSearch?: (value: string) => void;
  balances?: FtAssets;
}) {
  const [visible, setVisible] = useState(false);
  const [listData, setListData] = useState<TokenMetadata[]>([]);
  const [currentSort, setSort] = useState<string>("down");
  const [sortBy, setSortBy] = useState<string>("near");

  if (!onSelect) {
    return (
      <button className="p-1 focus:outline-none" type="button">
        {selected}
      </button>
    );
  }
  const dialogWidth = isMobile() ? "75%" : "35%";
  const dialogMinwidth = isMobile() ? 340 : 490;
  const dialogHidth = isMobile() ? "95%" : "57%";
  const intl = useIntl();
  // TODO: use useTokensData to fetch realtime data
  // first time , tokens = [near]
  // second time, tokens = [...]
  const {
    tokensData,
    loading: loadingTokensData,
    trigger,
  } = useTokensData(tokens, balances);
  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    if (!loadingTokensData) {
      const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
      setListData(sortedData);
    }
  }, [loadingTokensData, tokensData]);

  useEffect(() => {
    if (!!tokensData) {
      const sortedData = [...tokensData].sort(sortTypes[currentSort].fn);
      setListData(sortedData);
    }
  }, [currentSort, sortBy]);

  const sortTypes: { [key: string]: any } = {
    up: {
      class: "sort-up",
      fn: (a: any, b: any) => sort(a[sortBy], b[sortBy]),
    },
    down: {
      class: "sort-down",
      fn: (a: any, b: any) => sort(b[sortBy], a[sortBy]),
    },
    default: {
      class: "sort",
      fn: (a: any, b: any) => a,
    },
  };

  const onSortChange = (params: string) => {
    if (params === sortBy) {
      let nextSort;
      if (currentSort === "down") nextSort = "up";
      else if (currentSort === "up") nextSort = "down";
      setSort(nextSort);
    } else {
      setSort("up");
    }
    setSortBy(params);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <MicroModal
      open={visible}
      handleClose={handleClose}
      trigger={() => (
        <div
          className={`focus:outline-none`}
          onClick={() => {
            setVisible(true);
          }}
        >
          {selected || (
            <section
              className={`flex justify-between items-center ${
                standalone
                  ? "bg-inputDarkBg text-white relative flex overflow-hidden rounded-lg align-center my-2 border border-greenLight"
                  : ""
              }`}
            >
              <p
                className="text-lg font-semibold leading-none"
                style={{ lineHeight: "unset" }}
              >
                {placeholder ?? "Select"}
              </p>
              <div className="pl-2">
                <ArrowDownIndigo />
              </div>
            </section>
          )}
        </div>
      )}
      overrides={{
        Overlay: {
          style: {
            zIndex: 110,
            backgroundColor: "rgba(0, 19, 32, 0.65)",
          },
        },
        Dialog: {
          style: {
            width: dialogWidth,
            minWidth: dialogMinwidth,
            borderRadius: "0.75rem",
            border: "1px solid rgba(0, 198, 162, 0.5)",
            padding: "1.5rem 0",
            background: "#1D2932",
            height: dialogHidth,
            zIndex: 100,
          },
        },
      }}
    >
      {() => (
        <section className="text-white">
          <div className="relative flex items-center justify-between px-6 pb-5 pr-8">
            <h2 className="text-sm font-bold text-center">
              <FormattedMessage
                id="select_token"
                defaultMessage="Select Token"
              />
            </h2>
            <img
              src={closeIcon}
              onClick={() => handleClose()}
              className="absolute text-2xl text-gray-400 cursor-pointer right-6"
              role="button"
            />
          </div>
          <Table
            sortBy={sortBy}
            currentSort={currentSort}
            onSortChange={onSortChange}
            tokens={listData}
            onClick={(token) => {
              onSelect && onSelect(token);
              handleClose();
            }}
            balances={balances}
          />
        </section>
      )}
    </MicroModal>
  );
}
