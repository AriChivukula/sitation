import "mocha";

import * as chai from "chai";

import {
  reporterRE,
  spacingRE,
} from "../source/re";

it(
  "reporterRegExp",
  async (): Promise<void> => {
    chai.expect(reporterRE().toString().length).to.equal(19735);
  },
);


it(
  "spacingRegExp",
  async (): Promise<void> => {
    chai.expect(spacingRE().toString().length).to.equal(18);
  },
);
