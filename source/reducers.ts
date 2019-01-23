import {
  ReducerResult,
  parallelReducers,
  serialReducers,
} from "./reducer";
import {
  MapperResult,
  MapperType,
} from "./mapper";

export function idCite(resuts: MapperResult[]): ReducerResult {
  if (resuts.length < 1) {
    return ReducerResult.noop();
  }
  if (resuts[0].type !== MapperType.ID) {
    return ReducerResult.noop();
  }
  return new ReducerResult(1, resuts[0].corrected);
}

export function fullCite(resuts: MapperResult[]): ReducerResult {
  if (resuts.length < 3) {
    return ReducerResult.noop();
  }
  if (resuts[0].type !== MapperType.NUMBER) {
    return ReducerResult.noop();
  }
  if (resuts[1].type !== MapperType.REPORTER) {
    return ReducerResult.noop();
  }
  if (resuts[2].type !== MapperType.NUMBER) {
    return ReducerResult.noop();
  }
  return new ReducerResult(
    3,
    resuts.slice(0, 3).map((segment) => segment.corrected).join(" "),
  );
}

export const rootReducer = parallelReducers([
  joinReducer([
    idCite,
  ]),
  joinReducer([
    fullCite,
  ]),
]);
