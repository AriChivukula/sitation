import {
  readFileSync,
} from "fs";
import {
  MemoizeAll,
} from "lodash-decorators";

type ReporterRow = {
  editions: {
    [k: string]: object,
  },
  variations: {
    [k: string]: string,
  },
};

type ReporterTable = {
  [k: string]: ReporterRow[],
};

export type Variations = { [k: string]: string };

export abstract class DB {

  @MemoizeAll()
  private static reporterdb(): ReporterTable {
    const db: unknown = EMBED_REPORTERS_DB;
    // @ts-ignore
    return db;
  }

  @MemoizeAll()
  public static reporters(): Variations {
    let result: Variations = {};
    for (let reporterName in DB.reporterdb()) {
      for (let reporter of DB.reporterdb()[reporterName]) {
        for (let edition in reporter.editions) {
          result[edition.toLowerCase()] = edition;
        }
        for (let variation in reporter.variations) {
          result[variation.toLowerCase()] = reporter.variations[variation];
        }
      }
    }
    return result;
  }
  
  @MemoizeAll()
  public static signals(): Variations {
    return {
      "and": "and",
      "accord": "Accord",
      "but cf": "But cf.",
      "but cf.": "But cf.",
      "but see": "But see",
      "cf": "Cf.",
      "cf.": "Cf.",
      "compare": "Compare",
      "contra": "Contra",
      "eg": "E.g.",
      "e.g.": "E.g.",
      "e. g.": "E.g.",
      "see": "See",
      "see also": "See also",
      "see, eg,": "See, e.g.,",
      "see, e.g.,": "See, e.g.,",
      "see, e. g.,": "See, e.g.,",
      "with": "with",
    };
  }
}
