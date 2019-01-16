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
      tokens: [["379", Token.NUMBER], ["U.S.", Token.REPORTER], ["241", Token.NUMBER]],
      expected: ["379 U.S. 241"],
    },
    {
      tokens: [["Id", Token.ID], ["0", Token.NUMBER], ["379", Token.NUMBER], ["U.S.", Token.REPORTER], ["241", Token.NUMBER]],
      expected: ["Id", "379 U.S. 241"],
    },
    {
      tokens: [["379", Token.NUMBER], ["379", Token.NUMBER], ["U.S.", Token.REPORTER], ["U.S.", Token.REPORTER], ["241", Token.NUMBER]],
      expected: [],
    },
    {
      tokens: [["379", Token.NUMBER], ["U.S.", Token.REPORTER], ["Id", Token.ID]],
      expected: ["Id"],
    },
  ].forEach((test) => {
    it(test.casebody, () => {
      chai.expect(match(test.tokens)).to.deep.equal(test.expected);
    });
  });
});
