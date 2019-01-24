import {
  ReducerResult,
  consumeFirst,
  consumeLoop,
  consumeMerge,
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
  return [ReducerResult.id()];
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
  return [ReducerResult.full(Number(resuts[0].corrected), resuts[1].corrected, Number(resuts[2].corrected))];
}

export function signalConsume(resuts: MapperResult[]): ReducerResult[] {
  const results: ReducerResult[] = [];
  if (resuts.length < 1) {
    return results;
  }
  if (resuts[0].type !== MapperType.SIGNAL) {
    return results;
  }
  results.push(ReducerResult.signal(resuts[0].corrected));
  for (let i = 1; i < results.length; i++) {
    if (resuts[i].type === MapperType.NOOP) {
      results.push(ReducerResult.noop(1));
    } else {
      break;
    }
  }
  return results;
}

export function noopConsume(resuts: MapperResult[]): ReducerResult[] {
  return [ReducerResult.noop(0)];
}

export const rootReducer = consumeLoop(consumeFirst([
  idConsume,
  consumeMerge([
    consumeFirst([
      signalConsume,
      noopConsume,
    ]),
    fullConsume,
  ]),
]));
