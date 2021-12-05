import React from 'react'
import { useParams } from 'react-router-dom';
import CenterWrap from '~components/layout/center-wrap'
import {PrizePool} from '~domain/superise/models';
import PrizePoolDetail from '~components/prize/prize-pool-detail';
import fakedata_pool from '~fakedata/pool';

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const { pools } = fakedata_pool;
  const findPool = (item: PrizePool) => item.id === Number(id);
  const prizePool = pools.find(findPool);
  return <CenterWrap>
    <PrizePoolDetail pool={prizePool} />
    </CenterWrap>
}

export default BoxPage;
