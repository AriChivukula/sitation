import {
  Expressions,
  ReportersDB,
} from "./data";

export enum MapperType {
  ID, // `Id` style citation
  NOOP, // Token used only to break up patterns
  NUMBER, // [0-9]+
  REPORTER, // Can be found in `REPORTER_SET`
}

export class MapperPart {

  constructor(
    readonly corrected: string,
    readonly original: string,
    readonly token: MapperType,
  ) {
  }

  public toString(): string {
    return this.corrected + ":" + this.original + ":" + this.token;
  }
}

export class MapperParts {

  constructor(
    readonly parts: MapperPart[],
  ) {
  }
  
  public slice(begin: number, end?: number): MapperParts {
    return new MapperParts(this.parts.slice(begin, end));
  }

  public toString(): string {
    return this.parts.map((part) => part.toString()).join(",");
  }
}

export function tokenize(casebody: string): Segmented {
  const tokens: Segment[] = [];
  for (let reporter_split_token of casebody.split(Expressions.reporter())) {
    const lower_split_token = reporter_split_token.toLowerCase();
    if (ReportersDB.editions().hasOwnProperty(lower_split_token)) {
      tokens.push(new MapperResult(ReportersDB.editions()[lower_split_token], reporter_split_token, MapperType.REPORTER));
    } else if (ReportersDB.variations().hasOwnProperty(lower_split_token)) {
      tokens.push(new MapperResult(ReportersDB.variations()[lower_split_token], reporter_split_token, MapperType.REPORTER));
    } else {
      for (let spacing_split_token of reporter_split_token.split(Expressions.spacing())) {
        if (spacing_split_token == "") {
          continue;
        } else if (!isNaN(Number(spacing_split_token))) {
          tokens.push(new MapperResult(spacing_split_token, spacing_split_token, MapperType.NUMBER))
        } else if (spacing_split_token.toLowerCase() == "id") {
          tokens.push(new MapperResult("Id", spacing_split_token, MapperType.ID));
        } else {
          tokens.push(new MapperResult(spacing_split_token, spacing_split_token, MapperType.NOOP))
        }
      }
    }
  }
  return new MapperParts(tokens);
}
