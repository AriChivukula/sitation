import {
  ReducerResult,
  consumeFirst,
  consumeAll,
} from "./reducer";
import {
  MapperResult,
  MapperType,
} from "./mapper";

export function idConsume(resuts: MapperResult[]): ReducerResult[] {
  if (resuts.length < 1) {
    return [];
  }
  if (resuts[0].type !== MapperType.ID) {
    return [];
  }
  return [new ReducerResult(1, resuts[0].corrected)];
}

export function fullConsume(resuts: MapperResult[]): ReducerResult[] {
  if (resuts.length < 3) {
    return [];
  }
  if (resuts[0].type !== MapperType.NUMBER) {
    return [];
  }
  if (resuts[1].type !== MapperType.REPORTER) {
    return [];
  }
  if (resuts[2].type !== MapperType.NUMBER) {
    return [];
  }
  return [new ReducerResult(
    3,
    resuts.slice(0, 3).map((segment) => segment.corrected).join(" "),
  )];
}

export const rootReducer = consumeAll(consumeFirst([
  idConsume,
  fullConsume,
]));
