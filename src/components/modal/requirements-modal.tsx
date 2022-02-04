import Modal from "./modal";
import { PrimaryButton } from "~components/button/Button";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  verify_requirments,
  RequirmentType,
  TwitterRequirmentDisplay,
} from "~domain/superise/twitter_giveaway/methods";
import { RequirementInputValue } from "~components/forms/Participant";
import checkFill from "~assets/check-fill.svg";
import checkNotFill from "~assets/check-nfill.svg";
import {
  TwitterFollowRequirment,
  TwitterLikeRequirment,
  TwitterRetweetRequirment,
} from "~domain/superise/twitter_giveaway/methods";

const Checkbox = ({ checked }: { checked?: boolean }) => {
  if (!checked) {
    return <img width={24} height={24} src={checkNotFill} />;
  }
  return <img width={24} height={24} src={checkFill} />;
};

export default function RequirementsModal(props: {
  pool_id: number;
  title?: string;
  text?: string;
  isOpen?: boolean;
  onRequestClose?: any;
  onSuccess: any;
  accountName: string;
  requirementsValue: RequirementInputValue[];
}) {
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [requirments, setRequirments] = useState<TwitterRequirmentDisplay[]>(
    []
  );
  const [buttonText, setButtonText] = useState("Connect to Twitter");

  useEffect(async () => {
    const toRequirmentDisplay = (
      item: RequirementInputValue
    ): TwitterRequirmentDisplay => {
      return {
        ...item,
        id: nanoid(),
      } as any as TwitterRequirmentDisplay;
    };
    const displayRequirments = props.requirementsValue.map(toRequirmentDisplay);
    setRequirments(displayRequirments);

    if (location.search.indexOf("connected-twitter") !== -1) {
      setIsLoading(true);
      const response = await verify_requirments(displayRequirments);
      setIsLoading(false);
      if (response.data.invalidate_twitter_session) {
        history.replace(location.pathname);
        return;
      }
      const {
        data: { verifyResults, addWhiteListSuccess },
      } = response;
      if (verifyResults) {
        const updatedRequirments = displayRequirments.map((requirementItem) => {
          const foundVerifyResult = verifyResults.find(
            (result) => result.id === requirementItem.id
          );
          return {
            ...requirementItem,
            status: foundVerifyResult.status,
            message: foundVerifyResult.message,
          };
        });
        setRequirments(updatedRequirments);
      }
      const allSuccessed = verifyResults.reduce((acc, current) => {
        if (acc === false) return false;
        return current.status === "success";
      }, true);
      if (allSuccessed && addWhiteListSuccess) {
        setButtonText("All done, joining...");
        setTimeout(() => {
          props.onSuccess();
          props.onRequestClose();
          history.replace(location.pathname);
        }, 2000);
      } else {
        setButtonText("Try again");
      }
    }
  }, [location.search]);

  const failedRequirement = requirments.find(
    (item) => item.status === "failed"
  );

  return (
    <Modal
      isOpen={props.isOpen}
      title={props.title || ""}
      onRequestClose={props.onRequestClose}
      contentClassName="w-11/12 md:w-1/2"
    >
      <div>
        <div className="mt-8 text-lg font-bold text-center text-gray-800 leading-7">
          <h2>Hi {props.accountName},</h2>
          <p>finish the tasks to join the giveaway!</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-2">
          {requirments.map((item) => {
            const { requirment_type } = item;
            let content;
            switch (requirment_type) {
              case RequirmentType.TwitterFollow: {
                const typedRequirement = item as TwitterFollowRequirment;
                content = (
                  <div className="text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-0">
                    Follow{" "}
                    <a
                      className="underline"
                      href={`https://twitter.com/${typedRequirement.screen_name}`}
                      target="_blank"
                    >
                      @{typedRequirement.screen_name}
                    </a>
                  </div>
                );
                break;
              }
              case RequirmentType.TwitterLike: {
                const typedRequirement = item as TwitterLikeRequirment;
                content = (
                  <div className="text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-0">
                    Like{" "}
                    <a
                      className="underline"
                      href={typedRequirement.tweet_link}
                      target="_blank"
                    >
                      this tweet
                    </a>
                  </div>
                );
                break;
              }

              case RequirmentType.TwitterRetweet: {
                const typedRequirement = item as TwitterRetweetRequirment;
                content = (
                  <div className="text-base font-normal text-gray-600 border-b border-gray-300 leading-6 last:border-0">
                    Retweet{" "}
                    <a
                      className="underline"
                      href={typedRequirement.tweet_link}
                      target="_blank"
                    >
                      this tweet
                    </a>
                  </div>
                );
                break;
              }
            }
            return (
              <div className="flex items-center px-2 py-3">
                <Checkbox checked={item.status === "success"} />
                <div className="ml-2">{content}</div>
              </div>
            );
            return content;
          })}
        </div>
        {failedRequirement && (
          <div className="text-sm text-center text-red-700 leading-5">
            Please fullfill the requirments above and try again!
          </div>
        )}
        <div className="mt-8">
          <PrimaryButton
            size="large"
            loading={isLoading}
            loadingText="Verifying"
            bg="#3b82f6"
            isFull
            onClick={() => {
              window.location = `/twitter/authenticate?near_account=${props.accountName}&pool_id=${props.pool_id}`;
            }}
          >
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
