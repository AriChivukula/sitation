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
  
  public merge(consumed: Consumed): Consumed {
    if (this.isNOOP()) {
      return consumed;
    }
    if (consumed.isNOOP()) {
      return this;
    }
    return new Consumed(this.count + consumed.count, this.citation + " " + consumed.citation);
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
    return Consumed.noop();
  }
}

function serialConsumer(consumers: consumer[]): consumer {
  return (segmented: Segmented): Consumed => {
    let remaining = segmented;
    let rollup = Consumed.noop();
    for (let consumer of consumers) {
      const consumed = consumer(remaining);
      remaining = remaining.slice(consumed.count);
      rollup = rollup.merge(consumed);
    }
    return rollup;
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
      remaining = remaining.slice(1);
      continue;
    }
    citations.push(consumed.citation);
    remaining = remaining.slice(consumed.count);
  }
  return citations;
}
