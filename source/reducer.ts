import {
  MapperParts,
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
  
  public static noop(): Result {
    return new Result(0, "");
  }
}

export type reducer = (parts: MapperParts) => ReducerResult;

export function parallelReducers(reducers: reducer[]): ReducerResult {
  return (parts: MapperParts): ReducerResult => {
    for (let reducer of reducers) {
      const result = reducer(parts);
      if (result.isNOOP()) {
        continue;
      }
      return result;
    }
    return ReducerResult.noop();
  }
}

export function serialReducers(reducers: reducer[]): consumer {
  return (parts: MapperParts): ReducerResult => {
    let remaining = parts;
    let rollup = Consumed.noop();
    for (let reducer of reducers) {
      const result = reducer(remaining);
      remaining = remaining.slice(result.consumed);
      rollup = rollup.merge(result);
    }
    return rollup;
  }
}
