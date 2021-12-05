import React, { useState } from 'react';
import Card from '~components/Card';
import CenterWrap from '~components/layout/center-wrap'
import { Form, Field } from 'react-final-form';
import { Flex } from '~components/layout/flex';
import {PrimaryButton} from '~components/button/Button';
import PrizeSelector from '~components/forms/PrizeSelector';
import { nanoid } from 'nanoid';
import SuperiseFtInput from '~components/forms/superise-ft-input';
import {nearMetadata} from '~domain/near/ft/models';
import {useFtAssets, useTokenBalances, useWhitelistTokens} from '~state/token';

export default function CreateBox() {
  const balances = useTokenBalances()
  const tokens = useWhitelistTokens();
  const ftAssets = useFtAssets();
  const onSubmit = (values) => {
    console.log({ values }) 
  }
  return (
    <CenterWrap>
      <Card title="Create a box">
        <Form 
          onSubmit={onSubmit}
          render={({ values }) => (
            <div className="grid grid-cols-1 gap-6 mt-4">
              <label className="block">
                <span className="text-gray-700">
                  Name
                </span>
                <Field name="name" component="input" placeholder="Name" type="text" className="mt-1 block w-full rounded-md"/>
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Description
                </span>
                <Field name="description" component="textarea" placeholder="" className="mt-1 block w-full rounded-md"/>
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Cover url 
                </span>
                <Field name="cover_url" component="input" type="text" placeholder="eg: https://example.com/picture.png" className="mt-1 block w-full rounded-md"/>
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Ticket price
                </span>
                <Field name="ticket_price"> 
                  {props => (
                    <div className="mt-1">
                      <SuperiseFtInput {...props.input} balances={balances} tokens={tokens} />
                    </div>
                  )}
                </Field>
                {/*<Field name="ticket_price" component="input" type="number" placeholder="" className="mt-1 block w-full rounded"/> */}
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Start at
                </span>
                <Field name="begin_day" component="input" type="date" placeholder="" className="mt-1 block w-full rounded"/>
                <Field name="begin_hour" component="input" type="time" placeholder="" className="mt-1 block w-full rounded"/>
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  End at
                </span>
                <Field name="end_day" component="input" type="date" placeholder="" className="mt-1 block w-full rounded"/>
                <Field name="end_hour" component="input" type="time" placeholder="" className="mt-1 block w-full rounded"/>
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Prize
                </span>
                <div className="mt-1">
                  <Field name="prizes">
                    {props => <PrizeSelector {...props} balances={ftAssets} tokens={tokens}/>}
                  </Field>
                </div>
              </label>
              <PrimaryButton onClick={() => {
                console.log({ values })
              }}>Create</PrimaryButton>
            </div>
          )}
          /> 
      </Card>
    </CenterWrap>
  )
}
