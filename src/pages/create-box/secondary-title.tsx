import React, { FC } from "react";
import WrappedIcon from "~components/wrapped-icon";
import clsx from "classnames";

interface ISecondaryTitle {
  icon: string;
  deepIcon: string;
  children: string;
  className: string;
  select?: boolean;
}
const SecondaryTitle: FC<ISecondaryTitle> = ({
  icon,
  deepIcon,
  children,
  className,
  select,
}) => {
  return (
    <div className={clsx("secondary-title flex items-center", className)}>
      <WrappedIcon
        bgLight={!select}
        className="mr-4"
        icon={icon}
        deepIcon={deepIcon}
      />
      <h2 className="text-base font-semibold text-gray-700">{children}</h2>
    </div>
  );
};

export default SecondaryTitle;
