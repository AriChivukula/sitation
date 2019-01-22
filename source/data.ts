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
    for (let reporterName in reporters()) {
      for (let reporter of reporters()[reporterName]) {
        for (let edition in reporter.editions) {
          _EDITIONS[edition.toLowerCase()] = edition;
        }
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
    for (let reporterName in reporters()) {
      for (let reporter of reporters()[reporterName]) {
        for (let variation in reporter.variations) {
          _VARIATIONS[variation.toLowerCase()] = reporter.variations[variation];
        }
      }
    }
  }
  return _VARIATIONS as Variations;
}
