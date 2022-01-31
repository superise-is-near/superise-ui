import React from "react";
import { useParams } from "react-router-dom";
import PrizePoolDetail from "~/src/components/prize/prize-pool-detail";
import { useTwitterPool } from "~/src/state/prize";
import PageLoading from "~/src/components/page-loading";
import { useWhitelistTokens } from "~/src/state/token";
import Footer from "~/src/components/layout/footer";

const BoxPage = () => {
  const { id } = useParams<{ id: string }>();
  const tokens = useWhitelistTokens();
  const prizePool = useTwitterPool(Number(id));
  if (!prizePool || !tokens) return <PageLoading />;
  return (
    <div className="m-auto lg:max-w-2xl">
      <PrizePoolDetail pool={prizePool} tokens={tokens} />
      <Footer />
    </div>
  );
};

export default BoxPage;
