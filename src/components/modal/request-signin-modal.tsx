import React from "react";
import Modal from "./modal";
import ReactModal from "react-modal";
import { PrimaryButton } from "~components/button/Button";
import { wallet } from "~domain/near/global";
import { REF_FARM_CONTRACT_ID } from "~services/near";
import getConfig from "~domain/near/config";

export default function RequestSigninModal(props: {
  title?: string;
  text?: string;
  isOpen?: boolean;
  onRequestClose?: any;
}) {
  return (
    <Modal
      isOpen={props.isOpen}
      title={props.title || ""}
      onRequestClose={props.onRequestClose}
    >
      <span className="inline-block mb-4 text-gray-900">{props.text}</span>
      <PrimaryButton
        isFull
        onClick={() => wallet.requestSignIn(getConfig().SUPERISE_CONTRACT_ID)}
      >
        Connect to NEAR
      </PrimaryButton>
    </Modal>
  );
}
