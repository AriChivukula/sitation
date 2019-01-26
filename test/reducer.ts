import "mocha";

import * as chai from "chai";

import {
  consumeFirst,
  consumeLoop,
  consumeMerge,
} from "../source/reducer";

// TODO: https://github.com/AriChivukula/sitation/pull/21
describe(
  "consumeFirst()",
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
  "consumeLoop()",
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
  "consumeMerge()",
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
