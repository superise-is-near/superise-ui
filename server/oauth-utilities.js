const oauth = require("oauth");

const { promisify } = require("util");
const config = require("./config");

const ERROR_MESSAGE_TRY = "Something went wrong, please try again.";

const TWITTER_CONSUMER_API_KEY =
  process.env.npm_config_twitter_consumer_api_key || process.env.consumer_key;
const TWITTER_CONSUMER_API_SECRET_KEY =
  process.env.npm_config_twitter_consumer_api_secret_key ||
  process.env.consumer_secret;

const oauthConsumer = new oauth.OAuth(
  "https://twitter.com/oauth/request_token",
  "https://twitter.com/oauth/access_token",
  TWITTER_CONSUMER_API_KEY,
  TWITTER_CONSUMER_API_SECRET_KEY,
  "1.0A",
  config.twitter_callback_url,
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
        ? console.log({ error }) ||
            reject(new Error("Error getting OAuth request token"))
        : resolve({ oauthRequestToken, oauthRequestTokenSecret, results });
    });
  });
}

async function checkTwitterFriendship({
  oauthAccessToken,
  oauthAccessTokenSecret,
  screen_name,
} = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.get(
      `https://api.twitter.com/1.1/friendships/show.json?target_screen_name=${screen_name}`,
      oauthAccessToken,
      oauthAccessTokenSecret,
      (err, result, response) => {
        const parsedResult = result && JSON.parse(result);
        if (
          parsedResult &&
          parsedResult.relationship.target &&
          parsedResult.relationship.target.followed_by
        ) {
          resolve({ status: "success", message: "success" });
          return;
        }
        resolve({
          status: "failed",
          message: `Please follow <a target="_blank" class="text-gray-900 underline" href="https://twitter.com/${screen_name}">@${screen_name} ↗</a> and try again`,
        });
      }
    );
  });
}

// https://developer.twitter.com/en/docs/twitter-api/v1/tweets/timelines/api-reference/get-statuses-user_timeline
async function checkRetweet({
  oauthAccessToken,
  oauthAccessTokenSecret,
  tweet_id,
  screen_name,
} = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.get(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?&screen_name=${screen_name}&trim_user=true&exclude_replies=false`,
      oauthAccessToken,
      oauthAccessTokenSecret,
      (err, result, response) => {
        if (result) {
          const retweets = JSON.parse(result || []).filter(
            (item) => item.retweeted_status
          );
          const foundRetweet = retweets.find(
            (item) => item.retweeted_status.id_str === tweet_id
          );
          if (foundRetweet) {
            resolve({ status: "success", message: "success" });
            return;
          }
          resolve({
            status: "failed",
            message: `Please retweet <a target="_blank" class="text-gray-900 underline" href="https://twitter.com/i/web/status/${tweet_id}">this tweet ↗</a> and try again`,
          });
          return;
        }
        resolve({ status: "failed", message: ERROR_MESSAGE_TRY });
      }
    );
  });
}
async function checkLikeTweet({
  oauthAccessToken,
  oauthAccessTokenSecret,
  tweet_id,
} = {}) {
  return new Promise((resolve, reject) => {
    oauthConsumer.get(
      `https://api.twitter.com/1.1/favorites/list.json?count=100`,
      oauthAccessToken,
      oauthAccessTokenSecret,
      (err, result, response) => {
        if (result) {
          const foundLikedTweet = JSON.parse(result || []).find(
            (item) => item.id_str === tweet_id
          );
          if (foundLikedTweet) {
            resolve({ status: "success", message: "success" });
            return;
          }
          resolve({
            status: "failed",
            message: `Please like <a target="_blank" class="text-gray-900 underline" href="https://twitter.com/i/web/status/${tweet_id}">this tweet ↗</a> and try again`,
          });
          return;
        }
        resolve({ status: "failed", message: ERROR_MESSAGE_TRY });
      }
    );
  });
}

module.exports = {
  oauthGetUserById,
  getOAuthAccessTokenWith,
  getOAuthRequestToken,
  checkTwitterFriendship,
  checkLikeTweet,
  checkRetweet,
};
