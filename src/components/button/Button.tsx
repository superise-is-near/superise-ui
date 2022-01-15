import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";
import React, { HTMLAttributes, Suspense, useState } from 'react';
import {IconType, IconBase} from 'react-icons';

export function PrimaryButton(
  props: HTMLAttributes<HTMLButtonElement> & {
    isFull?: boolean;
    suffixIcon?: JSX.Element;
    icon?: JSX.Element;
    color?: string;
    size?: string;
  }
) {
  const { isFull, size } = props;
  let classes = "flex items-center justify-center text-base font-bold bg-gray-900 text-white px-5 py-2 rounded-full".split(" ");
  if (isFull) classes.push("w-full");
  if (size === 'small') {
    classes = classes.filter(c => ['text-base', 'py-2', 'px-5'].indexOf(c) === -1);
    classes = classes.concat(['py-1', 'px-4', 'text-sm']);
  }
  return <button className={classes.join(" ")} {...props} style={{ backgroundColor: props.color }}>
    <span className={`${props.icon && "ml-2"} ${props.suffixIcon && "mr-2"}`}>{props.children}</span>
      {props.suffixIcon && props.suffixIcon}
    </button>
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
