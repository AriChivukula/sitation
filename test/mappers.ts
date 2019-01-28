import "mocha";

import * as chai from "chai";

import {
  MapperResult,
} from "../source/mapper";
import {
  idMatch,
  noopMatch,
  numberMatch,
  rangeMatch,
  reporterMatch,
  rootMapper,
  signalMatch,
} from "../source/mappers";

describe(
  "rangeMatch()",
  () => {
    [
      {
        description: "Empty",
        token: "",
        expected: [],
      },
      {
        description: "Basic",
        token: "419-21",
        expected: [MapperResult.range("419-21")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(rangeMatch(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "reporterMatch()",
  () => {
    [
      {
        description: "Empty",
        token: "",
        expected: [],
      },
      {
        description: "Basic",
        token: "u.s.",
        expected: [MapperResult.reporter("u.s.", "U.S.")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(reporterMatch(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "signalMatch()",
  () => {
    [
      {
        description: "Empty",
        token: "",
        expected: [],
      },
      {
        description: "Basic",
        token: "see also",
        expected: [MapperResult.signal("see also", "See also")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(signalMatch(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "numberMatch()",
  () => {
    [
      {
        description: "Empty",
        token: "",
        expected: [],
      },
      {
        description: "Basic",
        token: "0",
        expected: [MapperResult.number("0")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(numberMatch(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "idMatch()",
  () => {
    [
      {
        description: "Empty",
        token: "",
        expected: [],
      },
      {
        description: "Basic",
        token: "id",
        expected: [MapperResult.id("id")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(idMatch(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "noopMatch()",
  () => {
    [
      {
        description: "Empty",
        token: "",
        expected: [],
      },
      {
        description: "Basic",
        token: "r",
        expected: [MapperResult.noop("r")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(noopMatch(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);
