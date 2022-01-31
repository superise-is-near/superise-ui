import React, { FC } from "react";
import clsx from "classnames";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import NEARTokenIcon from "~/assets/near-token.svg";

interface ICryptoSelectModal {
  showCryptoSelectModal: boolean;
  setShowCryptoSelectModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CryptoSelectModal: FC<ICryptoSelectModal> = ({
  showCryptoSelectModal,
  setShowCryptoSelectModal,
}) => {
  return (
    <Modal
      isOpen={showCryptoSelectModal}
      onRequestClose={() => setShowCryptoSelectModal(false)}
    >
      <h3 className="text-2xl font-semibold text-center mt-2">
        Select Crypto Prize
      </h3>
      <div className="flex justify-center mb-2">
        <div className="mt-6 flex justify-center p-1 rounded-full bg-gray-200">
          <div
            className={clsx(
              "w-24 h-7 rounded-full grid place-items-center text-sm text-gray-700 font-semibold cursor-pointer",
              false && "bg-white"
            )}
          >
            OCTA
          </div>
          <div
            className={clsx(
              "w-24 h-7 rounded-full grid place-items-center text-sm text-gray-700 font-semibold cursor-pointer",
              "bg-white"
            )}
          >
            NEAR
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-400 text-center mb-6">
        Available: 1205.067 NEAR
      </p>
      <div className="mb-8 border rounded-2xl border-gray-300 p-4 flex justify-between focus-within:border-indigo-600">
        <input
          type="text"
          className="border-0 p-0 m-0"
          placeholder="Amount of NEAR"
        />
        <div>
          <img src={NEARTokenIcon} width="25px" height="25px" alt="NEAR" />
        </div>
      </div>
      <PrimaryButton isFull className="py-3">
        Add Crypto
      </PrimaryButton>
    </Modal>
  );
};

export default CryptoSelectModal;
