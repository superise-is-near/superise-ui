import React, { FC, useEffect, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import VerticalLine from "../vertical-line";
import Hor from "~assets/hor.svg";
import {useLocation} from "react-router-dom";
import {send_tweet, verify_requirments, verify_twitter_oauth_session} from "~domain/superise/twitter_giveaway/methods";

interface ICustomTweet {
  progress: number;
  follow: boolean;
  like: boolean;
  retweet: boolean;
  username: string;
}
const CustomTweet: FC<ICustomTweet> = ({
  progress,
  follow,
  like,
  retweet,
  username,
}) => {
  if (progress !== 2) return null;

  const [buttonText, setButtonText] = useState("Tweet & Launch Giveaway");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.search.indexOf("connected-twitter") !== -1) {
    const fn = async () => {
      console.log({ content });
      setIsLoading(true);
      const verifyResponse = await verify_twitter_oauth_session();
      if (verifyResponse.data.status === 'failed') {
        setIsLoading(false);
        return;
      }
      const sendTweetResponse = await send_tweet(content)
    }
    fn()
      .catch((e) => {
        console.log({e});
      })
    }
    // if (location.search.indexOf("connected-twitter") !== -1) {
    //   setIsLoading(true);
    //   const response = await verify_requirments(displayRequirments);
    //   setIsLoading(false);
    //   if (response.data.invalidate_twitter_session) {
    //     history.replace(location.pathname);
    //     return;
    //   }
    //   const {
    //     data: { verifyResults, addWhiteListSuccess },
    //   } = response;
    //   if (verifyResults) {
    //     const updatedRequirments = displayRequirments.map((requirementItem) => {
    //       const foundVerifyResult = verifyResults.find(
    //         (result) => result.id === requirementItem.id
    //       );
    //       return {
    //         ...requirementItem,
    //         status: foundVerifyResult.status,
    //         message: foundVerifyResult.message,
    //       };
    //     });
    //     setRequirments(updatedRequirments);
    //   }
    //   const allSuccessed = verifyResults.reduce((acc, current) => {
    //     if (acc === false) return false;
    //     return current.status === "success";
    //   }, true);
    //   if (allSuccessed && addWhiteListSuccess) {
    //     setButtonText("All done, joining...");
    //     setTimeout(() => {
    //       props.onSuccess();
    //       props.onRequestClose();
    //       history.replace(location.pathname);
    //     }, 2000);
    //   } else {
    //     setButtonText("Try again");
    //   }
    // }
  }, [location.search]);

  const requirementTextures = [];

  if (follow) requirementTextures.push(`Follow @${username}`);
  if (retweet) requirementTextures.push(`Retweet`);
  if (like) requirementTextures.push(`Like`);

  const content = `🚨 CRYPTO GIVEAWAY 🚨
I am doing a huge giveaway

To enter:
${requirementTextures
  .map((requirementTexture, index) => `${index + 1}. ${requirementTexture}`)
  .join("\n")}
👉Join through this link: https://usesurprise.com/box/12 
  `;
  return (
    <section className="flex">
      <VerticalLine bgLight={progress <= 2} className="mr-4" />
      <div className="w-full mt-2">
        <div className="p-4 border border-gray-300 rounded-2xl">
          <textarea className="w-full h-full border-0" rows={8}>
            {content}
          </textarea>
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
