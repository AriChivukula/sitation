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

export type mapper = (token: string) => MapperResult[];

export function parallelMappers(mappers: mapper[]): mapper {
  return (token: string): MapperResult[] => {
    for (let mapper of mappers) {
      const result = mapper(token);
      if (result.length !== 0) {
        return result;
      }
    }
    return [];
  }
}

export type splitter = (token: string) => string[];

export function splitMapper(splitterFN: splitter, mapperFN: mapper): mapper {
  return (token: string): MapperResult[] => {
    let results: MapperResult[] = [];
    for (let splitToken of splitterFN(token)) {
      results += mapperFN(splitToken);
    }
    return results;
  }
}
