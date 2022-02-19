import React, { FC } from "react";
import { PrimaryButton } from "~components/button/Button";
import IndigoClothes from "~assets/indigo-clothes.svg";
import IndigoClock from "~assets/indigo-clock.svg";
import { NavLink } from "react-router-dom";
import BoxDefaultImage from "~assets/box-default-image.png";

interface IGiveAwayCard {
  image: string;
  title: string;
  prizeType: string;
  requirements: string;
  endTime: string;
  detailLink: string;
}
const GiveawayCard: FC<IGiveAwayCard> = ({
  image,
  title,
  prizeType,
  requirements,
  endTime,
  detailLink,
}) => {
  return (
    <section className="relative">
      <div className="absolute top-0 w-25 h-25 left-6 rounded-xl overflow-hidden">
        <img
          className="w-25 h-25"
          src={image || BoxDefaultImage}
          alt={image || title}
          width="100px"
          height="100px"
        />
      </div>
      <div
        className="bg-white px-4 pb-4 rounded-2xl border-gray-300 border"
        style={{ marginTop: "50px", paddingTop: "50px" }}
      >
        <div className="mt-8 flex">
          <div className="w-6 h-6 mr-4">
            <img
              style={{ width: "24px", height: "24px" }}
              className="w-6 h-6"
              src={IndigoClothes}
              alt="clothes"
              width="100px"
              height="100px"
            />
          </div>
          <div>
            <h5>{title || "Giveaway box"}</h5>
            <p className="mt-1 text-sm text-gray-400">{prizeType}</p>
          </div>
        </div>

        <div className="mt-4 flex">
          <div className="w-6 h-6 mr-4">
            <img
              style={{ width: "24px", height: "24px" }}
              className="w-6 h-6"
              src={IndigoClock}
              alt="clock"
              width="100px"
              height="100px"
            />
          </div>
          <div>
            <h5>{requirements || "No requirements"}</h5>
            <p className="mt-1 text-sm text-gray-400">Ends on {endTime}</p>
          </div>
        </div>
        <NavLink to={detailLink}>
          <PrimaryButton className="mt-6" size="large" isFull>
            View Giveaway
          </PrimaryButton>
        </NavLink>
      </div>
    </section>
  );
};

export default GiveawayCard;
