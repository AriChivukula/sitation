import "mocha";

import * as chai from "chai";

import {
  matchFirst,
  matchSplit,
  MapperType,
} from "../source/mapper";

// TODO: https://github.com/AriChivukula/sitation/pull/21
describe(
  "matchFirst()",
  () => {
    [
      {
        token: "",
        expected: "",
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(test.token).to.equal(test.expected);
        },
      );
    });
  },
);

// TODO: https://github.com/AriChivukula/sitation/pull/21
describe(
  "matchSplit()",
  () => {
    [
      {
        token: "",
        expected: "",
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(test.token).to.equal(test.expected);
        },
      );
    });
  },
);
