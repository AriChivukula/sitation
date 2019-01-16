import "mocha";

import * as chai from "chai";

import {
  reporterRegExp,
  spacingRegExp,
} from "../source/re";

it(
  "reporterRegExp",
  async (): Promise<void> => {
    chai.expect(reporterRegExp().toString().length).to.equal(6550);
  },
);


it(
  "spacingRegExp",
  async (): Promise<void> => {
    chai.expect(spacingRegExp().toString().length).to.equal(18);
  },
);
