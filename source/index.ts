import "@babel/polyfill";

import {
  readFileSync,
} from "fs";

export function noop() {
  JSON.parse(readFileSync("reporters.json"));
}
