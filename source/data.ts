import {
  readFileSync,
} from "fs";

export type Reporter = {
  editions: {
    [k: string]: object,
  },
  variations: {
    [k: string]: string,
  },
};

export type Reporters = {
  [k: string]: Reporter[],
};

let _REPORTERS: Reporters | null = null;

export function reporters(): Reporters {
  let r = _REPORTERS;
  if (r === null) {
    r = JSON.parse(readFileSync("reporters.json", "ascii"));
  }
  return r;
}

export type Editions = string[];

let _EDITIONS: Editions | null = null;

export function editions(): Editions {
  let e = _EDITIONS;
  if (e === null) {
    e = Object.values(reporters()).map((r: Reporter) => Object.keys(r.editions)).flat(1);
  }
  return e;
}

export type Variations = { [k: string]: string };

const _VARIATIONS: Variations = {};

export function variations(): Variations {
  if (_VARIATIONS === {}) {
    Object.assign(_VARIATIONS, Object.values(reporters()).map((r: Reporter) => Object.keys(r.variations)));
  }
  return _VARIATIONS;
}
