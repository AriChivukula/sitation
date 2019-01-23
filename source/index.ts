import "@babel/polyfill";

import {
  Expressions,
  ReportersDB,
} from "./data";
import {
  rootReducer,
} from "./reducers";
import {
  ReducerResult,
} from "./reducer";
import {
  MapperParts,
} from "./mapper";
import {
  rootMapper,
} from "./mappers";

export function tokenize(casebody: string): MapperParts {
  return rootMapper(parts);
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
