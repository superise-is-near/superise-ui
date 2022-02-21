import React, { useEffect } from "react";

const TwitterCard = ({ url }: { url: string }) => {
  useEffect(() => {
    if (typeof twttr !== "undefined") {
      twttr.widgets.load(document.getElementById("twitter-timeline"));
    }
  }, []);
  return (
    <div className="overflow-y-scroll h-72">
      <blockquote className="twitter-tweet">
        <a href={url} className="twitter-timeline" />
      </blockquote>
    </div>
  );
};

export default TwitterCard;
