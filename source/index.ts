import "@babel/polyfill";

import {
  match,
} from "./citation";
import {
  tokenize,
} from "./token";

export function sitation(casebody: string): string[] {
  return match(tokenize(casebody));
}
