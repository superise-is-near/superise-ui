import React from "react";
import "reflect-metadata";
import "es6-shim";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { AccountPage } from "./pages/account";
import IndexPage from "./pages/index";
import BoxPage from "~pages/box-page";
import Modal from "react-modal";
import SiteHeader from "~components/layout/SiteHeader";
import CreateBox from "~pages/create-box";

Modal.defaultStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(17, 24, 39, 0.8)",
    backdropFilter: "blur(4px)",
    zIndex: 30,
  },
  content: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -65%)",
  },
};

Modal.setAppElement("#root");

function App() {
  return (
    <div className="max-w-2xl px-5 m-auto mb-6 lg:max-w-7xl">
      <Router>
        <SiteHeader />
        <Switch>
          <Route path="/box/create" component={CreateBox} />
          <Route path="/account" component={AccountPage} />
          <Route path="/box/:id" component={BoxPage} />
          <Route path="/" component={IndexPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
