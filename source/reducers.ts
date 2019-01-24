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

export function signalConsume(results: MapperResult[]): ReducerResult[] {
  const rollup: ReducerResult[] = [];
  if (results.length < 1) {
    return rollup;
  }
  if (results[0].type !== MapperType.SIGNAL) {
    return rollup;
  }
  rollup.push(ReducerResult.signal(results[0].corrected));
  for (let i = 1; i < results.length; i++) {
    if (results[i].type === MapperType.NOOP || results[i].type === MapperType.REPORTER) {
      rollup.push(ReducerResult.noop(1));
    } else {
      break;
    }
  }
  return rollup;
}

export function noopConsume(resuts: MapperResult[]): ReducerResult[] {
  return [ReducerResult.noop(0)];
}
export function pinpointConsume(results: MapperResult[]): ReducerResult[] {
  const rollup: ReducerResult[] = [];
  for (let i = 0; i < results.length; i++) {
    if (results[i].type === MapperType.RANGE) {
      rollup.push(ReducerResult.pinpoint(results[i].corrected));
    } else if (results[i].type === MapperType.NUMBER) {
      if (i + 1 >= results.length) {
        rollup.push(ReducerResult.pinpoint(results[i].corrected));
      } else if (results[i + 1].type !== MapperType.REPORTER) {
        rollup.push(ReducerResult.pinpoint(results[i].corrected));
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return rollup;
}

export const rootReducer = consumeLoop(consumeMerge([
  consumeFirst([
    signalConsume,
    noopConsume,
  ]),
  consumeFirst([
    fullConsume,
    idConsume,
  ]),
  consumeFirst([
    pinpointConsume,
    noopConsume,
  ]),
]));
