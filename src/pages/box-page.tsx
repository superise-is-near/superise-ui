import React from 'react'
import { useParams } from 'react-router-dom';
import CenterWrap from '~components/layout/center-wrap'
import {PrizePool} from '~domain/superise/models';
import PrizePoolDetail from '~components/prize/prize-pool-detail';
import {usePrizePool} from "~state/prize";

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const prizePool  = usePrizePool(Number(id));
  return <CenterWrap>
    <PrizePoolDetail pool={prizePool} />
    </CenterWrap>
}

export default BoxPage;
