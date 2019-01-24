import {
  reporter,
} from "./data";
import {
  MapperResult,
} from "./mapper";

export enum ReducerType {
  ID, // Id
  FULL, // Volume Reporter Page
}

export class ReducerResult {

  private constructor(
    readonly consumed: number,
    readonly volume: number,
    readonly reporter: reporter,
    readonly page: number,
    readonly type: ReducerType,
  ) {
  }

  public toString(): string {
    return this.consumed + "," + this.volume + "," + this.reporter + "," + this.page + "," + this.type;
  }

  public static id() {
    return new ReducerResult(1, 0, "" as reporter, 0, ReducerType.ID);
  }
  
  public static full(volume: number, rep: reporter, page: number) {
    return new ReducerResult(3, volume, rep, page, ReducerType.FULL);
  }
}

export type reducer = (results: MapperResult[]) => ReducerResult[];

export function consumeFirst(reducers: reducer[]): reducer {
  return (results: MapperResult[]): ReducerResult[] => {
    for (let reducerFN of reducers) {
      const result = reducerFN(results);
      if (result.length === 0) {
        continue;
      }
      return result;
    }
    return [];
  }
}

export function consumeLoop(reducerFN: reducer): reducer {
  return (results: MapperResult[]): ReducerResult[] => {
    let remaining = results;
    let output: ReducerResult[] = [];
    while (remaining.length > 0) {
      const result = reducerFN(remaining);
      if (result.length === 0) {
        remaining = remaining.slice(1);
        continue;
      }
      remaining = remaining.slice(result.reduce((total, current) => total + current.consumed, 0));
      output = output.concat(result);
    }
    return output;
  }
}
