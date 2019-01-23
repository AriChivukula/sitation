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
    if (this.isNOOP()) {
      return result;
    }
    if (result.isNOOP()) {
      return this;
    }
    return new ReducerResult(
      this.consumed + result.consumed,
      this.content + " " + result.content,
    );
  }

  public isNOOP(): boolean {
    return this.consumed === 0;
  }
  
  public toString(): string {
    return this.consumed + ":" + this.content;
  }
  
  public static noop(): ReducerResult {
    return new ReducerResult(0, "");
  }
}

export type reducer = (results: MapperResult[]) => ReducerResult[];

export function consumeFirst(reducers: reducer[]): reducer {
  return (results: MapperResult[]): ReducerResult[] => {
    for (let reducerFN of reducers) {
      const result = reducerFN(results);
      if (result.isNOOP()) {
        continue;
      }
      return [result];
    }
    return [ReducerResult.noop()];
  }
}

export function consumeEach(reducers: reducer[]): reducer {
  return (results: MapperResult[]): ReducerResult[] => {
    let remaining = results;
    let rollup = ReducerResult.noop();
    for (let reducerFN of reducers) {
      const result = reducerFN(remaining);
      remaining = remaining.slice(result.consumed);
      rollup = rollup.merge(result);
    }
    return [rollup];
  }
}

export function consumeLoop(reducerFN: reducer): reducer {
  return (results: MapperResult[]): ReducerResult[] => {
    let remaining = results;
    const output: ReducerResult[] = [];
    while (remaining.length > 0) {
      const result = reducerFN(remaining);
      remaining = remaining.slice(result.consumed);
      output = output.concat(result);
    }
    return output;
  }
}
