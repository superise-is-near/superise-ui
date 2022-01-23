import Modal from "./modal";
import { PrimaryButton } from "~components/button/Button";
import { nanoid } from "nanoid";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  verify_requirments,
  TwitterFollowRequirmentDisplay,
  RequirmentType,
  TwitterRequirment,
} from "~domain/superise/twitter_giveaway/methods";
import { FaCheck } from "react-icons/fa";

const requirmentsFromURL = [
  {
    requirment_type: RequirmentType.TwitterFollow,
    screen_name: "NFTNinjaas",
  },
  {
    requirment_type: RequirmentType.TwitterRetweet,
    tweet_link: "https://twitter.com/NFTNinjaas/status/1482604978585972736",
  },
  {
    requirment_type: RequirmentType.TwitterLike,
    tweet_link: "https://twitter.com/NFTNinjaas/status/1482604978585972736",
  },
];

const Checkbox = ({ checked }: { checked?: boolean }) => {
  if (!checked) {
    return (
      <div className="flex items-center justify-center w-6 h-6 text-base font-normal text-white bg-white border-2 border-gray-800 rounded-full cursor-pointer" />
    );
  }
  return (
    <div className="flex items-center justify-center w-6 h-6 text-base font-normal text-white bg-black rounded-full">
      <FaCheck size={14} />
    </div>
  );
};

const CheckboxText = ({
  checked,
  children,
}: {
  checked?: boolean;
  children: any;
}) => {
  if (!checked) {
    return (
      <div className="ml-2 text-lg font-medium text-gray-900 leading-7">
        {children}
      </div>
    );
  }

  return (
    <div className="ml-2 text-lg font-medium text-gray-900 line-through leading-7">
      {children}
    </div>
  );
};

export default function RequestSigninModal(props: {
  title?: string;
  text?: string;
  isOpen?: boolean;
  onRequestClose?: any;
  handleClickConnectTwitter: any;
  onSuccess: any;
  accountName: string;
}) {
  const location = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [requirments, setRequirments] = useState<
    TwitterFollowRequirmentDisplay[]
  >([]);
  const [buttonText, setButtonText] = useState("Connect Twitter to continue");

  useEffect(async () => {
    const toRequirmentDisplay = (
      item: TwitterRequirment
    ): TwitterFollowRequirmentDisplay => {
      return {
        ...item,
        id: nanoid(),
        finished: false,
      } as TwitterFollowRequirmentDisplay;
    };
    const displayRequirments = requirmentsFromURL.map(toRequirmentDisplay);
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
            finished: foundVerifyResult.finished,
          };
        });
        setRequirments(updatedRequirments);
      }
      const allSuccessed = verifyResults.reduce((acc, current) => {
        if (acc === false) return false;
        return current.finished;
      }, true);
      if (allSuccessed && addWhiteListSuccess) {
        setButtonText("All done, joining...");
        setTimeout(() => {
          props.onSuccess();
          props.onRequestClose();
          history.replace(location.pathname);
        }, 2000);
      } else {
        setButtonText("Opps, please try again");
      }
    }
  }, [location.search]);

  return (
    <Modal
      isOpen={props.isOpen}
      title={props.title || ""}
      onRequestClose={props.onRequestClose}
      contentClassName="w-11/12 md:w-1/2"
    >
      <div>
        <div className="mt-8 text-lg font-bold text-gray-800 leading-7">
          <h1>Hi {props.accountName},</h1>
          <h1>Finish the tasks and get a seat of the giveaway.</h1>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-2">
          {requirments.map((requirment) => {
            const { id, requirment_type, finished } = requirment;
            if (requirment_type === RequirmentType.TwitterFollow) {
              return (
                <div className="flex items-center" id={id}>
                  <Checkbox checked={finished} />
                  <CheckboxText
                    checked={finished}
                  >{`Follow twitter account @${requirment.screen_name}`}</CheckboxText>
                </div>
              );
            }
            if (requirment_type === RequirmentType.TwitterRetweet) {
              return (
                <div className="flex items-center" id={id}>
                  <Checkbox checked={finished} />
                  <CheckboxText checked={finished}>
                    Retweet this tweet
                  </CheckboxText>
                </div>
              );
            }
            if (requirment_type === RequirmentType.TwitterLike) {
              return (
                <div className="flex items-center" id={id}>
                  <Checkbox checked={finished} />
                  <CheckboxText checked={finished}>
                    Like this tweet
                  </CheckboxText>
                </div>
              );
            }
          })}
        </div>
        <div className="mt-8">
          <PrimaryButton
            loading={isLoading}
            loadingText="Verifying"
            bg="#3b82f6"
            isFull
            onClick={props.handleClickConnectTwitter}
          >
            {buttonText}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
}
