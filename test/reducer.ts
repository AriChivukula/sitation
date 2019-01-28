import "mocha";

import * as chai from "chai";

import {
  consumeFirst,
  consumeLoop,
  consumeMerge,
  ReducerResult,
} from "../source/reducer";

// TODO: https://github.com/AriChivukula/sitation/pull/21
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

// TODO: https://github.com/AriChivukula/sitation/pull/21
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
