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
  if (_REPORTERS === null) {
    _REPORTERS = JSON.parse(readFileSync("reporters.json", "ascii"));
  }
  return _REPORTERS as Reporters;
}

export type Editions = { [k: string]: void };

const _EDITIONS: Editions = {};

export function editions(): Editions {
  if (Object.keys(_EDITIONS).length === 0) {
    Object.assign(_EDITIONS, ...Object.values(reporters()).flat(1).map((r: Reporter) => r.editions));
  }
  return _EDITIONS;
}

export type Variations = { [k: string]: string };

const _VARIATIONS: Variations = {};

export function variations(): Variations {
  if (Object.keys(_VARIATIONS).length === 0) {
    Object.assign(_VARIATIONS, ...Object.values(reporters()).flat(1).map((r: Reporter) => r.variations));
  }
  return _VARIATIONS;
}
