import React, { FC } from "react";
import AddIcon from "~assets/add.svg";

import MinusIcon from "~assets/minus.svg";
import { PrimaryButton } from "~components/button/Button";
import { ParasNft } from "~domain/paras/models";
import clsx from "classnames";

interface INFTsDisplay {
  showNfts: ParasNft[];
  setShowNfts: React.Dispatch<React.SetStateAction<ParasNft[]>>;
}
interface ISelectPrizesCard extends INFTsDisplay {
  onClickAddNFT: () => void;
  onClickAddCrypto: () => void;
}

interface IAddNFTOrCryptoCard {
  hasSelected?: boolean;
  onClickAddNFT: () => void;
  onClickAddCrypto: () => void;
}

const NFTsDisplay: FC<INFTsDisplay> = ({ showNfts, setShowNfts }) => {
  return (
    <section>
      {showNfts.map((nft, index) => (
        <div
          key={nft.nft.token.token_id}
          className={clsx(
            "p-4 flex justify-between border border-gray-300",
            index === 0 && "rounded-t-2xl",
            index === showNfts.length - 1 && "rounded-b-2xl mb-4",
            index !== 0 && "border-t-0"
          )}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 mr-4 overflow-hidden rounded-lg">
              <img
                className="object-cover w-12 h-12"
                src={nft.img_url}
                width="48px"
                height="48px"
                alt={nft.img_url}
              />
            </div>
            <div className="text-gray-600">{nft.nft.token.metadata.title}</div>
          </div>
          <div className="grid place-items-center">
            <img
              className="cursor-pointer"
              src={MinusIcon}
              width="24px"
              height="24px"
              alt="remove"
              onClick={() =>
                setShowNfts(
                  showNfts.filter(
                    (_nft) => nft.nft.token.token_id !== _nft.nft.token.token_id
                  )
                )
              }
              tabIndex={-1}
              role="button"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

const AddNFTOrCryptoCard: FC<IAddNFTOrCryptoCard> = ({
  hasSelected,
  onClickAddNFT,
  onClickAddCrypto,
}) => {
  return (
    <>
      <div className="p-4 flex justify-between border border-gray-300 rounded-t-2xl">
        <div>
          <div>{hasSelected && "Add another "}NFT</div>
          <div className="mt-1 text-sm text-gray-400">Paras or Mintbase</div>
        </div>
        <div className="grid place-items-center">
          <img
            className="cursor-pointer"
            src={AddIcon}
            width="24px"
            height="24px"
            alt="add"
            onClick={onClickAddNFT}
            tabIndex={-1}
            role="button"
          />
        </div>
      </div>
      <div className="p-4 flex justify-between border border-t-0 border-gray-300 rounded-b-2xl">
        <div>
          <div>{hasSelected && "Add more "}Crypto</div>
          <div className="mt-1 text-sm text-gray-400">NEAR or OCTA</div>
        </div>
        <div className="grid place-items-center">
          <img
            className="cursor-pointer"
            src={AddIcon}
            width="24px"
            height="24px"
            alt="add"
            onClick={onClickAddCrypto}
            tabIndex={-1}
            role="button"
          />
        </div>
      </div>
    </>
  );
};

const SelectPrizesCard: FC<ISelectPrizesCard> = ({
  showNfts,
  setShowNfts,
  onClickAddNFT,
  onClickAddCrypto,
}) => {
  const hasSelected = showNfts.length > 0;
  return (
    <div className="w-full mt-2">
      {hasSelected && (
        <NFTsDisplay showNfts={showNfts} setShowNfts={setShowNfts} />
      )}
      <AddNFTOrCryptoCard
        hasSelected={hasSelected}
        onClickAddNFT={onClickAddNFT}
        onClickAddCrypto={onClickAddCrypto}
      />
      <PrimaryButton
        size="large"
        className="my-6"
        disabled={showNfts.length === 0}
      >
        Continue
      </PrimaryButton>
    </div>
  );
};

export default SelectPrizesCard;
