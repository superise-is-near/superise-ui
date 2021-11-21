import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import React, { HTMLAttributes, useState } from 'react';

export function PrimaryButton(
  props: HTMLAttributes<HTMLButtonElement> & {
    isFull?: boolean;
  }
) {
  const { isFull } = props;
  let classes = "text-lg bg-gray-900 text-white px-5 py-2 rounded-full".split(" ");
  if (isFull) classes.push("w-full");
  return <button className={classes.join(" ")} {...props}>{props.children}</button>
}

