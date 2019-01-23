import {
  ReducerResult,
  parallelReducers,
  serialReducers,
} from "./reducer";
import {
  MapperParts,
  MapperType,
} from "./mapper";

export function idCite(parts: MapperParts): ReducerResult {
  if (parts.parts.length < 1) {
    return ReducerResult.noop();
  }
  if (parts.parts[0].token !== MapperType.ID) {
    return ReducerResult.noop();
  }
  return new ReducerResult(1, parts.parts[0].corrected);
}

export function fullCite(parts: MapperParts): ReducerResult {
  if (parts.parts.length < 3) {
    return ReducerResult.noop();
  }
  if (parts.parts[0].token !== MapperType.NUMBER) {
    return ReducerResult.noop();
  }
  if (parts.parts[1].token !== MapperType.REPORTER) {
    return ReducerResult.noop();
  }
  if (parts.parts[2].token !== MapperType.NUMBER) {
    return ReducerResult.noop();
  }
  return new ReducerResult(
    3,
    parts.parts.slice(0, 3).map((segment) => segment.corrected).join(" "),
  );
}

export const rootReducer = parallelReducers([
  serialReducers([
    idCite,
  ]),
  serialReducers([
    fullCite,
  ]),
]);
