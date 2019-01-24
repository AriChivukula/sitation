import "mocha";

import * as chai from "chai";

import {
  DB,
} from "../source/db";

describe(
  "DB",
  async (): Promise<void> => {
    it(
      "reporters",
      async (): Promise<void> => {
        chai.expect(Object.keys(DB.reporters()).length).to.equal(1515);
        chai.expect(Object.keys(DB.reporters())[0]).to.equal("a.");
        chai.expect(Object.values(DB.reporters())[0]).to.equal("A.");
      },
    );
    it(
      "signals",
      async (): Promise<void> => {
        chai.expect(Object.keys(DB.signals()).length).to.equal(12);
        chai.expect(Object.keys(DB.signals())[0]).to.equal("and");
        chai.expect(Object.values(DB.signals())[0]).to.equal("and");
      },
    );
  },
);
