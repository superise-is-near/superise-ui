import React, { FC, useEffect, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import clsx from "classnames";
import { nft_tokens_for_owner_in_paras } from "~domain/paras/methods";
import { wallet } from "~domain/near/global";
import { ParasNft } from "~domain/paras/models";

interface INFTPrizeSelector {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NFTPrizeSelector: FC<INFTPrizeSelector> = ({
  isOpen,
  onRequestClose,
}) => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectDataSource, setSelectDataSource] = useState<
    "Paras" | "Mintbase"
  >("Paras");
  const selectCount = 0;

  useEffect(() => {
    nft_tokens_for_owner_in_paras(wallet.getAccountId(), 100).then(
      (data: ParasNft[]) => {
        setNfts(data);
        setLoading(false);
      }
    );
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Add NFT prize"
    >
      <section className="flex mb-3 justify-center items-center">
        <div
          className={clsx(
            "w-24 h-8 grid place-items-center cursor-pointer rounded-lg font-bold bg-superise-gradient mr-1",
            selectDataSource === "Paras" && "border-2 border-black"
          )}
          onClick={() => setSelectDataSource("Paras")}
        >
          Paras
        </div>
        <div
          className={clsx(
            "w-24 h-8  grid place-items-center cursor-pointer rounded-lg font-bold bg-superise-gray",
            selectDataSource === "Mintbase" && "border-2 border-black"
          )}
          onClick={() => setSelectDataSource("Mintbase")}
        >
          Mintbase
        </div>
      </section>
      <section
        className="overflow-auto "
        style={{ maxHeight: "50vh", height: "50vh" }}
      >
        {loading &&
          new Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                className="w-full h-32 mx-2 bg-gray-100 mb-4 rounded-lg"
                key={index}
              />
            ))}
        {!loading &&
          nfts.length > 0 &&
          nfts.map(({ nft, img_url, select }) => (
            <div
              key={nft.token_id}
              className={clsx(
                select ? "border-black" : "border-white",
                "flex mb-4 px-2 py-3 rounded-lg shadow cursor-pointer border-2"
              )}
              onClick={() => {
                setNfts(
                  nfts.map((nftTmp) =>
                    nftTmp.nft.token_id === nft.token_id
                      ? { ...nftTmp, select: !nftTmp.select }
                      : nftTmp
                  )
                );
              }}
            >
              <div>
                <img src={img_url} width={76} height={107} alt={img_url} />
              </div>
              <div className="ml-2">
                <h3>{nft.metadata.title}</h3>
                <p>{nft.metadata.title}</p>
              </div>
            </div>
          ))}
      </section>
      <section>
        <PrimaryButton
          isFull
          onClick={() => {
            // TODO
          }}
        >
          Add{selectCount === 0 ? "" : ` (${selectCount})`}
        </PrimaryButton>
      </section>
    </Modal>
  );
};

export default NFTPrizeSelector;
