import "@babel/polyfill";

import {
  tokenize,
} from "./token";

export function sitation(casebody: string): string[] {
  tokenize(casebody);
  return [];
}
