import React, { useState } from 'react';
import {FtPrize, NftPrize} from '~domain/superise/models';
import { FaPlusSquare } from 'react-icons/fa';
import {TextButton} from '~components/button/Button';
import {PrimaryButton} from '~components/button/Button';
import Modal from '~components/modal/modal';
import SuperiseFtInput from '~components/forms/superise-ft-input';
import { nearMetadata, TokenBalancesView, TokenMetadata } from '~domain/near/ft/models';
import { SuperiseFtInputValue } from './superise-ft-input'
import Icon from '~components/tokens/Icon';
import {nanoid} from 'nanoid';


export function InputValueDisplay({ value, onClick }: { value: SuperiseFtInputValue; onClick?: any;} ){
  const { token, amount } = value;

  let className = "flex items-center justify-between p-1 pr-4 border-2 rounded transition";
  if (onClick) className += ' cursor-pointer hover:border-gray-700'

  return (<div className={className} onClick={onClick}>
    <img src={token.icon} className="w-12 h-12" />
    <span className="text-sm text-gray-700">{amount} {token.symbol}</span>
    </div>)
}


function PrizeSelector({
  input,
  balances,
  tokens,
}: {
  input: {
    value?: (SuperiseFtInputValue)[];
    onChange?: Function;
  };
  balances: TokenBalancesView;
  tokens: TokenMetadata[];
}) {

  const EMPTY_INPUT_VALUE = { amount: '', token: nearMetadata };

  const [ isAddModalOpen, setIsAddModalOpen ] = useState(false);
  // const [ underEditingItem, setUnderEditingItem ] = useState<SuperiseFtInputValue>();
  const [ftInputValue, setFtInputValue] = useState<SuperiseFtInputValue>(EMPTY_INPUT_VALUE);

  return <>
    {input.value.length === 0 && (
    <TextButton
      icon={<FaPlusSquare />}
      onClick={(e) =>{ e.preventDefault(); setIsAddModalOpen(true)}}
    >Add the first prize</TextButton>)}
    {
      input.value.length > 0 && (
        <div className="grid grid-cols-1 gap-2">
          {input.value.map((item:SuperiseFtInputValue) => {
            return <InputValueDisplay value={item} onClick={() => {
              setFtInputValue(item);
              setIsAddModalOpen(true);
              }}/>
          })}
          <TextButton
            icon={<FaPlusSquare />}
            onClick={(e) =>{ e.preventDefault(); setIsAddModalOpen(true)}}
          >Add another prize</TextButton>
        </div>
      )
    }
    <Modal
      isOpen={isAddModalOpen} 
      onRequestClose={()=> setIsAddModalOpen(false)}
      title={ftInputValue.id ? 'Update prize' : `Add ${input.value.length > 0 ? 'another' : 'the first'} prize`}
    >
      <div className="mt-4 grid grid-cols-1 gap-6">
        <label className="block">
          <div className="block mt-1">
            <SuperiseFtInput
              tokens={tokens}
              balances={balances}
              value={ftInputValue}
              onChange={(value) => {
                setFtInputValue(value)
              }} />
          </div>
        </label>
        <div className={`grid grid-cols-${ftInputValue.id ? '2' : '1'} gap-4`}>
          {ftInputValue.id && <PrimaryButton onClick={() => {
            let newValue = input.value.filter(item => item.id !== ftInputValue.id);
            setIsAddModalOpen(false)
            setFtInputValue(EMPTY_INPUT_VALUE)
            input.onChange(newValue)
          }}>Delete</PrimaryButton>}
          <PrimaryButton isFull onClick={
            () => {
              let newValue = [...input.value];
              if (ftInputValue.id) {
                newValue = newValue.map(item => {
                  if (item.id !== ftInputValue.id) return item;
                  return ftInputValue;
            })
            } else {
              newValue.push({...ftInputValue, id: nanoid()})
            }
            setIsAddModalOpen(false)
            setFtInputValue(EMPTY_INPUT_VALUE)
            input.onChange(newValue)
            }}
          >{ftInputValue.id ? 'Update' : 'Add'}</PrimaryButton>
        </div>
      </div>
    </Modal>
  </>
}

export default PrizeSelector;
