import {
  readFileSync,
} from "fs";
import {
  MemoizeAll,
} from "lodash-decorators";

export type Reporter = {
  editions: {
    [k: string]: object,
  },
  variations: {
    [k: string]: string,
  },
};

export type Reporters = {
  [k: string]: Reporter[],
};

export type Editions = { [k: string]: string };

export type Variations = { [k: string]: string };

export type Signals = { [k: string]: string };

export abstract class DB {

  @MemoizeAll()
  public static reporters(): Reporters {
    return JSON.parse(readFileSync("reporters.json", "ascii"));
  }

  @MemoizeAll()
  public static editions(): Editions {
    let result: Editions = {};
    for (let reporterName in ReportersDB.reporters()) {
      for (let reporter of ReportersDB.reporters()[reporterName]) {
        for (let edition in reporter.editions) {
          result[edition.toLowerCase()] = edition;
        }
      }
    }
    return result;
  }

  @MemoizeAll()
  public static variations(): Variations {
    let result: Variations = {};
    for (let reporterName in ReportersDB.reporters()) {
      for (let reporter of ReportersDB.reporters()[reporterName]) {
        for (let variation in reporter.variations) {
          result[variation.toLowerCase()] = reporter.variations[variation];
        }
      }
    }
    return result;
  }
  
  @MemoizeAll()
  public static signals(): Signals {
    let result: Signals = {};
    return result;
  }
}
