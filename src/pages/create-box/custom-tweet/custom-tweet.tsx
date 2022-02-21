import React, { FC, useEffect, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import VerticalLine from "../vertical-line";
import Hor from "~assets/hor.svg";
import { useLocation } from "react-router-dom";
import {
  publish_pool,
  send_tweet,
  update_twitter_pool_transaction,
  verify_requirments,
  verify_twitter_oauth_session,
} from "~domain/superise/twitter_giveaway/methods";
import { getNodeConfig } from "~domain/near/config";
import { toNonDivisibleNumber } from "~utils/numbers";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";
import { ParasNft } from "~domain/paras/models";
import { RequirmentType } from "~domain/superise/twitter_giveaway/models";
import { useQuery } from "~state/urls";
import moment from "moment";
import tapToEditIcon from "~assets/tap-to-edit.svg";

const getRequirementsJSONString = (
  follow: boolean,
  retweet: boolean,
  like: boolean,
  screen_name: string,
  tweet_link: string
) => {
  const requirments = [];
  if (follow) {
    requirments.push({
      requirment_type: RequirmentType.TwitterFollow,
      screen_name,
    });
  }
  if (retweet) {
    requirments.push({
      requirment_type: RequirmentType.TwitterRetweet,
      tweet_link,
    });
  }
  if (like) {
    requirments.push({
      requirment_type: RequirmentType.TwitterLike,
      tweet_link,
    });
  }
  return requirments;
};

interface ICustomTweet {
  progress: number;
  follow: boolean;
  like: boolean;
  retweet: boolean;
  endDate: string;
  endHour: string;
  pool_id: string;
}

const CustomTweet: FC<ICustomTweet> = ({
  progress,
  follow,
  like,
  retweet,
  endDate,
  endHour,
  pool_id,
}) => {
  if (progress !== 2) return null;

  const [buttonText, setButtonText] = useState("Tweet & Launch Giveaway");
  const [isLoading, setIsLoading] = useState(false);
  const urlsQuery = useQuery();
  const location = useLocation();

  useEffect(() => {
    if (location.search.indexOf("connected-twitter") !== -1) {
      const fn = async () => {
        setIsLoading(true);

        if (process.env.NODE_ENV === "production") {
          const verifyResponse = await verify_twitter_oauth_session();
          if (verifyResponse.data.status === "failed") {
            setIsLoading(false);
            return;
          }
        }

        // Real URL when deploy to server
        // Twitter will report error if we send same tweets through the API
        // So we append a timestamp in the end of tweet when testing incase we send out the same tweet
        // In production we don't need to do that, because every box will have a unique link in the content

        const uniqueContent = `${content} \n ${new Date().getTime()}`;
        const sendTweetResponse = await send_tweet(uniqueContent);
        if (sendTweetResponse.data.status === "failed") {
          setIsLoading(false);
          setButtonText("Try again");
          return;
        }
        setIsLoading(false);
        const { tweet_id, screen_name } = sendTweetResponse.data;
        const twitter_link = `http://twitter.com/${screen_name}/status/${tweet_id}`;

        // successfully send tweet and get the tweetURL(fakeTweetURL):
        // 1. update the twitter pool with the new twitterURL
        // 2. publish the twitter pool
        // 3. display the success UI: https://www.figma.com/file/Cpxx63iKEwfBVSmAYdqD84

        const requirments = getRequirementsJSONString(
          follow,
          retweet,
          like,
          screen_name,
          twitter_link
        );
        const end_time = moment(endDate + " " + endHour).valueOf();
        try {
          await update_twitter_pool_transaction(
            {
              requirements: JSON.stringify(requirments),
              end_time,
              twitter_link,
            },
            Number(pool_id),
            `${NODE_CONFIG.origin}/box/${pool_id}?show-success-info=1`,
            true
          );
        } catch (e) {
          setIsLoading(false);
          setButtonText("Try again");
          return;
        }
      };

      fn().catch((e) => {
        throw e;
      });
    }
  }, [location.search]);

  const requirementTextures = [];
  const NODE_CONFIG = getNodeConfig();

  if (follow) requirementTextures.push(`Follow`);
  if (retweet) requirementTextures.push(`Retweet`);
  if (like) requirementTextures.push(`Like`);

  const boxId = location.pathname.match(/^\/box\/(\d+)\/edit$/)[1];

  const [content, setContent] = useState<string>(
    sessionStorage.getItem("tweet") ||
      `🚨 CRYPTO GIVEAWAY 🚨

I am doing a huge giveaway

To enter:
${requirementTextures
  .map((requirementTexture, index) => `${index + 1}. ${requirementTexture}`)
  .join("\n")}
👉Join through this link: https://testnet.superise.xyz/box/${boxId}
  `
  );

  return (
    <section className="flex">
      <VerticalLine bgLight={progress <= 2} className="mr-4" />
      <div className="w-full mt-2">
        <div className="p-4 bg-white border border-gray-300 rounded-2xl">
          <textarea
            className="w-full h-full border-0"
            rows={8}
            value={content}
            onChange={(e) => {
              const { value } = e.target;
              setContent(value);
              sessionStorage.setItem("tweet", value);
            }}
          />
        </div>
        <div className="mt-2">
          <img src={tapToEditIcon} />
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
            window.location.href = `/twitter/authenticate?redirect=${NODE_CONFIG.origin}${location.pathname}`;
          }}
        >
          {buttonText}
        </PrimaryButton>
      </div>
    </section>
  );
};

export default CustomTweet;
