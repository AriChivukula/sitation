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
        chai.expect("{a".split(Expressions.escape())).to.deep.equal(["", "a"]);
      },
    );
    it(
      "range()",
      async (): Promise<void> => {
        chai.expect("419-21".split(Expressions.range())).to.deep.equal(["", "419-21", ""]);
        chai.expect("419!21".split(Expressions.range())).to.deep.equal(["", "!", "21"]);
      },
    );
    it(
      "reporter()",
      async (): Promise<void> => {
        chai.expect(" U.S. ".split(Expressions.reporter())).to.deep.equal(["", "U.S.", ""]);
        chai.expect(" U.P.S. ".split(Expressions.reporter())).to.deep.equal([" U.P.S. "]);
      },
    );
    it(
      "signal()",
      async (): Promise<void> => {
        chai.expect("See also FOO".split(Expressions.signal())).to.deep.equal(["See also", "FOO"]);
        chai.expect("Not also BAR".split(Expressions.signal())).to.deep.equal(["Not also BAR"]);
      },
    );
    it(
      "spacing()",
      async (): Promise<void> => {
        chai.expect("a b".split(Expressions.spacing())).to.deep.equal(["a", "b"]);
        chai.expect("ab".split(Expressions.spacing())).to.deep.equal(["ab"]);
      },
    );
  },
);
