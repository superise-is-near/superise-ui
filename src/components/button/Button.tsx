import React, { HTMLAttributes } from "react";
import ReactLoading from "react-loading";
import clsx from "classnames";

export function PrimaryButton(
  props: HTMLAttributes<HTMLButtonElement> & {
    disabled?: boolean;
    isFull?: boolean;
    loading?: boolean;
    prefixIcon?: JSX.Element;
    suffixIcon?: JSX.Element;
    icon?: JSX.Element;
    type?: "button" | "submit" | "reset";
    color?: string;
    size?: "small" | "normal" | "large";
  }
) {
  const {
    isFull,
    prefixIcon,
    suffixIcon,
    icon,
    loading,
    disabled,
    className,
    color,
    size = "normal",
    ...resetProps
  } = props;
  return (
    <button
      className={clsx(
        "flex items-center justify-center text-white rounded-2xl font-bold drop-shadow transition-all",
        size === "normal" && "px-5 py-2 text-sm",
        size === "large" && "p-3",
        isFull && "w-full",
        disabled
          ? "cursor-not-allowed bg-indigo-100"
          : "bg-indigo-600 hover:shadow",
        className
      )}
      {...resetProps}
      disabled={loading || disabled}
      style={{ backgroundColor: color }}
    >
      {!loading && prefixIcon && <span className="mr-1">{prefixIcon}</span>}
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
