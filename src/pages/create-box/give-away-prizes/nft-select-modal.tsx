import React, { FC } from "react";
import clsx from "classnames";
import CheckFillIcon from "~/assets/check-fill.svg";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";

interface INFTSelectModal {
  showNFTSelectModal: boolean;
  setShowNFTSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const NFTSelectModal: FC<INFTSelectModal> = ({
  showNFTSelectModal,
  setShowNFTSelectModal,
}) => {
  return (
    <Modal
      isOpen={showNFTSelectModal}
      onRequestClose={() => setShowNFTSelectModal(false)}
    >
      <h3 className="text-2xl font-semibold text-center mt-2">
        Select NFT Prize
      </h3>
      <div className="flex justify-center mb-8">
        <div className="mt-6 flex justify-center p-1 rounded-full bg-gray-200">
          <div
            className={clsx(
              "w-24 h-7 rounded-full grid place-items-center text-sm text-gray-700 font-semibold cursor-pointer",
              false && "bg-white"
            )}
          >
            PARAS
          </div>
          <div
            className={clsx(
              "w-24 h-7 rounded-full grid place-items-center text-sm text-gray-700 font-semibold cursor-pointer",
              "bg-white"
            )}
          >
            MINTBASE
          </div>
        </div>
      </div>
      <div className="overflow-auto mb-4" style={{ height: "40vh" }}>
        {new Array(4).fill(0).map((_, index) => (
          <div key={index} className="flex justify-between mb-4">
            <div className="flex">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img
                  className="w-12 h-12 object-cover"
                  src="https://s3-alpha-sig.figma.com/img/41fb/30fa/e9ddf3daa61d44e38f5ba1b1313b50b2?Expires=1644796800&Signature=QIvNavYfxdF2mansvI9qVXYvtEZzB-WSXIA78a2iTEychJfUC3oTuXM~0yeVPsLSVTwye3dmQaKldHAKK2b7nxfwvbPiTDkzoz-Y6R6G1310bqlo2MInK44~jl4XaZZtxLfY5DijRp6qH635A1VWEh816E0RdRRG6NBbZ4dsA4~MNB9E7k12K9Dhz5AvYWOxZ9~NOwIxnFwcwG08Px1FnqOFGV3hZebmROx5yHB36iqM8Q8ERw9V9VQAIIMf9BuqWFgMNwMb70MuizdDBb6x3uG~AyNviC2thvhIpMVKZvknS7vtbBZ85T8QoWzqIyUUNsoEzMA0ajWLeK9SXVZmHQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                  width="48px"
                  height="48px"
                  alt="nft"
                />
              </div>
              <div className="flex items-center ml-4 text-gray-600">
                CryptoCuy #4562
              </div>
            </div>
            <div className="grid place-items-center">
              <img
                src={CheckFillIcon}
                width="24px"
                height="24px"
                alt="checkfill"
              />
            </div>
          </div>
        ))}
      </div>
      <PrimaryButton isFull className="py-3">
        Add 4 NFT
      </PrimaryButton>
    </Modal>
  );
};

export default NFTSelectModal;
