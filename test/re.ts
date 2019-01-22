import "mocha";

import * as chai from "chai";

import {
  reporterRE,
  spacingRE,
} from "../source/re";

it(
  "reporterRE",
  async (): Promise<void> => {
    chai.expect(reporterRE().toString().length).to.equal(19735);
  },
);


it(
  "spacingRE",
  async (): Promise<void> => {
    chai.expect(spacingRE().toString().length).to.equal(18);
  },
);
