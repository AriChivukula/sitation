import "mocha";

import * as chai from "chai";

import {
  coalesce,
  sitation,
  tokenize,
} from "../source/index";
import {
  Token,
  Segment,
  Segmented,
} from "../source/token";

describe(
  "tokenize()",
  () => {
    [
      {
        casebody: "",
        expected: "",
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
  },
);

describe(
  "coalesce()",
  () => {
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
  },
);

describe(
  "sitation()",
  () => {
    [
      {
        casebody: "",
        expected: [],
      },
      {
        casebody: "379 u. S. 241",
        expected: ["379 U.S. 241"],
      },
      {
        casebody: "In Evans v. Laurel Links, Inc., 261 F. Supp. 474, 477 (ED Va. 1966), a class action brought",
        expected: ["261 F. Supp. 474"],
      },
      {
        casebody: "See, e. g., Birchem v. Knights of Columbus, 116 F.3d 310, 312-313 (CA8 1997); cf. Nationwide Mut. Ins. Co. v. Darden, 503 U. S. 318, 322323 (1992); Id. at 435",
        expected: ["116 F.3d 310", "503 U.S. 318", "Id"],
      },
    ].forEach((test) => {
      it(
        test.casebody,
        () => {
          chai.expect(sitation(test.casebody)).to.deep.equal(test.expected);
        },
      );
    });
  },
);
