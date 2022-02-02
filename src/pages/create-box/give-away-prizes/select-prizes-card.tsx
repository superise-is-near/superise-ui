import React, { FC } from "react";
import AddIcon from "~assets/add.svg";

import MinusIcon from "~assets/minus.svg";
import { PrimaryButton } from "~components/button/Button";
import { ParasNft } from "~domain/paras/models";
import clsx from "classnames";
import { TokenMetadataWithAmount } from "~domain/near/ft/models";

interface INFTsDisplay {
  nfts: ParasNft[];
  setNfts: React.Dispatch<React.SetStateAction<ParasNft[]>>;
}

interface ICryptosDisplay {
  cryptos: TokenMetadataWithAmount[];
  setCryptos: React.Dispatch<React.SetStateAction<TokenMetadataWithAmount[]>>;
}

interface ISelectPrizesCard extends INFTsDisplay, ICryptosDisplay {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  onClickAddNFT: () => void;
  onClickAddCrypto: () => void;
}

interface IAddNFTOrCryptoCard {
  hasSelected?: boolean;
  onClickAddNFT: () => void;
  onClickAddCrypto: () => void;
}

const AssetsDisplay: FC<INFTsDisplay & ICryptosDisplay> = ({
  nfts,
  setNfts,
  cryptos,
  setCryptos,
}) => {
  const assetsCombine = [
    ...nfts.map((nft) => ({
      type: "nft",
      id: nft.nft.token.token_id,
      icon: nft.img_url,
      title: nft.nft.token.metadata.title,
    })),
    ...cryptos.map((crypto) => ({
      type: "crypto",
      id: crypto.id,
      icon: crypto.icon,
      title: `${crypto.amount} ${crypto.symbol}`,
    })),
  ];
  return (
    <section>
      {assetsCombine.map((asset, index) => (
        <div
          key={asset.id}
          className={clsx(
            "p-4 flex justify-between border border-gray-300",
            index === 0 && "rounded-t-2xl",
            index === assetsCombine.length - 1 && "rounded-b-2xl mb-4",
            index !== 0 && "border-t-0"
          )}
        >
          <div className="flex items-center">
            <div
              className={clsx(
                "w-12 h-12 mr-4 overflow-hidden",
                asset.type === "nft" ? "rounded-lg" : "rounded-full"
              )}
            >
              <img
                className="object-cover w-12 h-12"
                src={asset.icon}
                width="48px"
                height="48px"
                alt={asset.icon}
              />
            </div>
            <div className="text-gray-600">{asset.title}</div>
          </div>
          <div className="grid place-items-center">
            <img
              className="cursor-pointer"
              src={MinusIcon}
              width="24px"
              height="24px"
              alt="remove"
              onClick={() => {
                if (asset.type === "nft") {
                  setNfts(
                    nfts.filter((_nft) => asset.id !== _nft.nft.token.token_id)
                  );
                } else {
                  setCryptos(
                    cryptos.filter((_crypto) => asset.id !== _crypto.id)
                  );
                }
              }}
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
  setProgress,
  cryptos,
  setCryptos,
  nfts,
  setNfts,
  onClickAddNFT,
  onClickAddCrypto,
}) => {
  const hasSelected = nfts.length > 0 || cryptos.length > 0;
  return (
    <div className="w-full mt-2">
      {hasSelected && (
        <AssetsDisplay
          nfts={nfts}
          setNfts={setNfts}
          cryptos={cryptos}
          setCryptos={setCryptos}
        />
      )}
      <AddNFTOrCryptoCard
        hasSelected={hasSelected}
        onClickAddNFT={onClickAddNFT}
        onClickAddCrypto={onClickAddCrypto}
      />
      <PrimaryButton
        size="large"
        className="my-6"
        disabled={!hasSelected}
        onClick={() => setProgress(1)}
      >
        Continue
      </PrimaryButton>
    </div>
  );
};

export default SelectPrizesCard;
