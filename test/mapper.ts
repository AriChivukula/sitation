import "mocha";

import * as chai from "chai";

import {
  matchFirst,
  matchSplit,
} from "../source/mapper";

describe(
  "matchFirst()",
  () => {
    [
      {
        mappers: [],
        token: "EMPTY TEST",
        expected: [],
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(matchFirst(test.mappers)(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "matchSplit()",
  () => {
    [
      {
        splitterFN: () => [],
        mapperFN: () => [],
        token: "EMPTY TEST",
        expected: [],
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(matchSplit(test.splitterFN, test.mapperFN)(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);
