import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import React, { HTMLAttributes, Suspense, useState } from 'react';
import {IconType, IconBase} from 'react-icons';

export function PrimaryButton(
  props: HTMLAttributes<HTMLButtonElement> & {
    isFull?: boolean;
    suffixIcon?: JSX.Element;
    icon?: JSX.Element;
  }
) {
  const { isFull, suffixIcon, icon, ...resetProps } = props;
  let classes = "flex items-center justify-center text-lg bg-gray-900 text-white px-5 py-2 rounded-full".split(" ");
  if (isFull) classes.push("w-full");
  return <button className={classes.join(" ")} {...resetProps}>
      <span className={`${props.icon && "ml-2"} ${props.suffixIcon && "mr-2"}`}>{props.children}</span>
      {props.suffixIcon && props.suffixIcon}
    </button>
}

export function TextButton(props: HTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
}) {
  return (
    <button className="flex items-center" {...props}>
      {props.icon && props.icon}
      <span className={`${props.icon && "ml-2"} text-gray-700`}>{props.children}</span>
    </button>
  )
}
