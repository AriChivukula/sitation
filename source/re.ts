import {
  editions,
  variations,
} from "./data";

let _REPORTER_RE: string | null = null;

export function reporterRegExp(): string {
  if (_REPORTER_RE === null) {
    const editionsAndVariations = Object.assign({}, editions(), variations());
    editionsAndVariations.sort((a, b) => b.length - a.length);
    const escape = (s: string) => s.replace("/[-\/\\^$*+?.()|[\]{}]/g", "\\$&");
    _REPORTER_RE = "\s(" + Object.keys(editionsAndVariations).map(escape).join("|") + ")\s";
  }
  return _REPORTER_RE as string;
}

export function spacingRegExp(): string {
  return "[\s,;:.()[\]{}]+";
}
