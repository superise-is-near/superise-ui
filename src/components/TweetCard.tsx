import React from "react";

const TwitterCard = ({ url }: { url: string }) => {
  return (
    <div className="overflow-hidden max-h-72 h-72">
      <div className="">
        <blockquote className="twitter-tweet ">
          <a href={url}></a>
        </blockquote>
      </div>
    </div>
  );
};

export default TwitterCard;
