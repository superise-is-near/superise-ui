const getConfig = require("./near-config.js");
const nearAPI = require("near-api-js");
const { homedir } = require("os");
const { resolve } = require("parcel-bundler/lib/utils/config");

const config = getConfig(process.env.NODE_ENV || "testnet");

module.exports = {
  add_user_into_whitelist,
};

/**
 *
 * @param param eg: {"pool_id":  1,"account": "xsb.near","twitter_account": "hsxyl"}
 * @return Promise<FinalExecutionOutcome> ,todo so we can't get result immediately,we need design user-friendly UX. */
async function add_user_into_whitelist(param) {
  const whitelist_admin = await initContract();
  return new Promise(async (resolve, reject) => {
    const transationResponse = await whitelist_admin.functionCall(
      config.SUPERISE_CONTRACT_ID,
      "add_user_into_whitelist",
      { param: param }
    );
    if (transationResponse.status.SuccessValue !== undefined) {
      resolve(true);
    } else {
      reject(false);
    }
  });
}

const path = new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
  `${homedir()}/.near-credentials`
);
console.log({ path });

async function initContract() {
  const config = getConfig(process.env.NODE_ENV || "testnet");
  const near = await nearAPI.connect({
    keyStore: new nearAPI.keyStores.UnencryptedFileSystemKeyStore(
      `${homedir()}/.near-credentials`
    ),
    ...config,
  });
  return await near.account(config.whitelistAccount);
}
