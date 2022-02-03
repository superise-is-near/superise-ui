import React from "react";
import FireFill from "~assets/fire-fill.svg";

function HottestGiveaway() {
  return (
    <section className="flex flex-col items-center homepage-container">
      <div className="w-13 h-13 mt-8">
        <img
          className="w-13 h-13"
          width="52px"
          height="52px"
          src={FireFill}
          alt="lighting"
        />
      </div>
      <h2 className="mt-4 text-4xl font-bold text-center">Hottest Giveaways</h2>
    </section>
  );
}

export default HottestGiveaway;
