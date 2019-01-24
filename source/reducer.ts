import {
  MapperResult,
} from "./mapper";

export enum ReducerType {
  ID, // Id
  FULL, // Volume Reporter Page
  NOOP, // `empty`
  SIGNAL, // See also
}

export class ReducerResult {

  private constructor(
    readonly consumed: number,
    readonly signal: string,
    readonly volume: number,
    readonly reporter: string,
    readonly page: number,
    readonly type: ReducerType,
  ) {
  }

  public toString(): string {
    return this.consumed + "," + this.signal + "," + this.volume + "," + this.reporter + "," + this.page + "," + this.type;
  }

  public merge(input: ReducerResult) {
    return new ReducerResult(
      this.consumed + input.consumed,
      this.signal || input.signal,
      this.volume || input.volume,
      this.reporter || input.reporter,
      this.page || input.page,
      ReducerResult.resolveType(this.type, input.type),
    );
  }

  private static resolveType(a: ReducerType, b: ReducerType): ReducerType {
    if (a === ReducerType.SIGNAL && b === ReducerType.FULL) {
      return ReducerType.FULL;
    }
    throw new Error("Unreachable");
  }

  public static id() {
    return new ReducerResult(1, "", 0, "", 0, ReducerType.ID);
  }
  
  public static full(volume: number, reporter: string, page: number) {
    return new ReducerResult(3, "", volume, reporter, page, ReducerType.FULL);
  }

  public static noop() {
    return new ReducerResult(0, "", 0, "", 0, ReducerType.NOOP);
  }
  
  public static signal(signal: string) {
    return new ReducerResult(1, signal, 0, "", 0, ReducerType.SIGNAL);
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

export function consumeMerge(reducers: reducer[]): reducer {
  return (results: MapperResult[]): ReducerResult[] => {
    let rollup = ReducerResult.noop();
    for (let reducerFN of reducers) {
      const result = reducerFN(results);
      if (result.length === 0) {
        return [];
      }
      for (let r of result) {
        rollup = rollup.merge(r);
      }
    }
    return [rollup];
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
