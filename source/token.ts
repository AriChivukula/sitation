import {
  editions,
  variations,
} from "./data";
import {
  reporterRegExp,
  spacingRegExp,
} from "./re";

export enum Token {
  ID, // `Id` style citation
  NOOP, // Token used only to break up patterns
  NUMBER, // [0-9]+
  REPORTER, // Can be found in `REPORTER_SET`
}


export type Tokenized = [string, Token];

export function tokenize(casebody: string): Tokenized[] {
  let tokens = [];
  return tokens;
}
