import "mocha";

import * as chai from "chai";

import {
  MapperResult,
} from "../source/mapper";
import {
  consumeFirst,
  consumeLoop,
  consumeMerge,
  ReducerResult,
} from "../source/reducer";

describe(
  "consumeFirst()",
  () => {
    [
      {
        description: "Empty",
        reducers: [],
        mapperResults: [],
        expected: [],
      },
      {
        description: "Basic",
        reducers: [
          () => [],
          () => [ReducerResult.pinpoint("1776")],
        ],
        mapperResults: [MapperResult.number("1776")],
        expected: [ReducerResult.pinpoint("1776")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(consumeFirst(test.reducers)(test.mapperResults).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "consumeMerge()",
  () => {
    [
      {
        description: "Empty",
        reducers: [],
        mapperResults: [],
        expected: [],
      },
      {
        description: "Basic",
        reducers: [
          () => [ReducerResult.pinpoint("1776")],
          () => [ReducerResult.pinpoint("1812")],
        ],
        mapperResults: [MapperResult.number("1776"), MapperResult.number("1812")],
        expected: [ReducerResult.pinpoint("1776"), ReducerResult.pinpoint("1812")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(consumeMerge(test.reducers)(test.mapperResults).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

// TODO: https://github.com/AriChivukula/sitation/pull/21
describe(
  "consumeLoop()",
  () => {
    [
      {
        description: "Empty",
        reducerFN: () => [],
        mapperResults: [],
        expected: [],
      },
      {
        description: "Basic",
        reducerFN: () => [ReducerResult.pinpoint("1776")],
        mapperResults: [MapperResult.number("1776")],
        expected: [ReducerResult.pinpoint("1776")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(consumeLoop(test.reducerFN)(test.mapperResults).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);
