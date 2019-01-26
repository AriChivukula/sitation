import "mocha";

import * as chai from "chai";

import {
  sitation,
} from "../source/index";

// TODO: https://github.com/AriChivukula/sitation/pull/21
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
        expected: "3,,379,U.S.,241,,1",
      },
      {
        casebody: "In Evans v. Laurel Links, Inc., 261 F. Supp. 474, 477 (ED Va. 1966), a class action brought",
        expected: "4,,261,F. Supp.,474,477,1",
      },
      {
        casebody: "See, e. g., Birchem v. Knights of Columbus, 116 F.3d 310, 312-313 (CA8 1997); cf. Nationwide Mut. Ins. Co. v. Darden, 503 U. S. 318, 322323 (1992); Id. at 435",
        expected: "10,See, e.g.,,116,F.3d,310,312-313,1\n12,Cf.,503,U.S.,318,322323;1992,1\n1,,0,,0,,0",
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
