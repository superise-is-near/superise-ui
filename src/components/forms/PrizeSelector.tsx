import React from 'react';
import {FtPrize, NftPrize} from '~domain/superise/models';
import { FaPlusSquare } from 'react-icons/fa';
import { Flex } from '~components/layout/flex'
import {TextButton} from '~components/button/Button';

function PrizeSelector({
  value = [], 
}: {
  value?: (FtPrize|NftPrize)[];
}) {
  if (value.length === 0) return (
    <TextButton icon={<FaPlusSquare />}>Add the first prize</TextButton>
  )
  return <div>Prize Selector</div>;
}

export default PrizeSelector;
