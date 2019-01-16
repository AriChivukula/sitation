import "mocha";

import * as chai from "chai";

import {
  match,
} from "../source/citation";
import {
  Token,
} from "../source/token";

describe("match()", () => {
  [
    {
      tokens: [],
      expected: [],
    },
    {
      tokens: [["379", __CasebodyToken.NUMBER], ["U.S.", __CasebodyToken.REPORTER], ["241", __CasebodyToken.NUMBER]],
      expected: ["379 U.S. 241"],
    },
  ].forEach((test) => {
    it(test.casebody, () => {
      chai.expect(match(test.tokens)).to.deep.equal(test.expected);
    });
  });
});
