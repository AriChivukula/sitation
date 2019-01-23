import {
  ReducerResult,
  parallelReducers,
  serialReducers,
} from "./reducer";
import {
  Segmented,
  Token,
} from "./token";

export function idCite(segmented: Segmented): ReducerResult {
  if (segmented.segments.length < 1) {
    return ReducerResult.noop();
  }
  if (segmented.segments[0].token !== Token.ID) {
    return ReducerResult.noop();
  }
  return new ReducerResult(1, segmented.segments[0].corrected);
}

export function fullCite(segmented: Segmented): MapperResult {
  if (segmented.segments.length < 3) {
    return ReducerResult.noop();
  }
  if (segmented.segments[0].token !== Token.NUMBER) {
    return ReducerResult.noop();
  }
  if (segmented.segments[1].token !== Token.REPORTER) {
    return ReducerResult.noop();
  }
  if (segmented.segments[2].token !== Token.NUMBER) {
    return ReducerResult.noop();
  }
  return new ReducerResult(
    3,
    segmented.segments.slice(0, 3).map((segment) => segment.corrected).join(" "),
  );
}

export const rootReducer = parallelReducers([
  serialReducers([
    idCite,
  ]),
  serialConsumer([
    fullCite,
  ]),
]);
