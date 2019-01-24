import "mocha";

import * as chai from "chai";

import {
  MapperType,
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
        token: "",
        expected: "",
      },
      {
        token: "419-21,",
        expected: "419-21\,,419-21\,," + MapperType.RANGE,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(rangeMatch(test.token).join("\n")).to.equal(test.expected);
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
        token: "",
        expected: "",
      },
      {
        token: "U.S.",
        expected: "U.S.,U.S.," + MapperType.REPORTER,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(reporterMatch(test.token).join("\n")).to.equal(test.expected);
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
        token: "",
        expected: "",
      },
      {
        token: "see also",
        expected: "see also,See also," + MapperType.SIGNAL,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(signalMatch(test.token).join("\n")).to.equal(test.expected);
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
        expected: "0,0," + MapperType.NUMBER,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(numberMatch(test.token).join("\n")).to.equal(test.expected);
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
        expected: "id,Id," + MapperType.ID,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(idMatch(test.token).join("\n")).to.equal(test.expected);
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
        expected: "r,r," + MapperType.NOOP,
      },
    ].forEach((test) => {
      it(
        test.token,
        () => {
          chai.expect(noopMatch(test.token).join("\n")).to.equal(test.expected);
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
        casebody: "see also 379 u. S. 241",
        expected: "see also,See also," + MapperType.SIGNAL + "\n379,379," + MapperType.NUMBER + "\nu. S.,U.S.," + MapperType.REPORTER + "\n241,241," + MapperType.NUMBER,
      },
      {
        casebody: "In Evans v. Laurel Links, Inc., id.",
        expected: "In,In," + MapperType.NOOP + "\nEvans,Evans," + MapperType.NOOP + "\nv.,Va.," + MapperType.REPORTER + "\nLaurel,Laurel," + MapperType.NOOP + "\nLinks,Links," + MapperType.NOOP + "\nInc,Inc," + MapperType.NOOP + "\nid,Id," + MapperType.ID,
      },
    ].forEach((test) => {
      it(
        test.casebody,
        () => {
          chai.expect(rootMapper(test.casebody).join("\n")).to.equal(test.expected);
        },
      );
    });
  },
);
