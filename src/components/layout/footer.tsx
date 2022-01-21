import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

export default () => {
  return (
    <div className="mt-6 text-gray-500 grid grid-cols-2">
      <span style={{ fontFamily: "Racing Sans One" }}>Surprise</span>
      <div className="flex flex-col items-end">
        <div className="grid grid-col-1 gap-2">
          <a
            href="https://sixth-motion-b7e.notion.site/Surprise-Roadmap-813c17e1bd994f5c811eb5d5d076f00f"
            className="text-sm font-semibold underline"
            target="_blank"
          >
            Roadmap <FiArrowUpRight style={{ display: "inline-block" }} />
          </a>
          <a href="https://twitter.com/usesurprise" target="_blank">
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};
