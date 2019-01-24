import "mocha";

import * as chai from "chai";

import {
  MapperResult,
} from "../source/mapper";
import {
  ReducerType,
} from "../source/reducer";
import {
  idConsume,
  fullConsume,
  noopConsume,
  signalConsume,
  rootReducer,
} from "../source/reducers";

describe(
  "idConsume()",
  () => {
    [
      {
        results: [],
        expected: "",
      },
      {
        results: [MapperResult.id("id")],
        expected: "1,,0,,0," + ReducerType.ID,
      },
    ].forEach((test) => {
      it(
        test.results.join(","),
        () => {
          chai.expect(idConsume(test.results).join(",")).to.equal(test.expected);
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
        results: [],
        expected: "",
      },
      {
        results: [MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: "3,,379,U.S.,241," + ReducerType.FULL,
      },
    ].forEach((test) => {
      it(
        test.results.join(","),
        () => {
          chai.expect(fullConsume(test.results).join(",")).to.equal(test.expected);
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
        results: [],
        expected: "0,,0,,0," + ReducerType.NOOP,
      },
    ].forEach((test) => {
      it(
        test.results.join(","),
        () => {
          chai.expect(noopConsume(test.results).join(",")).to.equal(test.expected);
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
        results: [],
        expected: "",
      },
      {
        results: [MapperResult.signal("see also", "See also")],
        expected: "0,See also,0,,0," + ReducerType.SIGNAL,
      },
    ].forEach((test) => {
      it(
        test.results.join(","),
        () => {
          chai.expect(signalConsume(test.results).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);

describe(
  "rootReducer()",
  () => {
    [
      {
        results: [],
        expected: "",
      },
      {
        results: [MapperResult.signal("see also", "See also"), MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: "3,See also,379,U.S.,241," + ReducerType.FULL,
      },
      {
        results: [MapperResult.id("id"), MapperResult.number("0"), MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: "1,,0,,0," + ReducerType.ID + "\n3,379,U.S.,241," + ReducerType.FULL,
      },
      {
        results: [MapperResult.number("379"), MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: "",
      },
      {
        results: [MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.id("id")],
        expected: "1,,0,,0," + ReducerType.ID,
      },
    ].forEach((test) => {
      it(
        test.results.join("\n"),
        () => {
          chai.expect(rootReducer(test.results).join("\n")).to.equal(test.expected);
        },
      );
    });
  },
);
