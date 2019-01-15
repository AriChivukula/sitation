import "@babel/polyfill";

import {
  readFileSync,
} from "fs";

export function noop() {
  const data = readFileSync("reporters.json", "ascii");
  JSON.parse(data);
}
