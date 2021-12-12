import React from 'react';
import Card from '~components/Card';
import CenterWrap from '~components/layout/center-wrap'
import {Form, Field} from 'react-final-form';
import {PrimaryButton} from '~components/button/Button';
import PrizeSelector from '~components/forms/PrizeSelector';
import SuperiseFtInput from '~components/forms/superise-ft-input';
import {nearMetadata} from '~domain/near/ft/models';
import {useFtAssets, useTokenBalances, useWhitelistTokens} from '~state/token';
import {create_prize_pool, CreatePrizePoolParam,} from "~domain/superise/methods";
import moment from "moment";
import {FtPrize} from "~domain/superise/models";
import getConfig from "~domain/near/config";
import {toNonDivisibleNumber} from "~utils/numbers";
import dayjs from 'dayjs';
import RequestSigninModal from '~components/modal/request-signin-modal';
import {wallet} from '~services/near';


let config = getConfig()

function FormErrorLabel({ name, errors, touched }: {
  name: string;
  errors: object;
  touched: object;
}) {
  if(touched[name] && errors[name]) return <span className="text-red-900">{errors[name]}</span>;
  return null;
}

export default function CreateBox() {
  const balances = useTokenBalances()
  const tokens = useWhitelistTokens() || [];
  const ftAssets = useFtAssets();
  const onSubmit = async (values: any) => {
    let p: CreatePrizePoolParam = {
      cover: values.cover_url,
      describe: values.description,
      end_time: moment(values.end_day + " " + values.end_hour).valueOf(),
      fts: values.prizes.map(({
        amount,
        token
      }) => new FtPrize(token.id === nearMetadata.id ? config.WRAP_NEAR_CONTRACT_ID : token.id, toNonDivisibleNumber(24, amount))),
      name: values.name,
      nfs: [],
      ticket_prize: toNonDivisibleNumber(24, values.ticket_price.amount),
      ticket_token_id: values.ticket_price.token.id === nearMetadata.id ? config.WRAP_NEAR_CONTRACT_ID : values.ticket_price.token.id
    }
    create_prize_pool(p).then(e=>console.log(e))
    // create_prize_pool()
  }

  return (
    <CenterWrap>
      <RequestSigninModal
        isOpen={!wallet.isSignedIn()}
        text="Please connect to NEAR wallet before creating a mysteray box."
      />
      <Card title="Create a box">
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = [
            "name",
              "description",
              "cover_url",
              "ticket_price",
              "end_day",
              "end_hour",
              "prizes",
          ].reduce((errors, name) => {
            if (values[name]) return errors;
            return {...errors, [name]: 'Required'}
          }, {});
          return errors;
          }}
          render={({form, errors, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-4 grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">
                  Name
                </span>
                <Field name="name" component="input" placeholder="Name" type="text"
                  className="block w-full mt-1 rounded-md"
                />
                <FormErrorLabel errors={errors} touched={touched} name="name" />
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Description
                </span>
                <Field name="description" component="textarea" placeholder=""
                  className="block w-full mt-1 rounded-md"/>
                <FormErrorLabel errors={errors} touched={touched} name="description" />
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Cover url 
                </span>
                <Field name="cover_url" component="input" type="text"
                  defaultValue="https://justplayproducts.com/wp-content/uploads/2020/06/78550_78551-Ryans-Mystery-Playdate-Mini-Mystery-Boxes-Call-Out-2-scaled-470x470.jpg"
                  placeholder="eg: https://example.com/picture.png"
                  className="block w-full mt-1 rounded-md"/>
                <FormErrorLabel errors={errors} touched={touched} name="cover_url" />
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Ticket price
                </span>
                <Field name="ticket_price">
                  {props => (
                    <div className="mt-1">
                      <SuperiseFtInput {...props.input} balances={balances} tokens={tokens}/>
                    </div>
                  )}
                </Field>
                <FormErrorLabel errors={errors} touched={touched} name="ticket_price" />
                {/*<Field name="ticket_price" component="input" type="number" placeholder="" className="block w-full mt-1 rounded"/> */}
              </label>

              <label className="block mt">
                <span className="text-gray-700">
                  Box open at
                </span>
                <Field name="end_day" component="input" type="date" placeholder=""
                  className="block w-full mt-1 rounded" min={dayjs().format("YYYY-MM-DD")}/>
                <FormErrorLabel errors={errors} touched={touched} name="end_day" />
                <Field name="end_hour" component="input" type="time" placeholder=""
                  className="block w-full mt-1 rounded" min={dayjs().add(1, 'm').format("HH:mm")}/>
                <FormErrorLabel errors={errors} touched={touched} name="end_hour"/>
              </label>
              <div className="-mt-4">
                <span className="text-gray-600">Quick options:</span>
                <button
                  className="ml-2 text-blue-600 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    form.batch(() => {
                      form.change('end_day', dayjs().add(1, 'm').format('YYYY-MM-DD'))
                      form.change('end_hour', dayjs().add(1, 'm').format('HH:mm'))
                  })

                  }}>In 1 minute</button>
                <button
                  className="ml-2 text-blue-600 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    form.batch(() => {
                      form.change('end_day', dayjs().add(5, 'm').format('YYYY-MM-DD'))
                      form.change('end_hour', dayjs().add(5, 'm').format('HH:mm'))
                  })
                  }}
                >In 5 minutes</button>
                <button
                  className="ml-2 text-blue-600 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    form.batch(() => {
                      form.change('end_day', dayjs().add(60, 'm').format('YYYY-MM-DD'))
                      form.change('end_hour', dayjs().add(60, 'm').format('HH:mm'))
                  })
                  }}
                >In 60 minutes</button>
              </div>

              <label className="block mt">
                <span className="text-gray-700">
                  Prize
                </span>
                <div className="mt-1">
                  <Field name="prizes">
                    {props => <PrizeSelector {...props} balances={ftAssets} tokens={tokens}/>}
                  </Field>
                  <FormErrorLabel errors={errors} touched={touched} name="prizes" />
                </div>
              </label>
              <PrimaryButton type="submit">Create</PrimaryButton>
            </div>
          </form>
          )}
          />
        </Card>
      </CenterWrap>
  )
}
