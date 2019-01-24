import "@babel/polyfill";

import {
  Expressions,
  ReportersDB,
} from "./data";
import {
  MapperResult,
  matchFirst,
  matchSplit,
} from "./mapper";

export function editionMatch(token: string): MapperResult[] {
  if (ReportersDB.editions().hasOwnProperty(token.toLowerCase())) {
    return [MapperResult.reporter(token, ReportersDB.editions()[token.toLowerCase()])];
  }
  return [];
}

export function variationMatch(token: string): MapperResult[] {
  if (ReportersDB.variations().hasOwnProperty(token.toLowerCase())) {
    return [MapperResult.reporter(token, ReportersDB.variations()[token.toLowerCase()])];
  }
  return [];
}

export function numberMatch(token: string): MapperResult[] {
  if (token !== "" && !isNaN(Number(token))) {
    return [MapperResult.number(token)];
  }
  return [];
}

export function idMatch(token: string): MapperResult[] {
  if (token.toLowerCase() == "id") {
    return [MapperResult.id(token)];
  }
  return [];
}

export function noopMatch(token: string): MapperResult[] {
  if (token !== "") {
    return [new MapperResult(token, token, MapperType.NOOP)];
  }
  return [];
}

export const rootMapper = matchSplit(
  (token: string) => token.split(Expressions.reporter()),
  matchFirst([
    editionMatch,
    variationMatch,
    matchSplit(
      (token: string) => token.split(Expressions.spacing()),
      matchFirst([
        numberMatch,
        idMatch,
        noopMatch,
      ]),
    ),
  ]),
);
