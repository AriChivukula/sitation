import "mocha";

import * as chai from "chai";

import {
  tokenize,
  Token,
} from "../source/token";

describe("tokenize()", () => {
  [
    {
      casebody: "",
      expected: [],
    },
    {
      casebody: "379 u. S. 241",
      expected: "379:379:" + Token.NUMBER + ",U.S.:u. S.:" + Token.REPORTER + ",241:241:" + Token.NUMBER,
    },
    {
      casebody: "In Evans v. Laurel Links, Inc., id.",
      expected: "In:In:" + Token.NOOP + ",Evans:Evans:" + Token.NOOP + ",Va.:v.:" + Token.REPORTER + ",Laurel:Laurel:" + Token.NOOP + ",Links:Links:" + Token.NOOP + ",Inc:Inc:" + Token.NOOP + ",Id:id:" + Token.ID,
    },
  ].forEach((test) => {
    it(test.casebody, () => {
      chai.expect(tokenize(test.casebody).toString()).to.equal(test.expected);
    });
  });
});
