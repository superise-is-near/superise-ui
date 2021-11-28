import React from 'react';
import { PrimaryButton } from '~/components/button/Button'
import CenterWrap from '~/components/layout/center-wrap'
import { ArrowRight } from 'react-feather';

export default function Index() {
  return (
    <CenterWrap>
      <PrimaryButton suffixIcon={<ArrowRight />} onClick={() => {
        window.location.assign('/box/create');
      }}>Create a Box</PrimaryButton>
    </CenterWrap>
  )
}
