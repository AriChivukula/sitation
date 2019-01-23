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

export class MapperResult {

  constructor(
    readonly corrected: string,
    readonly original: string,
    readonly type: MapperType,
  ) {
  }

  public toString(): string {
    return this.corrected + ":" + this.original + ":" + this.type;
  }
}
