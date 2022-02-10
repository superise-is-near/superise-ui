import React, { FC, useState, useEffect } from "react";
import GiveAwayPrizes from "./give-away-prizes";
import Clothes from "~/assets/clothes.svg";
import Clock from "~/assets/clock.svg";
import Hor from "~/assets/hor.svg";
import DeepClothes from "~/assets/deep-clothes.svg";
import DeepClock from "~/assets/deep-clock.svg";
import DeepHor from "~/assets/deep-hor.svg";
import SecondaryTitle from "./secondary-title";
import RequirementsTiming from "./requirements-timing";
import CustomTweet from "./custom-tweet";
import { useQuery } from "~state/urls";
import { NearTransaction } from "~domain/near/transaction";
import { wallet } from "~services/near";
import { useHistory, useParams } from "react-router-dom";
import { TwitterPool } from "~domain/superise/twitter_giveaway/models";
import { useTwitterPool } from "~state/prize";
import { useWhitelistTokens } from "~state/token";
import { ParasNft } from "~domain/paras/models";
import { nft_token } from "~domain/near/nft/methods";
import { toReadableNumber } from "~utils/numbers";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";
import { view_twitter_prize_pool } from "~domain/superise/twitter_giveaway/methods";

const CreateBox: FC = () => {
  const [progress, setProgress] = useState(0);

  const urlsQuery = useQuery();
  const history = useHistory();
  const { id: boxId } = useParams<{ id: string }>();
  const tokens = useWhitelistTokens();

  const [parasNfts, setParasNfts] = useState<ParasNft[]>([]);
  const [cryptos, setCryptos] = useState<TokenMetadataWithAmount[]>([]);

  async function resolveBoxCallback() {
    const txHashes = urlsQuery.get("transactionHashes");

    if (!txHashes) return;

    const accountId = wallet.getAccountId();

    if (!accountId) return;

    try {
      const boxId = await NearTransaction.parseTxOutcome(
        decodeURIComponent(txHashes).split(",").pop(),
        accountId
      );
      history.push(`/box/${boxId}/edit?progress=1`);
      setProgress(1);
    } catch (err) {
      throw err;
    }
  }

  async function resolveProgress() {
    const progress = urlsQuery.get("progress");
    if (progress) {
      const twitterPool: TwitterPool = await view_twitter_prize_pool(
        Number(boxId)
      );
      if (!twitterPool || !tokens) return;
      Promise.all(
        twitterPool.prize_pool.nft_prizes.map(async (item) =>
          ParasNft.newWithImgUrl(
            await nft_token(item.nft.contract_id, item.nft.nft_id),
            item.nft.contract_id
          )
        )
      ).then(setParasNfts);
      Promise.all(
        twitterPool.prize_pool.ft_prizes.map((item) => {
          const foundToken =
            tokens.find((token) => token.id === item.ft.contract_id) ??
            tokens[0];
          return {
            id: item.prize_id,
            // amount: toReadableNumber(Number(item.ft.balance)),
            amount: toReadableNumber(foundToken.decimals, item.ft.balance),
            ...foundToken,
          } as any as TokenMetadataWithAmount;
        })
      ).then(setCryptos);
      setProgress(parseInt(progress));
    }
  }

  useEffect(() => {
    resolveBoxCallback();
  }, []);

  useEffect(() => {
    resolveProgress();
  }, [progress, tokens]);

  // progress 2
  const [follow, setFollow] = useState<boolean>(
    sessionStorage.getItem("follow") === true.toString()
  );
  const [retweet, setRetweet] = useState<boolean>(
    sessionStorage.getItem("retweet") === true.toString()
  );
  const [like, setLike] = useState<boolean>(
    sessionStorage.getItem("like") === true.toString()
  );

  return (
    <div className="max-w-2xl px-5 m-auto mb-6 lg:max-w-7xl">
      <main className="m-auto lg:max-w-2xl">
        <h1 className="text-5xl font-bold">Create Giveaway</h1>
        {/* progress 1, select prize */}
        <SecondaryTitle
          select={progress >= 0}
          className="mt-12"
          icon={Clothes}
          deepIcon={DeepClothes}
        >
          ADD GIVEAWAY PRIZES
        </SecondaryTitle>
        <GiveAwayPrizes
          collapsed={progress !== 0}
          setProgress={setProgress}
          parasNfts={parasNfts}
          cryptos={cryptos}
          setParasNfts={setParasNfts}
          setCryptos={setCryptos}
        />

        {/* progress 2, select requirements */}
        <SecondaryTitle
          select={progress >= 1}
          className="mt-12"
          icon={Clock}
          deepIcon={DeepClock}
        >
          Requirements &amp; Timing
        </SecondaryTitle>
        {(sessionStorage.getItem("like") ||
          sessionStorage.getItem("retweet") ||
          sessionStorage.getItem("follow") ||
          progress >= 1) && (
          <RequirementsTiming
            collapsed={progress !== 1}
            setProgress={setProgress}
            progress={progress}
            follow={follow}
            setFollow={setFollow}
            retweet={retweet}
            setRetweet={setRetweet}
            like={like}
            setLike={setLike}
          />
        )}

        {/* progress 3, send tweet */}
        <SecondaryTitle
          select={progress === 2}
          className="mt-12"
          icon={Hor}
          deepIcon={DeepHor}
        >
          CUSTOMIZE TWEET
        </SecondaryTitle>
        <CustomTweet
          progress={progress}
          follow={follow}
          like={like}
          retweet={retweet}
        />
      </main>
    </div>
  );
};

export default CreateBox;
