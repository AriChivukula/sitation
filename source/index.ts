import "@babel/polyfill";

import {
  Expressions,
  ReportersDB,
} from "./data";
import {
  rootReducer,
} from "./reducers";
import {
  MapperPart,
  MapperParts,
  MapperType,
} from "./mapper";

export function tokenize(casebody: string): MapperParts {
  const parts: MapperPart[] = [];
  for (let reporter_split_token of casebody.split(Expressions.reporter())) {
    const lower_split_token = reporter_split_token.toLowerCase();
    if (ReportersDB.editions().hasOwnProperty(lower_split_token)) {
      parts.push(new MapperPart(ReportersDB.editions()[lower_split_token], reporter_split_token, MapperType.REPORTER));
    } else if (ReportersDB.variations().hasOwnProperty(lower_split_token)) {
      parts.push(new MapperPart(ReportersDB.variations()[lower_split_token], reporter_split_token, MapperType.REPORTER));
    } else {
      for (let spacing_split_token of reporter_split_token.split(Expressions.spacing())) {
        if (spacing_split_token == "") {
          continue;
        } else if (!isNaN(Number(spacing_split_token))) {
          parts.push(new MapperPart(spacing_split_token, spacing_split_token, MapperType.NUMBER))
        } else if (spacing_split_token.toLowerCase() == "id") {
          parts.push(new MapperPart("Id", spacing_split_token, MapperType.ID));
        } else {
          parts.push(new MapperPart(spacing_split_token, spacing_split_token, MapperType.NOOP))
        }
      }
    }
  }
  return new MapperParts(tokens);
}

export function coalesce(parts: MapperParts): string[] {
  const citations: string[] = [];
  let remaining = parts;
  while (remaining.parts.length > 0) {
    const result = rootReducer(remaining);
    if (result.isNOOP()) {
      remaining = remaining.slice(1);
      continue;
    }
    citations.push(result.content);
    remaining = remaining.slice(result.consumed);
  }
  return citations;
}

export function sitation(casebody: string): string[] {
  return coalesce(tokenize(casebody));
}
