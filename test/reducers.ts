import "mocha";

import * as chai from "chai";

import {
  MapperResult,
} from "../source/mapper";
import {
  ReducerResult,
} from "../source/reducer";
import {
  idConsume,
  fullConsume,
  noopConsume,
  signalConsume,
  pinpointConsume,
  rootReducer,
} from "../source/reducers";

describe(
  "idConsume()",
  () => {
    [
      {
        description: "Empty",
        results: [],
        expected: [],
      },
      {
        description: "Basic",
        results: [MapperResult.id("id")],
        expected: [ReducerResult.id()],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(idConsume(test.results).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "fullConsume()",
  () => {
    [
      {
        description: "Empty",
        results: [],
        expected: [],
      },
      {
        description: "Basic",
        results: [MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: [ReducerResult.full(379, "U.S.", 241)],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(fullConsume(test.results).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "noopConsume()",
  () => {
    [
      {
        description: "Empty",
        results: [],
        expected: [ReducerResult.noop(0)],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(noopConsume(test.results).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "pinpointConsume()",
  () => {
    [
      {
        description: "Empty",
        results: [],
        expected: [],
      },
      {
        description: "Basic",
        results: [MapperResult.range("419-20"), MapperResult.number("0")],
        expected: [ReducerResult.pinpoint("419-20"), ReducerResult.pinpoint("0")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(pinpointConsume(test.results).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "signalConsume()",
  () => {
    [
      {
        description: "Empty",
        results: [],
        expected: [],
      },
      {
        description: "Basic",
        results: [MapperResult.signal("see also", "See also")],
        expected: [ReducerResult.signal("See also")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(signalConsume(test.results).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);
