import "mocha";

import * as chai from "chai";

import {
  DB,
} from "../source/data";

describe(
  "DB",
  async (): Promise<void> => {
    it(
      "reporters",
      async (): Promise<void> => {
        chai.expect(Object.keys(DB.reporters()).length).to.equal(1014);
        chai.expect(Object.keys(DB.reporters())[0]).to.equal("a. 2d");
        chai.expect(Object.values(DB.reporters())[0]).to.equal("A.2d");
      },
    );
    it(
      "signals",
      async (): Promise<void> => {
        chai.expect(Object.keys(DB.signals()).length).to.equal(529);
        chai.expect(Object.keys(DB.signals())[0]).to.equal("a.");
        chai.expect(Object.values(DB.signals())[0]).to.equal("A.");
      },
    );
  },
);
