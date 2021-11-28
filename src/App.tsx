import React from 'react';
import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import 'reflect-metadata';
import 'es6-shim';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AccountPage } from './pages/account';
import IndexPage from './pages/index';
import BoxPage from '~pages/box-page';
import CreateBoxPage from '~pages/create-box';
import NavigationBar from './components/layout/NavigationBar';
import Modal from 'react-modal';

Modal.defaultStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(17, 24, 39, 0.8)',
    backdropFilter: 'blur(4px)',
    zIndex: 30,
  },
  content: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -65%)',
  },
};

Modal.setAppElement('#root');

function App() {
    return (
        <Router>
          <NavigationBar />
          <Switch>
            <Route path="/account" component={AccountPage} />
            <Route path="/box/create" component={CreateBoxPage} />
            <Route path="/box/:id" component={BoxPage} />
            <Route path="/" component={IndexPage} />
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
