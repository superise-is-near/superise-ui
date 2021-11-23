import React from 'react'
import { useParams } from 'react-router-dom';
import CenterWrap from '~components/layout/center-wrap'

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  return <CenterWrap>Box page: {id}</CenterWrap>
}

export default BoxPage;
