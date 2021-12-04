import React from 'react';
import { PrimaryButton } from '~/components/button/Button'
import CenterWrap from '~/components/layout/center-wrap'
import { ArrowRight } from 'react-feather';
import fakedata_pools from '~fakedata/pool';
import PrizePoolList from '~components/prize/prize-pool-list';

export default function Index() {
  const { pools: fakepools } = fakedata_pools;
  return (
    <CenterWrap>
      <PrizePoolList pools={fakepools} />
      <div className="mt-8"/>
      <PrimaryButton suffixIcon={<ArrowRight />} onClick={() => {
        window.location.assign('/box/create');
      }}>Create a Box</PrimaryButton>
    </CenterWrap>
  )
}
