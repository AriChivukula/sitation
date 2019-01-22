import {
  editions,
  variations,
} from "./data";

let _REPORTER_RE: RegExp | null = null;

export function reporterRegExp(): RegExp {
  if (_REPORTER_RE === null) {
    const editionsAndVariations = Object.keys(Object.assign({}, editions(), variations()));
    editionsAndVariations.sort((a, b) => b.length - a.length);
    console.log(editionsAndVariations);
    const escape = (s: string) => s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, "\\$&");
    _REPORTER_RE = RegExp("\\s(" + editionsAndVariations.map(escape).join("|") + ")\\s", "i");
  }
  return _REPORTER_RE as RegExp;
}

export function spacingRegExp(): RegExp {
  return /[\s,;:.()[\]{}]+/;
}
