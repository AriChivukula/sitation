import "@babel/polyfill";

import {
  DB,
} from "./db";
import {
  Expressions,
} from "./expressions";
import {
  MapperResult,
  matchFirst,
  matchSplit,
} from "./mapper";

export function reporterMatch(token: string): MapperResult[] {
  if (DB.reporters().hasOwnProperty(token.toLowerCase())) {
    return [MapperResult.reporter(token, DB.reporters()[token.toLowerCase()])];
  }
  return [];
}

export function signalMatch(token: string): MapperResult[] {
  if (DB.signals().hasOwnProperty(token.toLowerCase())) {
    return [MapperResult.signal(token, DB.signals()[token.toLowerCase()])];
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
    return [MapperResult.noop(token)];
  }
  return [];
}

export const rootMapper = matchSplit(
  (token: string) => token.split(Expressions.reporter()),
  matchFirst([
    reporterMatch,
    matchSplit(
      (token: string) => token.split(Expressions.signals()),
      matchFirst([
        signalMatch,
        matchSplit(
          (token: string) => token.split(Expressions.spacing()),
          matchFirst([
            numberMatch,
            idMatch,
            noopMatch,
          ]),
        ),
      ]),
    ),
  ]),
);
