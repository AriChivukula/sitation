import "mocha";

import * as chai from "chai";

import {
  reporters,
  editions,
  variations,
} from "../source/data";

it(
  "reporters",
  async (): Promise<void> => {
    chai.expect(Object.keys(reporters()).length).to.equal(457);
    chai.expect(Object.keys(reporters())[0]).to.equal("A.");
  },
);


it(
  "editions",
  async (): Promise<void> => {
    chai.expect(Object.keys(editions()).length).to.equal(529);
    chai.expect(Object.keys(editions())[0]).to.equal("A.");
  },
);


it(
  "variations",
  async (): Promise<void> => {
    chai.expect(Object.keys(variations()).length).to.equal(1023);
    chai.expect(Object.keys(variations())[0]).to.equal("A. 2d");
  },
);
