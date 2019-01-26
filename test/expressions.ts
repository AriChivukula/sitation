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
        chai.expect("419!21".match(Expressions.range())).to.be.null;
      },
    );
    it(
      "reporter()",
      async (): Promise<void> => {
        chai.expect(" U.S. ".match(Expressions.reporter())).to.deep.equal(["U.S."]);
        chai.expect(" U.P.S. ".match(Expressions.reporter())).to.be.null;
      },
    );
    it(
      "signal()",
      async (): Promise<void> => {
        chai.expect("See".match(Expressions.signal())).to.deep.equal(["See"]);
        chai.expect("Not".match(Expressions.signal())).to.be.null;
      },
    );
    it(
      "spacing()",
      async (): Promise<void> => {
        chai.expect(" ".match(Expressions.spacing())).to.deep.equal([" "]);
        chai.expect("a".match(Expressions.spacing())).to.be.null;
      },
    );
  },
);
