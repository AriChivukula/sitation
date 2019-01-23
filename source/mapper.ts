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
