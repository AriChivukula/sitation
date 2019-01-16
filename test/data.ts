import "mocha";

import * as chai from "chai";

import {
  reporters,
  editions,
  variations,
} from "../source/index";

it(
  "reporters",
  async (): Promise<void> => {
    chai.expect(Object.keys(reporters()).length).to.equal(0);
  },
);


it(
  "editions",
  async (): Promise<void> => {
    chai.expect(editions().length).to.equal(0);
  },
);


it(
  "variations",
  async (): Promise<void> => {
    chai.expect(Object.keys(variations()).length).to.equal(0);
  },
);
