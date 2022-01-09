import { getImgUrlFromCid } from "~domain/paras/methods";

export class ParasNft implements INft {
  nft: Nft;
  img_url: string;
  constructor(nft: Nft, img_url: string) {
    this.nft = nft;
    this.img_url = img_url;
  }
  static newWithImgUrl(nft: Nft): ParasNft {
    return new ParasNft(nft, getImgUrlFromCid(nft.metadata.media));
  }

  getNft(): Nft {
    return this.nft;
  }
}
