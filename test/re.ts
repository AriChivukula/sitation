import "mocha";

import * as chai from "chai";

import {
  Expressions,
} from "../source/re";

it(
  "reporter",
  async (): Promise<void> => {
    chai.expect(Expressions.reporter().toString().length).to.equal(19735);
  },
);


it(
  "spacing",
  async (): Promise<void> => {
    chai.expect(Expressions.spacing().toString().length).to.equal(18);
  },
);
