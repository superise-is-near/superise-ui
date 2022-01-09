import React, { FC, useState } from "react";
import { PrimaryButton } from "~components/button/Button";
import Modal from "~components/modal/modal";
import clsx from "classnames";
import { nft_tokens_for_owner_in_paras } from "~domain/paras/methods";

interface INFTPrizeSelector {
  isOpen: boolean;
}

const mockNFTs = [
  {
    id: "0",
    icon: "https://s3-alpha-sig.figma.com/img/41fb/30fa/e9ddf3daa61d44e38f5ba1b1313b50b2?Expires=1642377600&Signature=OYc2W9NbClm4sm2vy7OJwIQHP~2q4fLJbPFciXuRIxlARSglAIvWjOhOqm4SEx1jF0Oy6GcgHya1vMRYWpvxJeu-Gh2Mmwt8nkWJaeznn87hLKj1CesKq-kF65~s6kFUn2~QZn35cwzl~Kw44LsTPBDA50jZd0QM8gtEk9VyfjKUd8Il1y2Vi17FBVFPwWn97Qpm19zgP4aCrEld4LFdXaY-BlY2mGY7FW~zNFDjs-QTf5PKoSsodACVWv8R8gV-ofLWYNi0C5i~zipU2r5FNmWKgacJAixrNa3ZVqG5lHff6uHgLEEb3IIYLhMKq3hygXtwW27z9bHnORCiD2V9WA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    title: "F(r)iend #0006 #1",
    price: "30 NEAR",
    select: false,
  },
  {
    id: "1",
    icon: "https://s3-alpha-sig.figma.com/img/21e1/860a/9899c1f371cbc24e274e4ddac8853178?Expires=1642377600&Signature=ACSjddhI~Y1FMPQ0Tnoi2zkoobTuGGxAHz8PUlp4eE-rh3GJNfJhdPzjuKTIuiTtRMKpUuAws~roBhckvprOEhEvMHomfnVpaOml7vrFH3GCqpovA4dWfvwDGuG7K6hpGHylx1azg7CLrCA8xTzTqMFCMv3Uo7lesWmvWOeacp7QqWiewjz44MzC8OwMVQba-gDYlHyfo9oZVEa2dVzpXwWOHWYBA5MTqbV3zK1VUilfK6vSZ72ORP5yPjib~nsqXkmQftpY4Ru~S67Qyxhq6QmgU8y50jYABkJgd4wlJy--4Imz~7eOOfZWKTbbx9FGk346HL~72n1JwmJW3Yaw1Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    title: "Yang #27",
    price: "50 NEAR",
    select: true,
  },
  {
    id: "2",
    icon: "https://s3-alpha-sig.figma.com/img/3e11/0c4b/a1cf605cfb5f791a6335f809c1086631?Expires=1642377600&Signature=hu~dkMvBAub1c7RZmPB5ikXptCSK7qR5IXTYHFVUvUMKPIZXQdoaKbGYJhlTN4HPOByoMbD3g6j0~7WLkGVc6aCPyC2P1bKlG1EQdOPqBsX4gcO3qjeU1gLEwSd75VIXy1MvXphRbFtWlVyggBiXCxP8ZTR2YtfeIVsPvctWeeWr70KmAbOYvwvRncKSTjYnBVGsJff5KEtZ~SCPc8otjCLfl812iyE6Ljf~eJN6K2vFtBPcE3pqGH2L1SyOMe42HsKf98CUwaVZ-8knUGsQImvU4FxrOsCadsjjy-A4FS1IJKfu~X13iFcEFGN~P5bT98cHonT0icW7q5oa8nwVOg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA",
    title: "F(r)iend #0007 #1",
    price: "40 NEAR",
    select: false,
  },
];

const NFTPrizeSelector: FC<INFTPrizeSelector> = ({ isOpen }) => {
  const [nfts, setNfts] = useState(mockNFTs);

  const selectCount = nfts.filter((nft) => nft.select).length;
  return (
    <Modal isOpen={true} title="Add NFT prize">
      <section className="flex mb-3 justify-center items-center">
        <div
          className={clsx(
            "w-24 h-8 grid place-items-center rounded-lg font-bold bg-superise-gradient mr-1",
            "border-2 border-black"
          )}
        >
          Paras
        </div>
        <div
          className={clsx(
            "w-24 h-8  grid place-items-center rounded-lg font-bold bg-superise-gray"
            // "border-2 border-black"
          )}
        >
          Mintbase
        </div>
      </section>
      <section className="overflow-auto" style={{ maxHeight: "26rem" }}>
        {nfts.map(({ id, icon, title, price, select }) => (
          <div
            key={id}
            className={clsx(
              select ? "border-black" : "border-white",
              "flex mb-4 px-2 py-3 rounded-lg shadow cursor-pointer border-2"
            )}
            onClick={() =>
              setNfts(
                nfts.map((nft) => ({
                  ...nft,
                  select: nft.id === id ? !nft.select : nft.select,
                }))
              )
            }
          >
            <div>
              <img src={icon} width={76} height={107} alt={icon} />
            </div>
            <div className="ml-2">
              <h3>{title}</h3>
              <p>{price}</p>
            </div>
          </div>
        ))}
      </section>
      <section>
        <PrimaryButton isFull>
          Add{selectCount === 0 ? "" : ` (${selectCount})`}
        </PrimaryButton>
      </section>
    </Modal>
  );
};

export default NFTPrizeSelector;
