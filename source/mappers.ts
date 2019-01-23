import "@babel/polyfill";

import {
  Expressions,
  ReportersDB,
} from "./data";
import {
  MapperResult,
  MapperType,
  parallelMappers,
  splitMapper,
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
  if (!isNaN(Number(token))) {
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

export const rootMapper = splitMapper(
  (token: string) => token.split(Expressions.reporter()),
  parallelMappers([
    editionMatch,
    variationMatch,
    splitMapper(
      (token: string) => token.split(Expressions.spacing()),
      parallelMappers([
        numberMatch,
        idMatch,
        noopMatch,
      ]),
    ),
  ]),
);
