export type TokenMetadataOfNep177 = {
  title: string | null; // ex. "Arch Nemesis: Mail Carrier" or "Parcel #5055"
  description: string | null; // free-form description
  media: string | null; // URL to associated media, preferably to decentralized, content-addressed storage
  media_hash: string | null; // Base64-encoded sha256 hash of content referenced by the `media` field. Required if `media` is included.
  copies: number | null; // number of copies of this set of metadata in existence when token was minted.
  issued_at: number | null; // When token was issued or minted, Unix epoch in milliseconds
  expires_at: number | null; // When token expires, Unix epoch in milliseconds
  starts_at: number | null; // When token starts being valid, Unix epoch in milliseconds
  updated_at: number | null; // When token was last updated, Unix epoch in milliseconds
  extra: string | null; // anything extra the NFT wants to store on-chain. Can be stringified JSON.
  reference: string | null; // URL to an off-chain JSON file with more info.
  reference_hash: string | null; // Base64-encoded sha256 hash of JSON from reference field. Required if `reference` is included.
};

//https://nomicon.io/Standards/NonFungibleToken/Metadata.html
export interface TokenTypeOfNep177 {
  token_id: string;
  owner_id: string;
  metadata: TokenMetadataOfNep177 | undefined;
  approved_account_ids: ApprovedAccountIds | undefined;
}

export interface Nft {
  token: TokenTypeOfNep177;
  contract_id: string;
}

export interface INft {
  getNft(): Nft;
}

export interface ApprovedAccountIds {
  [tokenId: string]: string;
}
