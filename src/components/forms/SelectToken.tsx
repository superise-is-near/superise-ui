import React, { useEffect, useState } from 'react';
import MicroModal from 'react-micro-modal';
import { TokenMetadata } from '~domain/near/ft/models';
import { ArrowDownWhite, ArrowDownBlack } from '~components/icons';
import { isMobile } from '~utils/device';
import { FormattedMessage, useIntl } from 'react-intl';
import { TokenBalancesView } from '~domain/near/ft/models';
import { IoCloseOutline } from 'react-icons/io5';
import CommenBasses from '~components/tokens/CommenBasses';
import Table from '~components/table/Table';
// import { useTokensData } from '~state/token';
import { toRealSymbol } from '~utils/token';
import { FaSearch } from 'react-icons/fa';
import fakedata from '~fakedata/account'

function sort(a: any, b: any) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b);
  } else if (typeof a === 'number' && typeof b === 'number') {
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
  balances?: TokenBalancesView;
}) {
  const [visible, setVisible] = useState(false);
  const tokensData = fakedata.tokens;
  const [currentSort, setSort] = useState<string>('down');
  const [sortBy, setSortBy] = useState<string>('near');

  if (!onSelect) {
    return (
      <button className="focus:outline-none p-1" type="button">
        {selected}
      </button>
    );
  }
  const dialogWidth = isMobile() ? '75%' : '35%';
  const dialogMinwidth = isMobile() ? 340 : 490;
  const dialogHidth = isMobile() ? '95%' : '57%';
  const intl = useIntl();
  // TODO: use useTokensData to fetch realtime data
  const [listData, setListData] = useState<TokenMetadata[]>(fakedata.tokenListData);

  const sortTypes: { [key: string]: any } = {
    up: {
      class: 'sort-up',
      fn: (a: any, b: any) => sort(a[sortBy], b[sortBy]),
    },
    down: {
      class: 'sort-down',
      fn: (a: any, b: any) => sort(b[sortBy], a[sortBy]),
    },
    default: {
      class: 'sort',
      fn: (a: any, b: any) => a,
    },
  };

  const onSortChange = (params: string) => {
    if (params === sortBy) {
      let nextSort;
      if (currentSort === 'down') nextSort = 'up';
      else if (currentSort === 'up') nextSort = 'down';
      setSort(nextSort);
    } else {
      setSort('up');
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
          className={`focus:outline-none  ${standalone ? 'w-full' : 'w-2/5'}`}
          onClick={() => setVisible(true)}
        >
          {selected || (
            <section
              className={`flex justify-between items-center px-3 py-3 ${
                standalone
                  ? 'bg-inputDarkBg text-white relative flex overflow-hidden rounded-lg align-center my-2 border border-greenLight'
                  : ''
              }`}
            >
              <p
                className="text-lg font-semibold leading-none"
                style={{ lineHeight: 'unset' }}
              >
                {placeholder ?? 'Select'}
              </p>
              <div className="pl-2">
                <ArrowDownWhite />
              </div>
            </section>
          )}
        </div>
      )}
      overrides={{
        Overlay: {
          style: {
            zIndex: 110,
            backgroundColor: 'rgba(0, 19, 32, 0.65)',
          },
        },
        Dialog: {
          style: {
            width: dialogWidth,
            minWidth: dialogMinwidth,
            borderRadius: '0.75rem',
            border: '1px solid rgba(0, 198, 162, 0.5)',
            padding: '1.5rem 0',
            background: '#1D2932',
            height: dialogHidth,
            zIndex: 100,
          },
        },
      }}
    >
      {() => (
        <section className="text-white">
          <div className="flex items-center justify-between pb-5 pr-8 px-6 relative">
            <h2 className="text-sm font-bold text-center">
              <FormattedMessage
                id="select_token"
                defaultMessage="Select Token"
              />
            </h2>
            <IoCloseOutline
              onClick={() => handleClose()}
              className="absolute text-gray-400 text-2xl right-6 cursor-pointer"
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
