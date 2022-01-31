import React, { FC } from "react";
import clsx from "classnames";

interface IWrappedIcon {
  icon: string;
  deepIcon: string;
  className?: string;
  bgLight?: boolean;
}

const WrappedIcon: FC<IWrappedIcon> = ({
  icon,
  className,
  bgLight,
  deepIcon,
}) => {
  return (
    <div
      className={clsx(
        "w-10 h-10 rounded-full grid place-items-center",
        className,
        bgLight ? "bg-indigo-100" : "bg-indigo-600"
      )}
    >
      <img
        src={bgLight ? deepIcon : icon}
        width="24px"
        height="24px"
        alt={icon}
      />
    </div>
  );
};

export default WrappedIcon;
