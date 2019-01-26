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
        chai.expect("{a".match(Expressions.escape())).to.deep.equal(["{"]);
      },
    );
    it(
      "range()",
      async (): Promise<void> => {
        chai.expect("419-21".match(Expressions.range())).to.deep.equal(["419-21"]);
        chai.expect("419!21".match(Expressions.range())).to.deep.equal([]);
      },
    );
    it(
      "reporter()",
      async (): Promise<void> => {
        chai.expect("U.S.".match(Expressions.reporter())).to.deep.equal(["U.S."]);
        chai.expect("U.P.S.".match(Expressions.reporter())).to.deep.equal([]);
      },
    );
    it(
      "signal()",
      async (): Promise<void> => {
        chai.expect("See also".match(Expressions.signal())).to.deep.equal(["See also"]);
        chai.expect("Not also".match(Expressions.signal())).to.deep.equal([]);
      },
    );
    it(
      "spacing()",
      async (): Promise<void> => {
        chai.expect(" ".match(Expressions.spacing())).to.deep.equal([" "]);
        chai.expect("a".match(Expressions.spacing())).to.deep.equal([]);
      },
    );
  },
);
