import Dexie from "dexie";
import _ from "lodash";
import { TokenMetadata } from "~/src/domain/near/ft/models";

// TODO: Use SuperiseDatabase store to IndexDB
class SuperiseDatabase extends Dexie {
  public tokens: Dexie.Table<TokenMetadata>;

  public constructor() {
    super("SuperiseDatabase");
    this.version(1.0).stores({
      tokens: "id, name, symbol, decimals, icon, ref, near, total",
    });
    this.tokens = this.table("tokens");
  }

  public allTokens() {
    return this.tokens;
  }

  public searchTokens(args: any, tokens: TokenMetadata[]): TokenMetadata[] {
    if (args.tokenName === "") return tokens;
    return _.filter(tokens, (token: TokenMetadata) => {
      return _.includes(token.name, args.tokenName);
    });
  }

  public async queryTokens(args: any) {
    let tokens = await this.allTokens().toArray();
    return this.searchTokens(args, tokens);
  }
}

export default new SuperiseDatabase();
