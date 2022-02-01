import React from "react";
import { useParams } from "react-router-dom";
import PrizePoolDetail from "~components/prize/prize-pool-detail";
import { useTwitterPool } from "~state/prize";
import PageLoading from "~components/page-loading";
import { useWhitelistTokens } from "~state/token";
import Footer from "~components/layout/footer";
import TwitterCard from "~components/twitter-card";
import Spacer from "~components/spacer";
import ProgressBar from "~components/progress-bar";
import {PrimaryButton} from "~components/button/Button";

const Card = ({ children }: { children?: any }) => {
  return <div className="px-4 py-[22px] py-4 bg-white border border-gray-300 rounded-2xl">{children}</div>
}

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const tokens = useWhitelistTokens();
  const prizePool = useTwitterPool(Number(id));
  if (!prizePool || !tokens) return <PageLoading />;
  return (
    <div className="m-auto lg:max-w-2xl">
      <h2 className="text-5xl font-bold leading-none">Giveaway #1</h2>
      <Spacer h="48px" />
      <Card>
        <div style={{ maxHeight: '359px' }}>
        <TwitterCard url="https://twitter.com/0xSabri/status/1487348695859445761" />
        </div>
      </Card>
      <Spacer h="16px" />
      <Card>
        <div className="grid grid-cols-2">
          <div className="text-base font-normal leading-6">
            <div className="text-gray-900">Ends in</div> 
            <div className="text-gray-900 opacity-50">2h 35 mins</div>
          </div>
          <div className="text-base font-normal leading-6">
            <div className="text-gray-900">Created at</div> 
            <div className="text-gray-900 opacity-50">Feb 16th 16:34pm</div>
          </div>
        </div>
        
        <Spacer h="24px"/>
        <ProgressBar percentage={10} />
        <Spacer h="16px" />
        <PrimaryButton isFull>Join Giveaway</PrimaryButton>
      </Card>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">REQUIREMENTS</h3>
        {/*<span className="text-sm font-bold text-gray-500">1300 TOTAL</span> */}
      </div>
      <Spacer h={"12px"} />
      <Card>
        <div className="-mx-4 -my-4">
          <div className="px-4 py-6 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">Follow @NFTNinjaas</div>
          <div className="px-4 py-6 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">Retweet Tweet</div>
          <div className="px-4 py-6 text-base font-normal text-gray-600 leading-6">Lik Tweet</div>
        </div>
      </Card>

      <Spacer h="32px" />
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold leading-6">PARTICIPANTS</h3>
        <span className="text-sm font-bold text-gray-500">1300 TOTAL</span>
      </div>
      <Spacer h={"12px"} />
      <Card>
        <div className="-mx-4 -my-4">
          <div className="px-4 py-6 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">clemens.near</div>
          <div className="px-4 py-6 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">xsb.near</div>
          <div className="px-4 py-6 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">steve.near</div>
          <div className="px-4 py-6 text-base font-normal text-gray-600 border-b border-gray-300 leading-6">draven.near</div>
          <div className="px-4 py-6 text-base font-normal text-gray-400 text-gray-600 leading-6">+1296 more</div>
        </div>
      </Card>

      <Spacer h="32px" />
      <div className="flex flex-col items-center">
        <span className="font-semibold text-gray-700">CREATED BY</span> 
        <span className="text-gray-500">liaa.near</span> 
      </div>


      {/*<PrizePoolDetail pool={prizePool} tokens={tokens} /> */}
      <Footer />
    </div>
  );
};

export default BoxPage;
