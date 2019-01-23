import "@babel/polyfill";

import {
  Expressions,
  ReportersDB,
} from "./data";
import {
  MapperResult,
  MapperType,
} from "./mapper";

export function rootMapper(casebody: string): MapperResult[] {
  const results: MapperResult[] = [];
  for (let reporter_split_token of casebody.split(Expressions.reporter())) {
    const lower_split_token = reporter_split_token.toLowerCase();
    if (ReportersDB.editions().hasOwnProperty(lower_split_token)) {
      results.push(new MapperResult(ReportersDB.editions()[lower_split_token], reporter_split_token, MapperType.REPORTER));
    } else if (ReportersDB.variations().hasOwnProperty(lower_split_token)) {
      results.push(new MapperResult(ReportersDB.variations()[lower_split_token], reporter_split_token, MapperType.REPORTER));
    } else {
      for (let spacing_split_token of reporter_split_token.split(Expressions.spacing())) {
        if (spacing_split_token == "") {
          continue;
        } else if (!isNaN(Number(spacing_split_token))) {
          results.push(new MapperResult(spacing_split_token, spacing_split_token, MapperType.NUMBER))
        } else if (spacing_split_token.toLowerCase() == "id") {
          results.push(new MapperResult("Id", spacing_split_token, MapperType.ID));
        } else {
          results.push(new MapperResult(spacing_split_token, spacing_split_token, MapperType.NOOP))
        }
      }
    }
  }
  return results;
}
