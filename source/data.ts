import {
  readFileSync,
} from "fs";

export type Reporter = {
  editions: 
    [k: string]: {};
  },
  variations: {
    [k: string]: string;
  },
};

export type Reporters = {
  [k: string]: [v: Reporter];
}

let _REPORTERS: Reporters | null = null;

export function reporters(): Reporters {
  if (_REPORTERS === null) {
    _REPORTERS = JSON.parse(readFileSync("reporters.json", "ascii"));
  }
  return _REPORTERS;
}

export type Editions = [v: string];

const _EDITIONS: Editions | null = null;

export function editions(): Editions {
  if (_EDITIONS === null) {
    _EDITIONS = Object.values(reporters()).map((r: Reporter) => Object.keys(r.editions)).flat(1);
  }
  return _EDITIONS;
}

export type Variations = { [k: string]: string };

const _VARIATIONS: Variations = {};

export function variations(): Variations {
  if (_VARIATIONS === {}) {
    Object.assign(_VARIATIONS, Object.values(reporters()).map((r: Reporter) => Object.keys(r.variations)));
  }
  return _VARIATIONS;
}
