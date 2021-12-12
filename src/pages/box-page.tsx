import React from 'react'
import { useParams } from 'react-router-dom';
import CenterWrap from '~components/layout/center-wrap'
import PrizePoolDetail from '~components/prize/prize-pool-detail';
import {usePrizePool} from "~state/prize";
import PageLoading from "~components/page-loading"
import {useWhitelistTokens} from '~state/token';

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const tokens = useWhitelistTokens();
  const prizePool  = usePrizePool(Number(id));
  if (!prizePool || !tokens) return <PageLoading />
  return <CenterWrap>
    <PrizePoolDetail pool={prizePool} tokens={tokens} />
    </CenterWrap>
}

export default BoxPage;
