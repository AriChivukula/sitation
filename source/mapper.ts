import {
  Expressions,
  ReportersDB,
} from "./data";

export enum MapperType {
  ID, // `Id` style citation
  NOOP, // Token used only to break up patterns
  NUMBER, // [0-9]+
  RANGE, // e.g. 419-20
  REPORTER, // e.g. U.S.
  SIGNAL, // e.g. see also
}

export class MapperResult {

  private constructor(
    readonly original: string,
    readonly corrected: string,
    readonly type: MapperType,
  ) {
  }

  public toString(): string {
    return this.original + "," + this.corrected + "," + this.type;
  }

  public static id(original: string) {
    return new MapperResult(original, "Id", MapperType.ID);
  }
  
  public static noop(original: string) {
    return new MapperResult(original, original, MapperType.NOOP);
  }
  
  public static number(original: string) {
    return new MapperResult(original, original, MapperType.NUMBER);
  }

  public static reporter(original: string, corrected: string) {
    return new MapperResult(original, corrected, MapperType.REPORTER);
  }
  
  public static signal(original: string, corrected: string) {
    return new MapperResult(original, corrected, MapperType.SIGNAL);
  }
}

export type mapper = (token: string) => MapperResult[];

export function matchFirst(mappers: mapper[]): mapper {
  return (token: string): MapperResult[] => {
    for (let mapperFN of mappers) {
      const result = mapperFN(token);
      if (result.length !== 0) {
        return result;
      }
    }
    return [];
  }
}

export type splitter = (token: string) => string[];

export function matchSplit(splitterFN: splitter, mapperFN: mapper): mapper {
  return (token: string): MapperResult[] => {
    let results: MapperResult[] = [];
    for (let splitToken of splitterFN(token)) {
      results = results.concat(mapperFN(splitToken));
    }
    return results;
  }
}
