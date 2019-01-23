import "mocha";

import * as chai from "chai";

import {
  MapperType,
} from "../source/mapper";
import {
  editionMatch,
  variationMatch,
  numberMatch,
  idMatch,
  noopMatch,
} from "../source/mappers";

describe(
  "editionMatch()",
  () => {
    [
      {
        token: "",
        expected: "",
      },
      {
        token: "U.S.",
        expected: "U.S.:U.S.:" + MapperType.REPORTER,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(editionMatch(test.results).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);

describe(
  "variationMatch()",
  () => {
    [
      {
        token: "",
        expected: "",
      },
      {
        token: "U. s.",
        expected: "U.S.:U. s.:" + MapperType.REPORTER,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(variationMatch(test.results).join(",")).to.equal(test.expected);
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
        token: "",
        expected: "",
      },
      {
        token: "0",
        expected: "0:0:" + MapperType.NUMBER,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(numberMatch(test.results).join(",")).to.equal(test.expected);
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
        token: "",
        expected: "",
      },
      {
        token: "id",
        expected: "Id:id:" + MapperType.ID,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(idMatch(test.results).join(",")).to.equal(test.expected);
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
        token: "",
        expected: "",
      },
      {
        token: "r",
        expected: "r:r:" + MapperType.NOOP,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(noopMatch(test.results).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);
