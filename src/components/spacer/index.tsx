import React from "react";

const Spacer = ({ h, w }: { h?: string; w?: string }) => {
  const style = {
    ...(h && { height: h }),
    ...(w && { width: w }),
  };
  return <div style={style}></div>;
};

export default Spacer;
