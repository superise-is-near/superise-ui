import React from 'react'
import { useParams } from 'react-router-dom';
import CenterWrap from '~components/layout/center-wrap'
import PrizePoolDetail from '~components/prize/prize-pool-detail';
import {usePrizePool} from "~state/prize";
import PageLoading from "~components/page-loading"

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const prizePool  = usePrizePool(Number(id));
  if (!prizePool) return <PageLoading />
  return <CenterWrap>
    <PrizePoolDetail pool={prizePool} />
    </CenterWrap>
}

export default BoxPage;
