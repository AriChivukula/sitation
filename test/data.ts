import "mocha";

import * as chai from "chai";

import {
  Expressions,
  DB,
} from "../source/data";

describe(
  "DB",
  async (): Promise<void> => {
    it(
      "reporters",
      async (): Promise<void> => {
        chai.expect(Object.keys(DB.reporters()).length).to.equal(457);
        chai.expect(Object.keys(DB.reporters())[0]).to.equal("A.");
      },
    );
    it(
      "editions",
      async (): Promise<void> => {
        chai.expect(Object.keys(DB.editions()).length).to.equal(529);
        chai.expect(Object.keys(DB.editions())[0]).to.equal("a.");
        chai.expect(Object.values(DB.editions())[0]).to.equal("A.");
      },
    );
    it(
      "variations",
      async (): Promise<void> => {
        chai.expect(Object.keys(DB.variations()).length).to.equal(1014);
        chai.expect(Object.keys(DB.variations())[0]).to.equal("a. 2d");
        chai.expect(Object.values(DB.variations())[0]).to.equal("A.2d");
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

describe(
  "Expressions",
  async (): Promise<void> => {
    it(
      "escape",
      async (): Promise<void> => {
        chai.expect(Expressions.escape().toString().length).to.equal(18);
      },
    );
    it(
      "reporter",
      async (): Promise<void> => {
        chai.expect(Expressions.reporter().toString().length).to.equal(19735);
      },
    );
    it(
      "signal",
      async (): Promise<void> => {
        chai.expect(Expressions.signal().toString().length).to.equal(18);
      },
    );
    it(
      "spacing",
      async (): Promise<void> => {
        chai.expect(Expressions.spacing().toString().length).to.equal(18);
      },
    );
    it(
      "pinpoint",
      async (): Promise<void> => {
        chai.expect(Expressions.pinpoint().toString().length).to.equal(18);
      },
    );
  },
);
