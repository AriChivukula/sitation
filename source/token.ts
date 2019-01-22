import {
  ReportersDB,
} from "./data";
import {
  Expressions,
} from "./re";

export enum Token {
  ID, // `Id` style citation
  NOOP, // Token used only to break up patterns
  NUMBER, // [0-9]+
  REPORTER, // Can be found in `REPORTER_SET`
}

export class Segment {
  constructor(
    public corrected: string,
    public original: string,
    public token: Token,
  ) {
  }
}

export function tokenize(casebody: string): Segment[] {
  const tokens: Segment[] = [];
  for (let reporter_split_token of casebody.split(Expressions.reporter())) {
    const lower_split_token = reporter_split_token.toLowerCase();
    if (ReportersDB.editions().hasOwnProperty(lower_split_token)) {
      tokens.push(new Segment(ReportersDB.editions()[lower_split_token], reporter_split_token, Token.REPORTER));
    } else if (ReportersDB.variations().hasOwnProperty(lower_split_token)) {
      tokens.push(new Segment(ReportersDB.variations()[lower_split_token], reporter_split_token, Token.REPORTER));
    } else {
      for (let spacing_split_token of reporter_split_token.split(Expressions.spacing())) {
        if (spacing_split_token == "") {
          continue;
        } else if (!isNaN(Number(spacing_split_token))) {
          tokens.push(new Segment(spacing_split_token, spacing_split_token, Token.NUMBER))
        } else if (spacing_split_token.toLowerCase() == "id") {
          tokens.push(new Segment("Id", spacing_split_token, Token.ID));
        } else {
          tokens.push(new Segment(spacing_split_token, spacing_split_token, Token.NOOP))
        }
      }
    }
  }
  return tokens;
}
