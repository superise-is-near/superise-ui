import React from 'react';
import Modal from './modal';
import { PrimaryButton } from '~components/button/Button';
import { wallet } from "~domain/near/global";
import { REF_FARM_CONTRACT_ID } from "~services/near";

export default function RequestSigninModal(props: {
  title?: string;
  text?: string;
}) {
  const isSignedIn = wallet.isSignedIn();
  return (
    <Modal isOpen={!isSignedIn} title={props.title || ""}>
      <span className="inline-block mb-4 text-gray-900">{props.text}</span>
      <PrimaryButton isFull onClick={() => wallet.requestSignIn(REF_FARM_CONTRACT_ID)}>Connect to NEAR</PrimaryButton>
    </Modal>
  )
}
