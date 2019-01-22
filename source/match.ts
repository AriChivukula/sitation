import {
  Segmented,
  Token,
} from "./token";

export function coalesce(segmented: Segmented): string[] {
  const citations: string[] = [];
  let idx = 0;
  while (idx < segmented.segments.length) {
    const segment_a = segmented.segments[idx];
    idx++;
    if (segment_a.token === Token.ID) {
      citations.push(segment_a.corrected);
      continue;
    }
    if (segment_a.token !== Token.NUMBER) {
      continue;
    }
    if (idx == segmented.segments.length) {
      break;
    }
    const segment_b = segmented.segments[idx];
    if (segment_b.token !== Token.REPORTER) {
      continue;
    }
    idx++;
    if (idx == segmented.segments.length) {
      break;
    }
    const segment_c = segmented.segments[idx];
    if (segment_c.token !== Token.NUMBER) {
      continue;
    }
    idx++;
    citations.push([segment_a.corrected, segment_b.corrected, segment_c.corrected].join(" "))
  }
  return citations;
}
