import React from 'react';
import { PrimaryButton } from '~/components/button/Button'
import { FaArrowRight, FaTrain, FaTwitter, FaGithub} from 'react-icons/fa';
import {GiDramaMasks} from 'react-icons/gi';
import { cardTheme, ColorCard, ColorCardTitle } from '~/components/ColorCard'
import SiteHeader from '~/components/layout/SiteHeader'

const TwitterCard = ({ url }: { url: string }) => {
  return (
    <div className="overflow-hidden max-h-72 h-72">
      <div className="">
        <blockquote className="twitter-tweet ">
          <a href={url}></a>
        </blockquote>
      </div>
    </div>
  )
}

export default function Index() {
  return (
    <div className="max-w-2xl px-5 m-auto mb-6 lg:max-w-7xl">
      <SiteHeader />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ColorCard>
            <div className="grid grid-cols-1 gap-5">
              <ColorCardTitle>
                <span className="text-4xl">
                Social media giveaway made easy and transparent.
                  </span>
                <TwitterCard url="https://twitter.com/lordsociety_nft/status/1477047375898284038" />
              </ColorCardTitle>
            </div>
          </ColorCard>
        </div>
        <div className="lg:col-span-5">
          <ColorCard theme="pink">
            <div className="grid grid-cols-1 gap-5">
              <FaTwitter size="36px" color={cardTheme.pink.fg} />
              <ColorCardTitle theme="pink">
                Paste the Twitter giveaway link to get start.
              </ColorCardTitle>
              <textarea rows={5} className="border-0 rounded-sm" placeholder="Put twitter link here" />
              <PrimaryButton suffixIcon={<FaArrowRight />} onClick={() => {
                window.location.assign('/box/create')
              }}>CREATE GIVEAWAY BOX</PrimaryButton>
            </div>
          </ColorCard>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:auto-rows-fr">
        <div className="lg:col-span-7 xl:col-span-4">
        <ColorCard theme="purple">
          <div className="grid grid-cols-1 gap-5">
            <FaTrain size="36px" color={cardTheme.purple.fg} />
            <ColorCardTitle theme="purple">
              Waste no time managing giveways, it’s all automatical.
            </ColorCardTitle>
          </div>
        </ColorCard>
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
        <ColorCard theme="yellow">
          <div className="pb-20 grid grid-cols-1 gap-5">
            <GiDramaMasks size="36px" color={cardTheme.yellow.fg}/>
            <ColorCardTitle theme="yellow">
              No fake giveaway, ever.
            </ColorCardTitle>
          </div>
        </ColorCard>
        </div>
        <div className="lg:col-span-12 xl:col-span-4">
        <ColorCard theme="green">
          <div className="grid grid-cols-1 gap-5">
            <FaGithub size="36px" color={cardTheme.green.fg} />
            <ColorCardTitle theme="green">
              <span className="block lg:w-7/12 xl:w-full">
                Surprise is opensourced and proudly powered by the NEAR protocol.
              </span>
            </ColorCardTitle>
          </div>
        </ColorCard>
        </div>
      </div>
      <div className="mt-6">
      <ColorCard theme="lightGreen">
        <div className="pb-20 grid grid-cols-1 gap-5">
          <ColorCardTitle theme="lightGreen">
            Hot giveaways
          </ColorCardTitle>
        </div>
      </ColorCard>
      </div>
    </div>
  )
}
      // <PrimaryButton suffixIcon={<ArrowRight />} onClick={() => {
      //   window.location.assign('/box/create');
      // }}>Create a Box</PrimaryButton>
