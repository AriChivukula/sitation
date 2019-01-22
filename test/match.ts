import "mocha";

import * as chai from "chai";

import {
  coalesce,
} from "../source/match";
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
      tokens: [["379", "379", Token.NUMBER], ["U.S.", "U.S.", Token.REPORTER], ["241", "241", Token.NUMBER]],
      expected: ["379 U.S. 241"],
    },
    {
      tokens: [["Id", "Id", Token.ID], ["0", "0", Token.NUMBER], ["379", "379", Token.NUMBER], ["U.S.", "U.S.", Token.REPORTER], ["241", "241", Token.NUMBER]],
      expected: ["Id", "379 U.S. 241"],
    },
    {
      tokens: [["379", "379", Token.NUMBER], ["379", "379", Token.NUMBER], ["U.S.", "U.S.", Token.REPORTER], ["U.S.", "U.S.", Token.REPORTER], ["241", "241", Token.NUMBER]],
      expected: [],
    },
    {
      tokens: [["379", "379", Token.NUMBER], ["U.S.", "U.S.", Token.REPORTER], ["Id", "Id", Token.ID]],
      expected: ["Id"],
    },
  ].forEach((test) => {
    it(test.tokens.flat(1).join(":"), () => {
      // @ts-ignore
      chai.expect(coalesce(test.tokens)).to.deep.equal(test.expected);
    });
  });
});
