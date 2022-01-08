import React, { Fragment } from "react";

function Card(props: { title?: String; children?: any }) {
  const { title, children, ...restProps } = props;
  return (
    <div className="bg-white rounded-lg px-4 py-5" {...restProps}>
      {title && <h2 className="text-lg font-bold">{title}</h2>}
      {children}
    </div>
  );
}

export default Card;
