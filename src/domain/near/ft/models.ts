export interface TokenMetadata {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  icon: string;
  ref?: number;
  near?: number;
  total?: number;
}
export interface TokenMetadataWithAmount extends TokenMetadata {
  amount: number;
}

export const nearMetadata: TokenMetadata = {
  id: "NEAR",
  name: "NEAR",
  symbol: "NEAR",
  decimals: 24,
  icon: "https://near.org/wp-content/themes/near-19/assets/img/brand-icon.png",
};

export interface FtAssets {
  [tokenId: string]: string;
}

// need to extract to const folder
export const EMPTY_INPUT_VALUE = { amount: "", token: nearMetadata };
