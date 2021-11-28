import React from 'react';

export const Flex = ({inline, column, children, className}: {
  inline: Boolean;
  column: Boolean;
  children: Element[];
  className: string;
}) => {
  const classNames = [
    ...(inline ? ["inline-flex"] : ["flex"]),
    ...(column ? ['flex-col'] : ['flex-row']),
  ];
  return (<div className={`${classNames.join(" ")} ${className}`}>
    {children}
    </div>)
}
