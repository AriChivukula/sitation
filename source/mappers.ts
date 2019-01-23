import "@babel/polyfill";

import {
  Expressions,
  ReportersDB,
} from "./data";
import {
  MapperResult,
  MapperType,
  matchFirst,
  matchSplitter,
} from "./mapper";

export function editionMatch(token: string): MapperResult[] {
  if (ReportersDB.editions().hasOwnProperty(token.toLowerCase())) {
    return [new MapperResult(ReportersDB.editions()[token.toLowerCase()], token, MapperType.REPORTER)];
  }
  return [];
}

export function variationMatch(token: string): MapperResult[] {
  if (ReportersDB.variations().hasOwnProperty(token.toLowerCase())) {
    return [new MapperResult(ReportersDB.variations()[token.toLowerCase()], token, MapperType.REPORTER)];
  }
  return [];
}

export function numberMatch(token: string): MapperResult[] {
  if (token !== "" && !isNaN(Number(token))) {
    return [new MapperResult(token, token, MapperType.NUMBER)];
  }
  return [];
}

export function idMatch(token: string): MapperResult[] {
  if (token.toLowerCase() == "id") {
    return [new MapperResult("Id", token, MapperType.ID)];
  }
  return [];
}

export function noopMatch(token: string): MapperResult[] {
  if (token !== "") {
    return [new MapperResult(token, token, MapperType.NOOP)];
  }
  return [];
}

export const rootMapper = matchSplitter(
  (token: string) => token.split(Expressions.reporter()),
  matchFirst([
    editionMatch,
    variationMatch,
    matchSplitter(
      (token: string) => token.split(Expressions.spacing()),
      matchFirst([
        numberMatch,
        idMatch,
        noopMatch,
      ]),
    ),
  ]),
);
