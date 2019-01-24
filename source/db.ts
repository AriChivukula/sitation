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
    return JSON.parse(readFileSync("reporters.json", "ascii"));
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
    let result: Variations = {};
    return result;
  }
}
