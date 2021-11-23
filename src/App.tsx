import React from 'react';
import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import 'reflect-metadata';
import 'es6-shim';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AccountPage } from './pages/AccountPage';
import BoxPage from '~pages/box-page';
import {FT} from "~domain/superise/model/PrizeToken";
import {serialize} from "class-transformer";
import {viewMethodsOfSuperise} from "~domain/superise/contract/contract";
import NavigationBar from './components/layout/NavigationBar';

function App() {
    return (
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/account" component={AccountPage} />
            <Route path="/box/:id" component={BoxPage} />
          </Switch>
        </Router>
    );
}

// decorate any components with this HOC to display them as vertical-align middle
// use individual fn is needed since `h-4/5` is not a appropriate style rule for
// any components
function AutoHeight(Comp: any) {
    return (props: any) => {
        return (
            <div className="xs:flex xs:flex-col md:flex md:flex-col justify-center h-4/5 lg:mt-12 relative">
                <Comp {...props} />
            </div>
        );
    };
}

export default App;
