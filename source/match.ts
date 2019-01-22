import {
  Segmented,
  Token,
} from "./token";

class Consumed {

  constructor(
    readonly count: number,
    readonly citation: string,
  ) {
  }

  public toString(): string {
    return this.count + "=" + this.citation;
  }
}

const noop = new Consumed(0, "");

type consumer = (segmented: Segmented) => Consumed;

function idCite(segmented: Segmented): Consumed {
  if (segmented.segments.length < 1) {
    return noop;
  }
  if (segmented.segments[0].token !== Token.ID) {
    return noop;
  }
  return new Consumed(1, segmented.segments[0].corrected);
}

function fullCite(segmented: Segmented): Consumed {
  if (segmented.segments.length < 3) {
    return noop;
  }
  if (segmented.segments[0].token !== Token.NUMBER) {
    return noop;
  }
  if (segmented.segments[1].token !== Token.REPORTER) {
    return noop;
  }
  if (segmented.segments[2].token !== Token.NUMBER) {
    return noop;
  }
  return new Consumed(3, segmented.segments[0:3].map((segment) => segment.corrected).join(" "));
}

const consumers: consumer[] = [
  idCite,
  fullCite,
];

export function coalesce(segmented: Segmented): string[] {
  const citations: string[] = [];
  let remaining = segmented;
  while (remaining.segments.length > 0) {
    let wasFound = false;
    for (let consumer of consumers) {
      const consumed = consumer(remaining);
      if (consumed == noop) {
        continue;
      }
      wasFound = true;
      citations.push(consumed.citation);
      remaining = new Segmented(remaining.segments[consumed.count:]);
      break;
    }
    if (!wasFound) {
      remaining = new Segmented(remaining.segments[1:]);
    }
  }
  return citations;
}
