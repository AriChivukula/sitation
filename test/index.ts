import "mocha";

import * as chai from "chai";

import {
  sitation,
} from "../source/index";

describe(
  "sitation()",
  () => {
    [
      {
        casebody: "",
        expected: "",
      },
      {
        casebody: "379 u. S. 241",
        expected: "3,,379,U.S.,241,1",
      },
      {
        casebody: "In Evans v. Laurel Links, Inc., 261 F. Supp. 474, 477 (ED Va. 1966), a class action brought",
        expected: "3,,261,F. Supp.,474,1",
      },
      {
        casebody: "See, e. g., Birchem v. Knights of Columbus, 116 F.3d 310, 312-313 (CA8 1997); cf. Nationwide Mut. Ins. Co. v. Darden, 503 U. S. 318, 322323 (1992); Id. at 435",
        expected: "9,See\, e. g.\,,116,F.3d,310,1\n10,cf.,503,U.S.,318,1\n1,,0,,0,0",
      },
    ].forEach((test) => {
      it(
        test.casebody,
        () => {
          chai.expect(sitation(test.casebody)).to.equal(test.expected);
        },
      );
    });
  },
);
