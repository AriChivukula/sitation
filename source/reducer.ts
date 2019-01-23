import {
  MapperResult,
} from "./mapper";

export class ReducerResult {

  constructor(
    readonly consumed: number,
    readonly content: string,
  ) {
  }
  
  public merge(result: ReducerResult): ReducerResult {
    return new ReducerResult(
      this.consumed + result.consumed,
      this.content + " " + result.content,
    );
  }
  
  public toString(): string {
    return this.consumed + ":" + this.content;
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
