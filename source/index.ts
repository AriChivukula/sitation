import "@babel/polyfill";

import {
  coalesce,
} from "./match";
import {
  tokenize,
} from "./token";

export function sitation(casebody: string): string[] {
  return coalesce(tokenize(casebody));
}
