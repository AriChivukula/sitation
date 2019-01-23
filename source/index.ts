import "@babel/polyfill";

import {
  ReducerResult,
} from "./reducer";
import {
  rootReducer,
} from "./reducers";
import {
  MapperResult,
} from "./mapper";
import {
  rootMapper,
} from "./mappers";

export function coalesce(results: MapperResult[]): string[] {
  const citations: string[] = [];
  let remaining = results;
  while (remaining.length > 0) {
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
  return coalesce(rootMapper(casebody));
}
