const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
require("secrets");

const {
  getOAuthRequestToken,
  getOAuthAccessTokenWith,
  oauthGetUserById,
  checkTwitterFriendship,
  checkRetweet,
  checkLikeTweet,
  sendTweet,
} = require("./oauth-utilities");

const path = require("path");
const { add_user_into_whitelist } = require("./near.js");

const COOKIE_SECRET =
  process.env.npm_config_cookie_secret || process.env.COOKIE_SECRET;

const proxy = createProxyMiddleware("ws://localhost:1234");

main().catch((err) => console.error(err.message, err));

async function main() {
  const app = express();
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(session({ secret: COOKIE_SECRET || "secret" }));

  app.listen(3000, () => console.log("listening on http://127.0.0.1:3000"));

  app.use((req, res, next) => {
    if (req.headers.host.indexOf("localhost:3000") !== -1) {
      res.redirect("http://127.0.0.1:3000");
      return;
    }
    next();
  });

  app.get("/whitelist-test", async (req, res) => {
    console.log("test the whitelist method, hotload");
    add_user_into_whitelist({
      pool_id: 1,
      account: "xsb.testnet",
      twitter_account: "hsxyl",
    });
    res.send("Test");
  });

  app.get("/", async (req, res, next) => {
    // We will server the React app build by parcel when accessing the /
    return next();
  });

  app.get("/twitter/logout", logout);
  function logout(req, res, next) {
    res.clearCookie("twitter_screen_name");
    req.session.destroy(() => res.redirect("/"));
  }

  app.get("/twitter/authenticate", twitter("authenticate"));

  function twitter(method) {
    return async (req, res) => {
      const { oauthRequestToken, oauthRequestTokenSecret } =
        await getOAuthRequestToken();
      const { pool_id, near_account, redirect } = req.query;
      req.session = req.session || {};
      req.session.oauthRequestToken = oauthRequestToken;
      req.session.oauthRequestTokenSecret = oauthRequestTokenSecret;
      req.session.pool_id = pool_id;
      req.session.near_account = near_account;
      req.session.redirect = redirect || "";
      const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`;
      console.log("redirecting user to ", authorizationUrl);
      res.redirect(authorizationUrl);
    };
  }

  app.get("/twitter-callback", async (req, res) => {
    const { oauthRequestToken, oauthRequestTokenSecret, pool_id } = req.session;
    const { oauth_verifier: oauthVerifier } = req.query;

    // console.log("/twitter/callback", {
    //   oauthRequestToken,
    //   oauthRequestTokenSecret,
    //   oauthVerifier,
    // });

    const { oauthAccessToken, oauthAccessTokenSecret, results } =
      await getOAuthAccessTokenWith({
        oauthRequestToken,
        oauthRequestTokenSecret,
        oauthVerifier,
      });

    req.session.oauthAccessToken = oauthAccessToken;
    req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;

    const { user_id: userId /*, screen_name */ } = results;
    const user = await oauthGetUserById(userId, {
      oauthAccessToken,
      oauthAccessTokenSecret,
    });

    req.session.twitter_screen_name = user.screen_name;

    console.log("user succesfully logged in with twitter", user.screen_name);
    req.session.save(() => {
      console.log({ redirect: req.session.redirect });
      // TODO: modify this to /box/edit once Steve finish the creating/editing flow
      if (req.session.redirect.indexOf("box/create") !== -1) {
        res.redirect(
          `/#/${req.session.redirect}?connected-twitter=${user.screen_name}}&progress=2`
        );
        return;
      }
      res.redirect(
        `/#/box/${pool_id}?connected-twitter=${user.screen_name}&show_requirements_modal=1`
      );
    });
  });

  // TODO: Check if the server has the session data for this twitter account
  // If not, remove the `connected-twitter` query in the URL and redirect to the new URL
  app.get("/verify-connected-twitter", (req, res) => {
    const { connected_twitter } = req.query;
    res.json({
      success: connected_twitter === req.session.twitter_screen_name,
    });
  });

  app.get("/verify-twitter-oauth-session", (req, res) => {
    const { oauthAccessToken, oauthAccessTokenSecret } = req.session;
    const status =
      !oauthAccessToken || !oauthAccessTokenSecret ? "failed" : "success";
    res.send({ status });
  });

  app.post("/verify-requirments", async (req, res) => {
    const {
      oauthAccessToken,
      oauthAccessTokenSecret,
      pool_id,
      near_account,
      twitter_screen_name,
    } = req.session;
    const { requirments } = req.body;
    if (!oauthAccessToken || !oauthAccessTokenSecret) {
      res.send({ invalidate_twitter_session: true });
      return;
    }

    const promises = requirments.map((requirment) => {
      const { requirment_type } = requirment;
      if (requirment_type === "twitter_follow") {
        return checkTwitterFriendship({
          oauthAccessToken,
          oauthAccessTokenSecret,
          screen_name: requirment.screen_name,
        });
      }

      if (requirment_type === "twitter_retweet") {
        return checkRetweet({
          oauthAccessToken,
          oauthAccessTokenSecret,
          tweet_id: requirment.tweet_link.split("/").slice(-1)[0],
          screen_name: twitter_screen_name,
        });
      }

      if (requirment_type === "twitter_like") {
        return checkLikeTweet({
          oauthAccessToken,
          oauthAccessTokenSecret,
          tweet_id: requirment.tweet_link.split("/").slice(-1)[0],
          screen_name: twitter_screen_name,
        });
      }
    });
    const results = await Promise.all(promises);

    // If all result is correct set the whitelist
    let addWhiteListSuccess = false;
    if (!results.find((item) => item.status === "failed")) {
      try {
        addWhiteListSuccess = await add_user_into_whitelist({
          pool_id: Number(pool_id),
          account: near_account,
          twitter_account: twitter_screen_name,
        });
      } catch {
        addWhiteListSuccess = false;
      }
    }

    const verifyResults = results.map((result, idx) => {
      return {
        id: requirments[idx].id,
        status: result.status,
        message: result.message,
      };
    });

    res.json({ verifyResults, addWhiteListSuccess });
  });

  app.post("/send-tweet", async (req, res) => {
    const { oauthAccessToken, oauthAccessTokenSecret } = req.session;
    const { content } = req.body;
    if (!oauthAccessToken || !oauthAccessTokenSecret) {
      res.send({ invalidate_twitter_session: true });
      return;
    }
    const sendTweetResult = await sendTweet({
      oauthAccessToken,
      oauthAccessTokenSecret,
      content,
    });
    res.json(sendTweetResult);
  });

  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.use(proxy);
}
