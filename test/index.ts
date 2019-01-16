import "mocha";

import * as chai from "chai";

import {
  sitation,
} from "../source/index";

describe("sitation()", () => {
  [
    {
      casebody: "",
      expected: [],
    },
    {
      casebody: "379 U. S. 241",
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
    it(test.casebody, () => {
      chai.expect(sitation(test.casebody)).to.deep.equal(test.expected);
    });
  });
});
