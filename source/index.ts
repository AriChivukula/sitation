import "@babel/polyfill";

import {
  rootReducer,
} from "./reducers";
import {
  rootMapper,
} from "./mappers";

export function sitation(casebody: string): string {
  return rootReducer(rootMapper(casebody)).join("\n");
}
