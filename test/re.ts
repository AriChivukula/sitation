import "mocha";

import * as chai from "chai";

import {
  reporterRegExp,
  spacingRegExp,
} from "../source/index";

it(
  "reporterRegExp",
  async (): Promise<void> => {
    chai.expect(reporterRegExp().toString().length).to.equal(6548);
  },
);


it(
  "spacingRegExp",
  async (): Promise<void> => {
    chai.expect(spacingRegExp().toString().length).to.equal(14);
  },
);