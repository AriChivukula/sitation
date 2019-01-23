import {
  Segmented,
  Token,
} from "./token";

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
  
  public static noop(): Result {
    return new Result(0, "");
  }
}

export type reducer = (segmented: Segmented) => ReducerResult;

export function parallelReducers(reducers: reducer[]): ReducerResult {
  return (segmented: Segmented): ReducerResult => {
    for (let reducer of reducers) {
      const result = reducer(segmented);
      if (result.isNOOP()) {
        continue;
      }
      return result;
    }
    return ReducerResult.noop();
  }
}

export function serialReducers(reducers: reducer[]): consumer {
  return (segmented: Segmented): ReducerResult => {
    let remaining = segmented;
    let rollup = Consumed.noop();
    for (let reducer of reducers) {
      const result = reducer(remaining);
      remaining = remaining.slice(result.consumed);
      rollup = rollup.merge(result);
    }
    return rollup;
  }
}
