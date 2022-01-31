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
  onRequestConfirm: (nfts: any) => void;
}

const NFTPrizeSelector: FC<INFTPrizeSelector> = ({
  isOpen,
  onRequestClose,
  onRequestConfirm,
}) => {
  const [nfts, setNfts] = useState<
    {
      parasNft: ParasNft;
      select: boolean;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selectDataSource, setSelectDataSource] = useState<
    "Paras" | "Mintbase"
  >("Paras");
  useEffect(() => {
    setLoading(true);
    if (selectDataSource === "Paras") {
      nft_tokens_for_owner_in_paras(wallet.getAccountId(), 100).then(
        (data: ParasNft[]) => {
          setNfts(data.map((parasNft) => ({ parasNft, select: false })));
          setLoading(false);
        }
      );
    }
    if (selectDataSource === "Mintbase") {
      // TODO support
      setLoading(false);
    }
  }, [selectDataSource]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title="Add NFT prize"
    >
      <section className="flex mb-3 justify-center items-center">
        <div
          className={clsx(
            "w-24 h-8 grid place-items-center cursor-pointer rounded-lg font-bold mr-1",
            selectDataSource === "Paras"
              ? "border-2 border-black bg-superise-gradient"
              : "bg-superise-gray"
          )}
          onClick={() => setSelectDataSource("Paras")}
        >
          Paras
        </div>
        <div
          className={clsx(
            "w-24 h-8  grid place-items-center cursor-pointer rounded-lg font-bold",
            selectDataSource === "Mintbase"
              ? "border-2 border-black bg-superise-gradient"
              : " bg-superise-gray"
          )}
          onClick={() => setSelectDataSource("Mintbase")}
        >
          Mintbase
        </div>
      </section>
      {loading && (
        <section
          className="overflow-hidden"
          style={{ maxHeight: "50vh", height: "50vh" }}
        >
          {new Array(3).fill(0).map((_, index) => (
            <div
              className="w-full h-32 mx-2 bg-gray-100 mb-4 rounded-lg"
              key={index}
            />
          ))}
        </section>
      )}
      {selectDataSource === "Mintbase" && (
        <div
          className="grid place-items-center text-gray-500"
          style={{ maxHeight: "50vh", height: "50vh" }}
        >
          We will support Mintbase later.
        </div>
      )}
      {selectDataSource === "Paras" && (
        <>
          {!loading && nfts.length === 0 && (
            <div
              className="grid place-items-center text-gray-500"
              style={{ maxHeight: "50vh", height: "50vh" }}
            >
              You don’t have NFT in Paras, check other markeplace or go back.
            </div>
          )}
          {!loading && nfts.length > 0 && (
            <section
              className="overflow-auto "
              style={{ maxHeight: "50vh", height: "50vh" }}
            >
              {nfts.map(({ parasNft, select }) => (
                <div
                  key={parasNft.nft.token.token_id}
                  className={clsx(
                    select ? "border-black" : "border-white",
                    "flex mb-4 px-2 py-3 rounded-lg shadow cursor-pointer border-2"
                  )}
                  onClick={() => {
                    setNfts(
                      nfts.map((nftTmp) =>
                        nftTmp.parasNft.nft.token.token_id ===
                        parasNft.nft.token.token_id
                          ? { ...nftTmp, select: !nftTmp.select }
                          : nftTmp
                      )
                    );
                  }}
                >
                  <div className="overflow-hidden h-12 w-12">
                    <img
                      src={parasNft.img_url}
                      width="512px"
                      height="512px"
                      alt={parasNft.img_url}
                    />
                  </div>
                  <div className="ml-2">
                    <h3 className="font-bold">
                      {parasNft.nft.token.metadata.title}
                    </h3>
                    <p>{parasNft.nft.token.metadata.description}</p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
      <section>
        <PrimaryButton
          isFull
          onClick={() =>
            onRequestConfirm(
              nfts.filter((nft) => nft.select).map((nft) => nft.parasNft)
            )
          }
        >
          Add
          {nfts.filter((nft) => nft.select).length === 0
            ? ""
            : ` (${nfts.filter((nft) => nft.select).length})`}
        </PrimaryButton>
      </section>
    </Modal>
  );
};

export default NFTPrizeSelector;
