import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import React, { HTMLAttributes, Suspense, useState } from 'react';
import {IconType, IconBase} from 'react-icons';

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

export function TextButton(props: HTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
}) {
  return (
    <button className="flex items-center">
      {props.icon && props.icon}
      <span className={`${props.icon && "ml-2"} text-gray-700`}>{props.children}</span>
    </button>
  )
}
