import React, { Fragment } from "react";
import { PrimaryButton } from "~/components/button/Button";
import { ArrowRight } from "react-feather";
import PrizePoolList from "~components/prize/prize-pool-list";
import { useHistory } from "react-router-dom";
import { usePrizePoolDisplayLists } from "~state/prize";
import PageLoading from "~components/page-loading";
import { useWhitelistTokens } from "~state/token";
import PrizePoolCard from "~components/prize/prize-pool-card";
import BoxProfile from "~assets/boxes.svg";

export default function Index() {
  let history = useHistory();

  const handleClickPool = (id: number) => {
    history.push(`/box/${id}`);
  };

  let prizePoolDisplays = usePrizePoolDisplayLists();
  const tokens = useWhitelistTokens();

  if (!prizePoolDisplays || !tokens) return <PageLoading />;

  const featuredPool = prizePoolDisplays?.[0];
  return (
    <>
      <section className="w-full bg-primary-light">
        <div
          className="grid text-dark place-items-center px-8 m-auto lg:mt-10 lg:grid lg:grid-cols-2 lg:gap-8 lg-max-1280px lg: md:w-5/6 xs:w-full"
          style={{ height: "80vh" }}
        >
          <div className="">
            <h1 className="mb-4 text-5xl font-black leading-tight">
              Create mystery box on NEAR protocol with 100% transparency
            </h1>
            <p className="mb-8 text-xl font-medium">
              Use Surprise products to create mystery boxes on Near protocol and
              open to unlock unknown content.Automate Give away your NFT. Stay
              tuned for more products.
            </p>
            <PrimaryButton
              variant="primary"
              suffixIcon={<ArrowRight />}
              onClick={() => {
                history.push("/box/create");
              }}
            >
              Get ready to create a box
            </PrimaryButton>
          </div>
          <div className="grid place-items-center w-full h-full">
            <BoxProfile />
          </div>
        </div>
      </section>
      <div className="px-8 m-auto lg:mt-10 lg:grid lg:grid-cols-2 lg:gap-8 lg-max-1280px lg: md:w-5/6 xs:w-full">
        <div className="">
          <div className="mb-4 text-4xl font-black leading-10">
            <span className="text-purple-900">Create mystery box</span>{" "}
            <span className="text-blue-500">on NEAR protocol</span>{" "}
            <span className="text-green-400">with 100% transparency</span>
          </div>
          <PrimaryButton
            suffixIcon={<ArrowRight />}
            onClick={() => {
              history.push("/box/create");
            }}
          >
            Create a Box
          </PrimaryButton>
        </div>

        <div className="mt-8 lg:mt-auto">
          <PrizePoolCard
            tokens={tokens}
            pool={featuredPool}
            onClick={() => handleClickPool(featuredPool.id)}
          />
        </div>
      </div>

      <div className="px-8 m-auto lg-max-1280px md:w-5/6 xs:w-full">
        <PrizePoolList
          pools={prizePoolDisplays}
          onClickPool={handleClickPool}
          tokens={tokens}
        />
        {prizePoolDisplays && prizePoolDisplays.length > 5 && (
          <>
            <div className="mt-8" />
            <PrimaryButton
              suffixIcon={<ArrowRight />}
              onClick={() => {
                history.push("/box/create");
              }}
            >
              Create a Box
            </PrimaryButton>
          </>
        )}
      </div>
    </>
  );
}
