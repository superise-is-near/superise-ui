import React, { FC } from "react";
import clsx from "classnames";

interface IVerticalLine {
  className: string;
  bgLight?: boolean;
}

const VerticalLine: FC<IVerticalLine> = ({ className, bgLight }) => {
  return (
    <div className={clsx("w-10 pt-2 grid place-items-center", className)}>
      <div
        className={clsx(
          "h-full w-0.5 rounded-full",
          bgLight ? "bg-indigo-100" : "bg-indigo-600"
        )}
      />
    </div>
  );
};

export default VerticalLine;
