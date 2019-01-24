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
  rootMapper,
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
          chai.expect(editionMatch(test.token).join(",")).to.equal(test.expected);
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
        expected: "U. s.:U.S.:" + MapperType.REPORTER,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(variationMatch(test.token).join(",")).to.equal(test.expected);
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
          chai.expect(numberMatch(test.token).join(",")).to.equal(test.expected);
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
        expected: "id:Id:" + MapperType.ID,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(idMatch(test.token).join(",")).to.equal(test.expected);
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
          chai.expect(noopMatch(test.token).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);

describe(
  "rootMapper()",
  () => {
    [
      {
        casebody: "",
        expected: "",
      },
      {
        casebody: "379 u. S. 241",
        expected: "379:379:" + MapperType.NUMBER + ",u. S.:U.S.:" + MapperType.REPORTER + ",241:241:" + MapperType.NUMBER,
      },
      {
        casebody: "In Evans v. Laurel Links, Inc., id.",
        expected: "In:In:" + MapperType.NOOP + ",Evans:Evans:" + MapperType.NOOP + ",v.:Va.:" + MapperType.REPORTER + ",Laurel:Laurel:" + MapperType.NOOP + ",Links:Links:" + MapperType.NOOP + ",Inc:Inc:" + MapperType.NOOP + ",id:Id:" + MapperType.ID,
      },
    ].forEach((test) => {
      it(
        test.casebody,
        () => {
          chai.expect(rootMapper(test.casebody).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);
