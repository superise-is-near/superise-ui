import React, { FC, useEffect, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import VerticalLine from "../vertical-line";
import Hor from "~assets/hor.svg";
import { useLocation } from "react-router-dom";
import {
  send_tweet,
  verify_requirments,
  verify_twitter_oauth_session,
} from "~domain/superise/twitter_giveaway/methods";

interface ICustomTweet {
  progress: number;
  follow: boolean;
  like: boolean;
  retweet: boolean;
}
const CustomTweet: FC<ICustomTweet> = ({ progress, follow, like, retweet }) => {
  if (progress !== 2) return null;

  const [buttonText, setButtonText] = useState("Tweet & Launch Giveaway");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.search.indexOf("connected-twitter") !== -1) {
      const fn = async () => {
        setIsLoading(true);
        const verifyResponse = await verify_twitter_oauth_session();
        if (verifyResponse.data.status === "failed") {
          setIsLoading(false);
          return;
        }

        // Fake URL for testing
        const fakeTweetURL =
          "https://twitter.com/woca/status/1489889136433455110";
        // successfully send tweet and get the tweetURL(fakeTweetURL):
        // 1. update the twitter pool with the new twitterURL
        // 2. publish the twitter pool
        // 3. display the success UI: https://www.figma.com/file/Cpxx63iKEwfBVSmAYdqD84

        // Real URL when deploy to server
        // Twitter will report error if we send same tweets through the API
        // So we append a timestamp in the end of tweet when testing incase we send out the same tweet
        // In production we don't need to do that, because every box will have a unique link in the content

        // const uniqueContent = `${content} \nTEST ${new Date().getTime()}`;
        // console.log('send tweet: ', uniqueContent)
        // const sendTweetResponse = await send_tweet(uniqueContent)
        // if (sendTweetResponse.data.status === 'failed') {
        //   setIsLoading(false);
        //   setButtonText("Try again");
        //   return;
        // }
        // setIsLoading(false);
        // const { tweet_id, screen_name } = sendTweetResponse.data;
        // const twitterURL = `https://twitter.com/${screen_name}/status/${tweet_id}`;
        // console.log({ twitterURL })
      };
      fn().catch((e) => {
        console.log({ e });
      });
    }
  }, [location.search]);

  const requirementTextures = [];

  if (follow) requirementTextures.push(`Follow`);
  if (retweet) requirementTextures.push(`Retweet`);
  if (like) requirementTextures.push(`Like`);

  const boxId = location.pathname.match(/^\/box\/(\d+)\/edit$/)[1];
  const content = `🚨 CRYPTO GIVEAWAY 🚨
I am doing a huge giveaway

To enter:
${requirementTextures
  .map((requirementTexture, index) => `${index + 1}. ${requirementTexture}`)
  .join("\n")}
👉Join through this link: https://usesurprise.com/box/${boxId}
  `;
  return (
    <section className="flex">
      <VerticalLine bgLight={progress <= 2} className="mr-4" />
      <div className="w-full mt-2">
        <div className="p-4 border border-gray-300 rounded-2xl">
          <textarea
            className="w-full h-full border-0"
            rows={8}
            defaultValue={content}
          />
        </div>

        <PrimaryButton
          loading={isLoading}
          size="large"
          className="my-6"
          prefixIcon={
            <img
              src={Hor}
              className="w-6 h-6 mr-1"
              width="24px"
              height="24px"
              alt="hor image"
            />
          }
          onClick={() => {
            // TODO Submit
            window.location.href = `/twitter/authenticate?redirect=box/create`;
          }}
        >
          {buttonText}
        </PrimaryButton>
      </div>
    </section>
  );
};

export default CustomTweet;
