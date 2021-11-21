import React, { Fragment } from 'react';
import {wallet} from "~services/near";
import Card from "~/components/Card"
import { Balance } from '~/components/account/Account';
import fakedata from '~/fakedata/account';

export function AccountPage() {
  // TODO: replace fakedata with realdata
  return <div className="m-4">
    <Balance tokens={fakedata.tokens} balances={fakedata.balances} />
    <div className="mt-8" />
    <Card>
      <h2 className="text-lg font-bold">Deposit</h2>
    </Card>
    <h1 className="text-xl">Account Page</h1>
    <button onClick={() => wallet.signOut()}>sign out</button>
    </div>;
}
