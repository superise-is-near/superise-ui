import { getImgUrlFromCid } from "~domain/paras/methods";
import { INft, Nft, TokenTypeOfNep177 } from "~domain/near/nft/models";

export class ParasNft implements INft {
  nft: Nft;
  img_url: string;
  constructor(nft: Nft, img_url: string) {
    this.nft = nft;
    this.img_url = img_url;
  }
  static newWithImgUrl(
    token: TokenTypeOfNep177,
    contract_id: string
  ): ParasNft {
    return new ParasNft(
      { token, contract_id },
      getImgUrlFromCid(token.metadata.media)
    );
  }

  getNft(): Nft {
    return this.nft;
  }
}
