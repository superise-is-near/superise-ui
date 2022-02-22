import React from "react";
import "reflect-metadata";
import "es6-shim";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AccountPage from "./pages/account";
import BoxPage from "~pages/box-page";
import Modal from "react-modal";
import SiteHeader from "~components/layout/SiteHeader";
import Footer from "~components/layout/footer";
import CreateBox from "~pages/create-box";
import HomePage from "~pages/homepage";
import { Helmet } from "react-helmet";

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
    <Router>
      <Helmet>
        <title>Superise</title>
        <link rel="canonical" href={window.location.href} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Superise: Crypto &amp; NFT giveaways like it's 2077. "
        />
        <meta
          property="og:description"
          content="Offering crypto tools to make building and launching projects easier."
        />
        <meta
          property="og:image"
          content="https://testnet.superise.xyz/hero-image.4acbe8a5.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@superise" />
        <meta name="twitter:creator" content="@superise_team" />
        <meta
          name="twitter:title"
          content="Superise: Crypto &amp; NFT giveaways like it's 2077. "
        />
        <meta
          name="twitter:description"
          content="Offering crypto tools to make building and launching projects easier."
        />
        <meta
          name="twitter:image"
          content="https://testnet.superise.xyz/hero-image.4acbe8a5.png"
        />
        <meta
          name="description"
          content="Crypto &amp; NFT giveaways like it's 2077. Offering crypto tools to make building and launching projects easier."
        />
        <meta
          name="keywords"
          content="crypto, marketing tools, superise, giveaway tools"
        />
      </Helmet>
      <div className="max-w-2xl px-5 m-auto mb-6 lg:max-w-7xl">
        <SiteHeader />
      </div>
      <Switch>
        <Route
          path={["/box/create", "/box/:id/edit", "/box/create-callback"]}
          component={CreateBox}
        />
        <Route path="/account" component={AccountPage} />
        <Route path="/box/:id" component={BoxPage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <div className="max-w-2xl px-5 m-auto mb-6 lg:max-w-7xl">
        <Footer />
      </div>
    </Router>
  );
}

export default App;
