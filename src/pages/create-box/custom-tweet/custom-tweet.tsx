import React, { FC } from "react";
import { PrimaryButton } from "~components/button/Button";
import VerticalLine from "../vertical-line";
import Hor from "~assets/hor.svg";

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

  const requirementTextures = [];

  if (follow) requirementTextures.push(`Follow @${username}`);
  if (retweet) requirementTextures.push(`Retweet`);
  if (like) requirementTextures.push(`Like`);

  return (
    <section className="flex">
      <VerticalLine bgLight={progress <= 2} className="mr-4" />
      <div className="w-full mt-2">
        <div className="p-4 border border-gray-300 rounded-2xl">
          🚨 CRYPTO GIVEAWAY 🚨
          <br />I am doing a huge giveaway. <br />
          <br />
          To enter:
          <br />
          {requirementTextures.map((requirementTexture, index) => (
            <p>
              {index + 1}. {requirementTexture}
            </p>
          ))}
          <br />
          Join through this link:{" "}
          <a
            className="text-blue-500 underline"
            href="https://usesurprise.com/box/12"
          >
            https://usesurprise.com/box/12
          </a>
        </div>
        <PrimaryButton
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
          }}
        >
          Tweet &amp; Launch Giveaway
        </PrimaryButton>
      </div>
    </section>
  );
};

export default CustomTweet;
