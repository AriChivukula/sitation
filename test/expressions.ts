import "mocha";

import * as chai from "chai";

import {
  Expressions,
} from "../source/expressions";

describe(
  "Expressions",
  async (): Promise<void> => {
    it(
      "escape()",
      async (): Promise<void> => {
        chai.expect("{}.".replace(Expressions.escape(), "\\$&")).to.equal("");
      },
    );
    it(
      "range()",
      async (): Promise<void> => {
        chai.expect("419-21".match(Expressions.escape())).to.be.true;
        chai.expect("419!21".match(Expressions.escape())).to.be.false;
      },
    );
    it(
      "reporter()",
      async (): Promise<void> => {
        chai.expect("U.S.".match(Expressions.reporter())).to.be.true;
        chai.expect("U.P.S.".match(Expressions.reporter())).to.be.false;
      },
    );
    it(
      "signal()",
      async (): Promise<void> => {
        chai.expect("See also".match(Expressions.signal())).to.be.true;
        chai.expect("Not also".match(Expressions.signal())).to.be.false;
      },
    );
    it(
      "spacing()",
      async (): Promise<void> => {
        chai.expect(" ".match(Expressions.spacing())).to.be.true;
        chai.expect("a".match(Expressions.spacing())).to.be.false;
      },
    );
  },
);
