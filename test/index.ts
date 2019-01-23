import "mocha";

import * as chai from "chai";

import {
  coalesce,
  sitation,
  tokenize,
} from "../source/index";
import {
  MapperResult,
  MapperType,
} from "../source/mapper";

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
        expected: "379:379:" + MapperType.NUMBER + ",U.S.:u. S.:" + MapperType.REPORTER + ",241:241:" + MapperType.NUMBER,
      },
      {
        casebody: "In Evans v. Laurel Links, Inc., id.",
        expected: "In:In:" + MapperType.NOOP + ",Evans:Evans:" + MapperType.NOOP + ",Va.:v.:" + MapperType.REPORTER + ",Laurel:Laurel:" + MapperType.NOOP + ",Links:Links:" + MapperType.NOOP + ",Inc:Inc:" + MapperType.NOOP + ",Id:id:" + MapperType.ID,
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
        results: [],
        expected: [],
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: ["379 U.S. 241"],
      },
      {
        results: [new MapperResult("Id", "Id", MapperType.ID), new MapperResult("0", "0", MapperType.NUMBER), new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: ["Id", "379 U.S. 241"],
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: [],
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("Id", "Id", MapperType.ID)],
        expected: ["Id"],
      },
    ].forEach((test) => {
      it(test.results.join(","), () => {
        // @ts-ignore
        chai.expect(coalesce(test.parts)).to.deep.equal(test.expected);
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
