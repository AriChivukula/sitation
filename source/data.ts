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

export type Editions = { [k: string]: string };

let _EDITIONS: Editions | null = null;

export function editions(): Editions {
  if (_EDITIONS === null) {
    _EDITIONS = {};
    for (let reporter in reporters()) {
      for (let edition in reporters()[reporter].editions) {
        _EDITIONS[edition.toLowerCase()] = edition;
      }
    }
  }
  return _EDITIONS as Editions;
}

export type Variations = { [k: string]: string };

let _VARIATIONS: Variations | null = null;

export function variations(): Variations {
  if (_VARIATIONS === null) {
    _VARIATIONS = {};
    for (let reporter in reporters()) {
      for (let variation in reporters()[reporter].variations) {
        _VARIATIONS[variation.toLowerCase()] = reporter.variations[variation];
      }
    }
  }
  return _VARIATIONS as Variations;
}
