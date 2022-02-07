import React, { FC, useEffect, useState } from "react";
import { nft_tokens_for_owner_in_paras } from "~domain/paras/methods";
import { ParasNft } from "~domain/paras/models";
import { wallet } from "~services/near";
import clsx from "classnames";
import CheckFillIcon from "~/assets/check-fill.svg";
import CheckNFillIcon from "~/assets/check-nfill.svg";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import AddIcon from "~assets/add-white.svg";

interface INFTSelectModal {
  nfts: ParasNft[];
  setNfts: React.Dispatch<React.SetStateAction<ParasNft[]>>;
  showNFTSelectModal: boolean;
  setShowNFTSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IParasNFTsDisplay {
  loading: boolean;
  parasNfts: ParasNft[];
  setNfts: React.Dispatch<React.SetStateAction<ParasNft[]>>;
  selectNftsIndex: boolean[];
  setSelectNftsIndex: React.Dispatch<React.SetStateAction<boolean[]>>;
  setShowNFTSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MintbaseNFTsDisplay = () => {
  return (
    <section>
      <div
        className="mb-4 overflow-auto font-semibold text-gray-700 grid place-items-center"
        style={{ height: "40vh" }}
      >
        We will support Mintbase later.
      </div>
      <PrimaryButton
        prefixIcon={
          <img
            src={AddIcon}
            className="w-6 h-6 mr-1"
            width="24px"
            height="24px"
            alt="hor image"
          />
        }
        isFull
        disabled
        className="py-3"
      >
        Add NFT
      </PrimaryButton>
    </section>
  );
};

const ParasNFTsDisplay: FC<IParasNFTsDisplay> = ({
  parasNfts,
  setNfts,
  selectNftsIndex,
  setSelectNftsIndex,
  loading,
  setShowNFTSelectModal,
}) => {
  const selectNftsCount = selectNftsIndex.filter(Boolean).length;
  return (
    <section>
      <div
        className={clsx("mb-4", loading ? "overflow-hidden" : "overflow-auto")}
        style={{ height: "40vh" }}
      >
        {loading &&
          new Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex mb-4 bg-gray-100 rounded-lg"
                style={{ height: "48px" }}
              ></div>
            ))}
        {!loading &&
          parasNfts.map((nft, index) => (
            <div
              key={nft.nft.token.token_id}
              className="flex justify-between mb-4"
            >
              <div className="flex">
                <div className="w-12 h-12 overflow-hidden rounded-lg">
                  <img
                    className="object-cover w-12 h-12"
                    src={nft.img_url}
                    width="48px"
                    height="48px"
                    alt="nft"
                  />
                </div>
                <div className="flex items-center ml-4 text-gray-600">
                  {nft.nft.token.metadata.title}
                </div>
              </div>
              <div className="grid place-items-center">
                <img
                  src={selectNftsIndex[index] ? CheckFillIcon : CheckNFillIcon}
                  width="24px"
                  height="24px"
                  alt="check image"
                  onClick={() =>
                    setSelectNftsIndex(
                      selectNftsIndex.map((nftIndex, _index) =>
                        index === _index ? !nftIndex : nftIndex
                      )
                    )
                  }
                  role="button"
                />
              </div>
            </div>
          ))}
        {!loading && parasNfts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <span className="text-sm text-gray-600">
              No NFTs found in your wallet.
            </span>
            <span className="text-sm text-gray-600">
              Please add some through this link:{" "}
              <a
                href="https://testnet.paras.id"
                className="underline"
                target="_blank"
              >
                {" "}
                https://testnet.paras.id
              </a>
            </span>
          </div>
        )}
      </div>
      <PrimaryButton
        disabled={!loading && parasNfts.length === 0}
        isFull
        className="py-3"
        prefixIcon={
          <img
            src={AddIcon}
            className="w-6 h-6 mr-1"
            width="24px"
            height="24px"
            alt="hor image"
          />
        }
        onClick={() => {
          setNfts(parasNfts.filter((_, index) => selectNftsIndex[index]));
          setShowNFTSelectModal(false);
        }}
      >
        Add {!!selectNftsCount ? selectNftsCount : ""} NFT
      </PrimaryButton>
    </section>
  );
};

const NFTSelectModal: FC<INFTSelectModal> = ({
  nfts,
  setNfts,
  showNFTSelectModal,
  setShowNFTSelectModal,
}) => {
  const [dataSource, setDataSource] = useState<"PARAS" | "MINTBASE">("PARAS");
  const [parasNfts, setParasNfts] = useState<ParasNft[]>([]);
  const [selectParasNftsIndex, setParasSelectNftsIndex] = useState<boolean[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setParasNfts([]);
    setParasSelectNftsIndex([]);
    if (dataSource === "PARAS") {
      nft_tokens_for_owner_in_paras(wallet.getAccountId(), 100).then(
        (_nfts) => {
          setParasNfts(_nfts);
          setParasSelectNftsIndex(
            _nfts.map(
              (_nft) =>
                !!nfts.find(
                  (nft) => nft.nft.token.token_id === _nft.nft.token.token_id
                )
            )
          );
          setLoading(false);
        }
      );
    }
  }, [dataSource]);

  return (
    <Modal
      isOpen={showNFTSelectModal}
      onRequestClose={() => setShowNFTSelectModal(false)}
    >
      <h3 className="mt-2 text-2xl font-semibold text-center">
        Select NFT Prize
      </h3>
      <div className="flex justify-center mb-8">
        <div className="flex justify-center p-1 mt-6 bg-gray-200 rounded-full">
          <div
            className={clsx(
              "w-24 h-7 rounded-full grid place-items-center text-sm text-gray-700 font-semibold cursor-pointer",
              dataSource === "PARAS" && "bg-white"
            )}
            onClick={() => setDataSource("PARAS")}
          >
            PARAS
          </div>
          <div
            className={clsx(
              "w-24 h-7 rounded-full grid place-items-center text-sm text-gray-700 font-semibold cursor-pointer",
              dataSource === "MINTBASE" && "bg-white"
            )}
            onClick={() => setDataSource("MINTBASE")}
          >
            MINTBASE
          </div>
        </div>
      </div>
      {dataSource === "PARAS" && (
        <ParasNFTsDisplay
          loading={loading}
          parasNfts={parasNfts}
          selectNftsIndex={selectParasNftsIndex}
          setSelectNftsIndex={setParasSelectNftsIndex}
          setNfts={setNfts}
          setShowNFTSelectModal={setShowNFTSelectModal}
        />
      )}
      {dataSource === "MINTBASE" && <MintbaseNFTsDisplay />}
    </Modal>
  );
};

export default NFTSelectModal;
