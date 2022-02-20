import React from "react";
import Lightning from "~assets/lightning.svg";
import Clothes from "~assets/clothes.svg";
import MobileImage from "~assets/mobile.png";
import BookCheckFill from "~assets/book-check-fill.svg";
import { NavLink } from "react-router-dom";

function MiddleHero() {
  return (
    <div
      className="flex justify-center w-full"
      style={{ background: "#1E293B" }}
    >
      <section
        id="started"
        className="flex flex-col items-center homepage-container"
      >
        <div className="mt-8 w-13 h-13">
          <img
            className="w-13 h-13"
            width="52px"
            height="52px"
            src={Lightning}
            alt="lighting"
          />
        </div>
        <h2 className="mt-2 text-4xl font-bold text-center text-white sm:text-5xl">
          Supercharged & Automated Giveaways
        </h2>
        <div className="mt-6">
          <img src={MobileImage} alt="mobile image" />
        </div>
      </section>
    </div>
  );
}

export default MiddleHero;
