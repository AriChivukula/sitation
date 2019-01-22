import "mocha";

import * as chai from "chai";

import {
  coalesce,
} from "../source/match";
import {
  Token,
  Segment,
  Segmented,
} from "../source/token";

describe("match()", () => {
  [
    {
      tokens: new Segmented([]),
      expected: [],
    },
    {
      tokens: new Segmented([new Segment("379", "379", Token.NUMBER), new Segment("U.S.", "U.S.", Token.REPORTER), new Segment("241", "241", Token.NUMBER)]),
      expected: ["379 U.S. 241"],
    },
    {
      tokens: new Segmented([new Segment("Id", "Id", Token.ID), new Segment("0", "0", Token.NUMBER), new Segment("379", "379", Token.NUMBER), new Segment("U.S.", "U.S.", Token.REPORTER), new Segment("241", "241", Token.NUMBER)]),
      expected: ["Id", "379 U.S. 241"],
    },
    {
      tokens: new Segmented([new Segment("379", "379", Token.NUMBER), new Segment("379", "379", Token.NUMBER), new Segment("U.S.", "U.S.", Token.REPORTER), new Segment("U.S.", "U.S.", Token.REPORTER), new Segment("241", "241", Token.NUMBER)]),
      expected: [],
    },
    {
      tokens: new Segmented([new Segment("379", "379", Token.NUMBER), new Segment("U.S.", "U.S.", Token.REPORTER), new Segment("Id", "Id", Token.ID)]),
      expected: ["Id"],
    },
  ].forEach((test) => {
    it(test.tokens.toString(), () => {
      // @ts-ignore
      chai.expect(coalesce(test.tokens)).to.deep.equal(test.expected);
    });
  });
});
