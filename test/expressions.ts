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
        chai.expect("{".match(Expressions.escape())).to.equal([]);
      },
    );
    it(
      "range()",
      async (): Promise<void> => {
        chai.expect("419-21".match(Expressions.escape())).to.equal([]);
        chai.expect("419!21".match(Expressions.escape())).to.equal([]);
      },
    );
    it(
      "reporter()",
      async (): Promise<void> => {
        chai.expect("U.S.".match(Expressions.reporter())).to.equal([]);
        chai.expect("U.P.S.".match(Expressions.reporter())).to.equal([]);
      },
    );
    it(
      "signal()",
      async (): Promise<void> => {
        chai.expect("See also".match(Expressions.signal())).to.equal([]);
        chai.expect("Not also".match(Expressions.signal())).to.equal([]);
      },
    );
    it(
      "spacing()",
      async (): Promise<void> => {
        chai.expect(" ".match(Expressions.spacing())).to.equal([]);
        chai.expect("a".match(Expressions.spacing())).to.equal([]);
      },
    );
  },
);
