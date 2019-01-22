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
  return new Consumed(3, segmented.segments.slice(0, 3).map((segment) => segment.corrected).join(" "));
}

function parallelConsumer(consumers: consumer[]): consumer {
  return (segmented: Segmented): Consumed => {
    for (let consumer of consumers) {
      const consumed = consumer(segmented);
      if (consumed == noop) {
        continue;
      }
      return consumed;
    }
    return noop;
  }
}

function serialConsumer(consumers: consumer[]): consumer {
  return (segmented: Segmented): Consumed => {
    let remaining = segmented;
    const consumeds: Consumed[] = [];
    for (let consumer of consumers) {
      const consumed = consumer(remaining);
      if (consumed == noop) {
        continue;
      }
      remaining = new Segmented(remaining.segments.slice(consumed.count));
      consumeds.push(consumed);
    }
    return new Consumed(
      consumeds.reduce((total, consumed) => total + consumed.count, 0),
      consumeds.map((consumed) => consumed.citation).join(" "),
    );
  }
}

const rootConsumer = parallelConsumer([
  serialConsumer([idCite]),
  serialConsumer([fullCite]),
]);

export function coalesce(segmented: Segmented): string[] {
  const citations: string[] = [];
  let remaining = segmented;
  while (remaining.segments.length > 0) {
    const consumed = rootConsumer(remaining);
    console.log(consumed);
    if (consumed === noop) {
      remaining = new Segmented(remaining.segments.slice(1));
      continue;
    }
    citations.push(consumed.citation);
    remaining = new Segmented(remaining.segments.slice(consumed.count));
  }
  return citations;
}
