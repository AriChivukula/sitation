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

  public isNOOP(): boolean {
    return this.count === 0;
  }
  
  public static noop(): Consumed {
    return new Consumed(0, "");
  }
}

type consumer = (segmented: Segmented) => Consumed;

function idCite(segmented: Segmented): Consumed {
  if (segmented.segments.length < 1) {
    return Consumed.noop();
  }
  if (segmented.segments[0].token !== Token.ID) {
    return Consumed.noop();
  }
  return new Consumed(1, segmented.segments[0].corrected);
}

function fullCite(segmented: Segmented): Consumed {
  if (segmented.segments.length < 3) {
    return Consumed.noop();
  }
  if (segmented.segments[0].token !== Token.NUMBER) {
    return Consumed.noop();
  }
  if (segmented.segments[1].token !== Token.REPORTER) {
    return Consumed.noop();
  }
  if (segmented.segments[2].token !== Token.NUMBER) {
    return Consumed.noop();
  }
  return new Consumed(3, segmented.segments.slice(0, 3).map((segment) => segment.corrected).join(" "));
}

function parallelConsumer(consumers: consumer[]): consumer {
  return (segmented: Segmented): Consumed => {
    for (let consumer of consumers) {
      const consumed = consumer(segmented);
      if (consumed.isNOOP()) {
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
      if (consumed.isNOOP()) {
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
    if (consumed.isNOOP()) {
      remaining = new Segmented(remaining.segments.slice(1));
      continue;
    }
    citations.push(consumed.citation);
    remaining = new Segmented(remaining.segments.slice(consumed.count));
  }
  return citations;
}
