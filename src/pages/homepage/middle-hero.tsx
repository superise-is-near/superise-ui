import React from "react";
import Lightning from "~assets/lightning.svg";
import Clothes from "~assets/clothes.svg";
import MobileImage from "~assets/mobile.png";
import BookCheckFill from "~assets/book-check-fill.svg";

function MiddleHero() {
  return (
    <div
      className="w-full flex justify-center"
      style={{ background: "#1E293B" }}
    >
      <section className="flex flex-col items-center homepage-container">
        <div className="w-13 h-13 mt-8">
          <img
            className="w-13 h-13"
            width="52px"
            height="52px"
            src={Lightning}
            alt="lighting"
          />
        </div>
        <h2 className="mt-2 text-white text-4xl sm:text-5xl font-bold text-center">
          Supercharged & Automated Giveaways
        </h2>
        <div className="flex mt-8">
          <button
            className="flex items-center py-2 px-4 mr-9"
            style={{ background: "#3C38EB", borderRadius: "46px" }}
          >
            <div className="mr-2 w-6 h-6">
              <img
                className="w-6 h-6"
                width="24px"
                height="24px"
                src={Clothes}
                alt="clothes"
              />
            </div>
            <div className="text-white text-xs font-semibold">CREATE</div>
          </button>
          <button
            className="flex items-center py-2 px-4"
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              borderRadius: "46px",
            }}
          >
            <div className="mr-2 w-6 h-6">
              <img
                width="24px"
                height="24px"
                className="w-6 h-6"
                src={BookCheckFill}
                alt="book check fill"
              />
            </div>
            <div className="text-white text-xs font-semibold">Join</div>
          </button>
        </div>
        <div className="mt-4" style={{ width: "577px", height: "415px" }}>
          <img
            style={{ width: "577px", height: "415px" }}
            src={MobileImage}
            width="577px"
            height="415px"
            alt="mobile image"
          />
        </div>
      </section>
    </div>
  );
}

export default MiddleHero;
