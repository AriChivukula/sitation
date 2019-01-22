import {
  editions,
  variations,
} from "./data";

let _REPORTER_RE: RegExp | null = null;

export function reporterRE(): RegExp {
  if (_REPORTER_RE === null) {
    const editionsAndVariations = Object.keys(Object.assign({}, editions(), variations()));
    editionsAndVariations.sort((a, b) => b.length - a.length);
    const escape = (s: string) => s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
    _REPORTER_RE = RegExp("\\s(" + editionsAndVariations.map(escape).join("|") + ")\\s", "i");
  }
  return _REPORTER_RE as RegExp;
}

let _SPACING_RE: RegExp | null = null;

export function spacingRE(): RegExp {
  if (_SPACING_RE === null) {
    _SPACING_RE = /[\s,;:.()[\]{}]+/;
  }
  return _SPACING_RE as RegExp;
}
