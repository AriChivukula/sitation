import "@babel/polyfill";

import {
  rootReducer,
} from "./reducers";
import {
  Segmented,
  tokenize,
} from "./token";

export function sitation(casebody: string): string[] {
  return coalesce(tokenize(casebody));
}

function coalesce(segmented: Segmented): string[] {
  const citations: string[] = [];
  let remaining = segmented;
  while (remaining.segments.length > 0) {
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
