import React from 'react';
import { PrimaryButton } from '~/components/button/Button'
import CenterWrap from '~/components/layout/center-wrap'
import { ArrowRight } from 'react-feather';
import PrizePoolList from '~components/prize/prize-pool-list';
import {useHistory} from 'react-router-dom';
import {usePrizePoolDisplayLists} from "~state/prize";
import PageLoading from '~components/page-loading';

export default function Index() {
  let history = useHistory();

  const handleClickPool = (id: number) => {
    history.push(`/box/${id}`);
  }

  let prizePoolDisplays = usePrizePoolDisplayLists();

  if (!prizePoolDisplays) return <PageLoading />

  return (
    <CenterWrap>
      <PrizePoolList pools={prizePoolDisplays} onClickPool={handleClickPool}/>
      <div className="mt-8"/>
      <PrimaryButton suffixIcon={<ArrowRight />} onClick={() => {
        window.location.assign('/box/create');
      }}>Create a Box</PrimaryButton>
    </CenterWrap>
  )
}
