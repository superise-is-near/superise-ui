import React from 'react';
import { PrimaryButton } from '~/components/button/Button'
import CenterWrap from '~/components/layout/center-wrap'
import { ArrowRight } from 'react-feather';
import fakedata_pools from '~fakedata/pool';
import PrizePoolList from '~components/prize/prize-pool-list';
import {useHistory} from 'react-router-dom';

export default function Index() {
  const { display_pools: fakepools } = fakedata_pools;
  let history = useHistory();

  const handleClickPool = (id: number) => {
    history.push(`/box/${id}`);
  }

  return (
    <CenterWrap>
      <PrizePoolList pools={fakepools} onClickPool={handleClickPool}/>
      <div className="mt-8"/>
      <PrimaryButton suffixIcon={<ArrowRight />} onClick={() => {
        window.location.assign('/box/create');
      }}>Create a Box</PrimaryButton>
    </CenterWrap>
  )
}
