const configs = {
  base: {
    host: "http://127.0.0.1",
    twitter_callback_url: "http://127.0.0.1:3000/twitter-callback",
    port: 3000,
  },

  testnet: {
    host: "https://testnet.superise.xyz",
    twitter_callback_url: "https://testnet.superise.xyz/twitter-callback",
    port: 3000,
  },

  mainnet: {
    host: "https://superise.com",
    twitter_callback_url: "https://superise.com/twitter-callback",
    port: 4000,
  },
};

const config = { ...configs.base, ...(configs[process.env.NODE_ENV] || {}) };

console.log({ config });

module.exports = config;
