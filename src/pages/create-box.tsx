import React, {useState} from 'react';
import Card from '~components/Card';
import CenterWrap from '~components/layout/center-wrap'
import {Form, Field} from 'react-final-form';
import {Flex} from '~components/layout/flex';
import {PrimaryButton} from '~components/button/Button';
import PrizeSelector from '~components/forms/PrizeSelector';
import {nanoid} from 'nanoid';
import SuperiseFtInput from '~components/forms/superise-ft-input';
import {nearMetadata} from '~domain/near/ft/models';
import {useFtAssets, useTokenBalances, useWhitelistTokens} from '~state/token';
import {create_prize_pool, CreatePrizePoolParam,} from "~domain/superise/methods";
import moment from "moment";
import {FtPrize} from "~domain/superise/models";
import getConfig from "~domain/near/config";
import {utils} from "near-api-js";
import {toNonDivisibleNumber} from "~utils/numbers";

let config = getConfig()
export default function CreateBox() {
    const balances = useTokenBalances()
    const tokens = useWhitelistTokens();
    const ftAssets = useFtAssets();
    const onSubmit = async (values: any) => {
        console.log("onSubmit", {values})
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
        console.log({p});
        create_prize_pool(p).then(e => console.log(e))
        // create_prize_pool()
    }
    return (
        <CenterWrap>
            <Card title="Create a box">
                <Form
                    onSubmit={onSubmit}
                    render={({values}) => (
                        <div className="grid grid-cols-1 gap-6 mt-4">
                            <label className="block">
                <span className="text-gray-700">
                  Name
                </span>
                                <Field name="name" component="input" placeholder="Name" type="text"
                                       className="mt-1 block w-full rounded-md"/>
                            </label>

                            <label className="block mt">
                <span className="text-gray-700">
                  Description
                </span>
                                <Field name="description" component="textarea" placeholder=""
                                       className="mt-1 block w-full rounded-md"/>
                            </label>

                            <label className="block mt">
                <span className="text-gray-700">
                  Cover url 
                </span>
                                <Field name="cover_url" component="input" type="text"
                                       placeholder="eg: https://example.com/picture.png"
                                       className="mt-1 block w-full rounded-md"/>
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
                                {/*<Field name="ticket_price" component="input" type="number" placeholder="" className="mt-1 block w-full rounded"/> */}
                            </label>

                            <label className="block mt">
                <span className="text-gray-700">
                  prizes withdraw at
                </span>
                                <Field name="end_day" component="input" type="date" placeholder=""
                                       className="mt-1 block w-full rounded"/>
                                <Field name="end_hour" component="input" type="time" placeholder=""
                                       className="mt-1 block w-full rounded"/>
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
                                // console.log({ values })
                                onSubmit(values)
                            }}>Create</PrimaryButton>
                        </div>
                    )}
                />
            </Card>
        </CenterWrap>
    )
}
