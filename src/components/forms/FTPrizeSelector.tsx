import React, { FC, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import SuperiseFtInput from "~components/forms/superise-ft-input";
import {
  TokenBalancesView,
  TokenMetadata,
  EMPTY_INPUT_VALUE,
} from "~domain/near/ft/models";
import { SuperiseFtInputValue } from "./superise-ft-input";
import { nanoid } from "nanoid";

interface IFTPrizeSelector {
  isOpen: boolean;
  onRequestClose: () => void;
  input: {
    value?: SuperiseFtInputValue[];
    onChange?: Function;
  };
  balances: TokenBalancesView;
  tokens: TokenMetadata[];
  ftInputValue: SuperiseFtInputValue;
  setFtInputValue: React.Dispatch<React.SetStateAction<SuperiseFtInputValue>>;
}
const FTPrizeSelector: FC<IFTPrizeSelector> = ({
  isOpen,
  onRequestClose,
  input,
  balances,
  tokens,
  ftInputValue,
  setFtInputValue,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      title={
        ftInputValue.id
          ? "Update prize"
          : `Add ${input.value.length > 0 ? "another" : "the first"} prize`
      }
    >
      <div className="mt-4 grid grid-cols-1 gap-6">
        <label className="block">
          <div className="block mt-1">
            <SuperiseFtInput
              tokens={tokens}
              balances={balances}
              value={ftInputValue}
              onChange={(value) => {
                setFtInputValue(value);
              }}
            />
          </div>
        </label>
        <div className={`grid grid-cols-${ftInputValue.id ? "2" : "1"} gap-4`}>
          {ftInputValue.id && (
            <PrimaryButton
              onClick={() => {
                let newValue = input.value.filter(
                  (item) => item.id !== ftInputValue.id
                );
                onRequestClose();
                setFtInputValue(EMPTY_INPUT_VALUE);
                input.onChange(newValue);
              }}
            >
              Delete
            </PrimaryButton>
          )}
          <PrimaryButton
            isFull
            onClick={() => {
              let newValue = [...input.value];
              if (ftInputValue.id) {
                newValue = newValue.map((item) => {
                  if (item.id !== ftInputValue.id) return item;
                  return ftInputValue;
                });
              } else {
                newValue.push({ ...ftInputValue, id: nanoid() });
              }
              onRequestClose();
              setFtInputValue(EMPTY_INPUT_VALUE);
              input.onChange(newValue);
            }}
          >
            {ftInputValue.id ? "Update" : "Add"}
          </PrimaryButton>
        </div>
      </div>
    </Modal>
  );
};

export default FTPrizeSelector;