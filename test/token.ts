import "mocha";

import * as chai from "chai";

import {
  tokenize,
  Token,
} from "../source/token";

describe("tokenize()", function() {
  [
    {
      casebody: "",
      expected: [],
    },
    {
      casebody: "379 U. S. 241",
      expected: [["379", Token.NUMBER], ["U.S.", Token.REPORTER], ["241", Token.NUMBER]],
    },
    {
      casebody: "In Evans v. Laurel Links, Inc., id.",
      expected: [["In", Token.NOOP], ["Evans", Token.NOOP], ["v", Token.NOOP], ["Laurel", Token.NOOP], ["Links", Token.NOOP], ["Inc", Token.NOOP], ["Id", Token.ID]],
    },
  ].forEach((test) => {
    it(test.casebody, () => {
      chai.expect(tokenize(test.casebody)).to.equal(test.expected);
    });
  });
});
