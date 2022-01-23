const oauth = require("oauth");

const { promisify } = require("util");

const TWITTER_CONSUMER_API_KEY =
  process.env.npm_config_twitter_consumer_api_key ||
  process.env.TWITTER_CONSUMER_API_KEY;
const TWITTER_CONSUMER_API_SECRET_KEY =
  process.env.npm_config_twitter_consumer_api_secret_key ||
  process.env.TWITTER_CONSUMER_API_SECRET_KEY;

const oauthConsumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  TWITTER_CONSUMER_API_KEY,
  TWITTER_CONSUMER_API_SECRET_KEY,
  "1.0A",
  "http://127.0.0.1:3000/twitter/callback",
  "HMAC-SHA1"
);

async function oauthGetUserById(
  userId,
  { oauthAccessToken, oauthAccessTokenSecret } = {}
) {
  return promisify(oauthConsumer.get.bind(oauthConsumer))(
    `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`,
    oauthAccessToken,
    oauthAccessTokenSecret
  ).then((body) => JSON.parse(body));
}
async function getOAuthAccessTokenWith({
  oauthRequestToken,
  oauthRequestTokenSecret,
  oauthVerifier,
} = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthAccessToken(
      oauthRequestToken,
      oauthRequestTokenSecret,
      oauthVerifier,
      function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
        console.log({ error });
        return error
          ? reject(new Error("Error getting OAuth access token"))
          : resolve({ oauthAccessToken, oauthAccessTokenSecret, results });
      }
    );
  });
}

async function getOAuthRequestToken() {
  return new Promise((resolve, reject) => {
    oauthConsumer.getOAuthRequestToken(function (
      error,
      oauthRequestToken,
      oauthRequestTokenSecret,
      results
    ) {
      return error
        ? reject(new Error("Error getting OAuth request token"))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results });
    });
  });
}

async function createTwitterFriendship({
  oauthAccessToken,
  oauthAccessTokenSecret,
  screen_name,
} = {}) {
  return promisify(oauthConsumer.post.bind(oauthConsumer))(
    `https://api.twitter.com/1.1/friendships/create.json`,
    oauthAccessToken,
    oauthAccessTokenSecret,
    {
      screen_name,
    }
  )
    .then((body) => ({ status: "success" }))
    .catch((e) => ({ status: "fail" }));
}

async function retweetTweet({
  oauthAccessToken,
  oauthAccessTokenSecret,
  tweet_id,
} = {}) {
  console.log({ oauthAccessToken, oauthAccessTokenSecret, tweet_id });
  return promisify(oauthConsumer.post.bind(oauthConsumer))(
    `https://api.twitter.com/1.1/statuses/retweet/:id.json`.replace(
      ":id",
      tweet_id
    ),
    oauthAccessToken,
    oauthAccessTokenSecret,
    {
      id: tweet_id,
    }
  )
    .then((body) => ({ status: "success" }))
    .catch((e) => {
      console.log({ e });
      if (e.data && JSON.parse(e.data)) {
        if (JSON.parse(e.data).errors.find((item) => item.code === 327)) {
          // 403 means already retweeted
          //   {
          //     statusCode: 403,
          //     data: '{"errors":[{"code":327,"message":"You have already retweeted this Tweet."}]}'
          //   }
          return { status: "success" };
        }
      }
      return { status: "fail" };
    });
}
async function likeTweet({
  oauthAccessToken,
  oauthAccessTokenSecret,
  tweet_id,
} = {}) {
  return promisify(oauthConsumer.post.bind(oauthConsumer))(
    `https://api.twitter.com/1.1/favorites/create.json`,
    oauthAccessToken,
    oauthAccessTokenSecret,
    {
      id: tweet_id,
    }
  )
    .then((body) => ({ status: "success" }))
    .catch((e) => {
      console.log({ e });
      if (e.data && JSON.parse(e.data)) {
        if (
          JSON.parse(e.data).errors.find(
            (item) =>
              item.code === 193 || item.code === 327 || item.code === 139
          )
        ) {
          // 193 means already liked
          // {
          //   statusCode: 403,
          //     data: '{"errors":[{"code":139,"message":"You have already favorited this status."}]}'
          // }
          return { status: "success" };
        }
      }
      return { status: "fail" };
    });
}

module.exports = {
  oauthGetUserById,
  getOAuthAccessTokenWith,
  getOAuthRequestToken,
  createTwitterFriendship,
  likeTweet,
  retweetTweet,
};
