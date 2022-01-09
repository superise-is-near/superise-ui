import React, { HTMLAttributes } from "react";
import ReactLoading from "react-loading";
import clsx from "classnames";

export function PrimaryButton(
  props: HTMLAttributes<HTMLButtonElement> & {
    disabled?: boolean;
    isFull?: boolean;
    loading?: boolean;
    suffixIcon?: JSX.Element;
    icon?: JSX.Element;
    type?: "button" | "submit" | "reset";
  }
) {
  const { isFull, suffixIcon, icon, loading, disabled, ...resetProps } = props;
  let classes =
    "flex items-center justify-center text-lg bg-gray-900 text-white px-5 py-2 rounded-full".split(
      " "
    );
  if (isFull) classes.push("w-full");
  if (disabled) classes.push("cursor-not-allowed");
  return (
    <button
      className={clsx(classes.join(" "), "hover:shadow")}
      {...resetProps}
      disabled={loading || disabled}
    >
      {!loading && (
        <span
          className={`${props.icon && "ml-2"} ${props.suffixIcon && "mr-2"}`}
        >
          {props.children}
        </span>
      )}
      {!loading && props.suffixIcon && props.suffixIcon}
      {loading && (
        <ReactLoading type="balls" color="white" width={30} height="auto" />
      )}
    </button>
  );
}

export function TextButton(
  props: HTMLAttributes<HTMLButtonElement> & {
    icon?: JSX.Element;
  }
) {
  return (
    <button className="flex items-center" {...props}>
      {props.icon && props.icon}
      <span className={`${props.icon && "ml-2"} text-gray-700`}>
        {props.children}
      </span>
    </button>
  );
}
