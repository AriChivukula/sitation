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

export type Tokenized = [string, string, Token];

export function tokenize(casebody: string): Tokenized[] {
  const tokens: Tokenized[] = [];
  for (let reporter_split_token of casebody.split(reporterRE())) {
    const lower_split_token = reporter_split_token.toLowerCase();
    if (editions().hasOwnProperty(lower_split_token)) {
      tokens.push([editions()[lower_split_token], reporter_split_token, Token.REPORTER]);
    } else if (variations().hasOwnProperty(lower_split_token)) {
      tokens.push([variations()[lower_split_token], reporter_split_token, Token.REPORTER]);
    } else {
      for (let spacing_split_token of reporter_split_token.split(spacingRE())) {
        if (spacing_split_token == "") {
          continue;
        } else if (!isNaN(Number(spacing_split_token))) {
          tokens.push([spacing_split_token, spacing_split_token, Token.NUMBER])
        } else if (spacing_split_token.toLowerCase() == "id") {
          tokens.push(["Id", spacing_split_token, Token.ID]);
        } else {
          tokens.push([spacing_split_token, spacing_split_token, Token.NOOP])
        }
      }
    }
  }
  return tokens;
}
