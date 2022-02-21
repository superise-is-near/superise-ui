export default function getConfig(env: string = process.env.NEAR_ENV) {
  switch (env) {
    case "production":
    case "mainnet":
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
        indexerUrl: "https://indexer.ref-finance.net",
        sodakiApiUrl: "https://sodaki.com/api",
        PARAS_NFT_CONTRACT_ID:
          process.env.PARAS_NFT_CONTRACT_ID || "x.paras.near",
        REF_FI_CONTRACT_ID:
          process.env.REF_FI_CONTRACT_ID || "v2.ref-finance.near",
        WRAP_NEAR_CONTRACT_ID: process.env.WRAP_NEAR_CONTRACT_ID || "wrap.near",
        REF_ADBOARD_CONTRACT_ID: "ref-adboard.near",
        REF_FARM_CONTRACT_ID:
          process.env.REF_FARM_CONTRACT_ID || "v2.ref-farming.near",
        REF_TOKEN_ID: "token.ref-finance.near",
        REF_AIRDROP_CONTRACT_ID: "s01.ref-airdrop.near",
        POOL_TOKEN_REFRESH_INTERVAL:
          process.env.POOL_TOKEN_REFRESH_INTERVAL || 10,
        MULTI_MINING_POOLS: [79, 377, 2, 4],
      };
    case "development":
    case "testnet":
      return {
        networkId: "testnet",
        nodeUrl: "https://rpc.testnet.near.org", //https://public-rpc.blockpi.io/http/near-testnet
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        explorerUrl: "https://explorer.testnet.near.org",
        indexerUrl: "https://testnet-indexer.ref-finance.com",
        sodakiApiUrl: "https://sodaki.com/api",
        parasApiHttpUrl: "https://mainnet-api.paras.id/tokens",
        SUPERISE_CONTRACT_ID:
          process.env.SUPERISE_CONTRACT_ID || "prizepool.superise.testnet",
        PARAS_NFT_CONTRACT_ID:
          process.env.PARAS_NFT_CONTRACT_ID || "paras-token-v2.testnet",
        REF_FI_CONTRACT_ID:
          process.env.REF_FI_CONTRACT_ID || "ref-finance-101.testnet",
        WRAP_NEAR_CONTRACT_ID:
          process.env.WRAP_NEAR_CONTRACT_ID || "wrap.testnet",
        REF_ADBOARD_CONTRACT_ID: "ref-adboard.near",
        REF_FARM_CONTRACT_ID:
          process.env.REF_FARM_CONTRACT_ID || "v2.ref-farming.testnet",
        REF_TOKEN_ID: "token.ref-finance.testnet",
        REF_AIRDROP_CONTRACT_ID: "locker002.ref-dev.testnet",
        POOL_TOKEN_REFRESH_INTERVAL:
          process.env.POOL_TOKEN_REFRESH_INTERVAL || 10,
        MULTI_MINING_POOLS: [79, 377, 2, 4],
      };
    default:
      return {
        networkId: "mainnet",
        nodeUrl: "https://rpc.mainnet.near.org",
        walletUrl: "https://wallet.near.org",
        helperUrl: "https://helper.mainnet.near.org",
        explorerUrl: "https://explorer.mainnet.near.org",
        indexerUrl: "https://indexer.ref-finance.net",
        sodakiApiUrl: "https://sodaki.com/api",
        REF_FI_CONTRACT_ID:
          process.env.REF_FI_CONTRACT_ID || "v2.ref-finance.near",
        WRAP_NEAR_CONTRACT_ID: process.env.WRAP_NEAR_CONTRACT_ID || "wrap.near",
        REF_ADBOARD_CONTRACT_ID: "ref-adboard.near",
        REF_FARM_CONTRACT_ID:
          process.env.REF_FARM_CONTRACT_ID || "v2.ref-farming.near",
        REF_TOKEN_ID: "token.ref-finance.near",
        REF_AIRDROP_CONTRACT_ID: "s01.ref-airdrop.near",
        POOL_TOKEN_REFRESH_INTERVAL:
          process.env.POOL_TOKEN_REFRESH_INTERVAL || 10,
        MULTI_MINING_POOLS: [79, 377, 2, 4],
      };
  }
}

export function getNodeConfig(env: string = process.env.NODE_ENV) {
  switch (env) {
    case "base":
      return {
        origin: "http://127.0.0.1:3000",
      };
    case "testnet":
      return {
        origin: "https://testnet.superise.xyz",
      };
    case "mainnet":
      return {
        origin: "http://superise.xyz",
      };
  }
}
