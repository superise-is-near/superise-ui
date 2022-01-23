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
  createTwitterFriendship,
  retweetTweet,
  likeTweet,
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

      const { pool_id, near_account } = req.query;

      req.session = req.session || {};
      req.session.oauthRequestToken = oauthRequestToken;
      req.session.oauthRequestTokenSecret = oauthRequestTokenSecret;
      req.session.pool_id = pool_id;
      req.session.near_account = near_account;
      const authorizationUrl = `https://api.twitter.com/oauth/${method}?oauth_token=${oauthRequestToken}`;
      console.log("redirecting user to ", authorizationUrl);
      res.redirect(authorizationUrl);
    };
  }

  app.get("/twitter/callback", async (req, res) => {
    const {
      oauthRequestToken,
      oauthRequestTokenSecret,
      pool_id,
      near_account,
    } = req.session;
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
    req.session.save(() =>
      res.redirect(
        `/#/box/${pool_id}?connected-twitter=${user.screen_name}&show_requirements_modal=1`
      )
    );
  });

  // TODO: Check if the server has the session data for this twitter account
  // If not, remove the `connected-twitter` query in the URL and redirect to the new URL
  app.get("/verify-connected-twitter", (req, res) => {
    const { connected_twitter } = req.query;
    console.log(req.body, req.query);
    res.json({
      success: connected_twitter === req.session.twitter_screen_name,
    });
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
    console.log({ requirments });
    if (!oauthAccessToken || !oauthAccessTokenSecret) {
      res.send({ invalidate_twitter_session: true });
      return;
    }
    const promises = requirments.map((requirment) => {
      const { requirment_type } = requirment;
      if (requirment_type === "twitter_follow") {
        return createTwitterFriendship({
          oauthAccessToken,
          oauthAccessTokenSecret,
          screen_name: requirment.screen_name,
        });
      }

      if (requirment_type === "twitter_retweet") {
        return retweetTweet({
          oauthAccessToken,
          oauthAccessTokenSecret,
          tweet_id: requirment.tweet_link.split("/").slice(-1)[0],
        });
      }

      if (requirment_type === "twitter_like") {
        return likeTweet({
          oauthAccessToken,
          oauthAccessTokenSecret,
          tweet_id: requirment.tweet_link.split("/").slice(-1)[0],
        });
      }
    });
    const results = await Promise.all(promises);

    // If all result is correct set the whitelist
    let addWhiteListSuccess = false;
    try {
      addWhiteListSuccess = await add_user_into_whitelist({
        pool_id: Number(pool_id),
        account: near_account,
        twitter_account: twitter_screen_name,
      });
    } catch {
      addWhiteListSuccess = false;
    }
    const verifyResults = results.map((result, idx) => {
      return {
        id: requirments[idx].id,
        finished: result.status === "success",
        message:
          "Something wrong with the interact with Twitter API, please refresh and try again.",
      };
    });

    res.json({ verifyResults, addWhiteListSuccess });
  });

  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.use(proxy);
}
