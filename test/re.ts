import "mocha";

import * as chai from "chai";

import {
  reporterRegExp,
  spacingRegExp,
} from "../source/index";

it(
  "reporterRegExp",
  async (): Promise<void> => {
    chai.expect(reporterRegExp().length).to.equal(457);
  },
);


it(
  "spacingRegExp",
  async (): Promise<void> => {
    chai.expect(spacingRegExp().length).to.equal(457);
  },
);
