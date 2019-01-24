import "mocha";

import * as chai from "chai";

import {
  Expressions,
} from "../source/expressions";

describe(
  "Expressions",
  async (): Promise<void> => {
    it(
      "escape",
      async (): Promise<void> => {
        chai.expect(Expressions.escape().toString().length).to.equal(32);
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
        chai.expect(Expressions.signal().toString().length).to.equal(9);
      },
    );
    it(
      "spacing",
      async (): Promise<void> => {
        chai.expect(Expressions.spacing().toString().length).to.equal(18);
      },
    );
  },
);
