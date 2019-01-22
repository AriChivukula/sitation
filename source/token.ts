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
  const tokens: Tokenized[] = [];
  for (let reporter_split_token of casebody.split(reporterRegExp())) {
    if (editions().hasOwnProperty(reporter_split_token.toLowerCase())) {
      tokens.push([editions()[reporter_split_token.toLowerCase()], Token.REPORTER]);
    } else if (variations().hasOwnProperty(reporter_split_token.toLowerCase())) {
      tokens.push([variations()[reporter_split_token.toLowerCase()], Token.REPORTER]);
    } else {
      for (let spacing_split_token of reporter_split_token.split(spacingRegExp())) {
        if (spacing_split_token == "") {
          continue;
        } else if (!isNaN(Number(spacing_split_token))) {
          tokens.push([spacing_split_token, Token.NUMBER])
        } else if (spacing_split_token.toLowerCase() == "id") {
          tokens.push(["Id", Token.ID]);
        } else {
          tokens.push([spacing_split_token, Token.NOOP])
        }
      }
    }
  }
  return tokens;
}
