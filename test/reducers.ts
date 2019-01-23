import "mocha";

import * as chai from "chai";

import {
  MapperResult,
  MapperType,
} from "../source/mapper";
import {
  idCite,
  fullCite,
} from "../source/reducers";

describe(
  "idCite()",
  () => {
    [
      {
        results: [],
        expected: "",
      },
      {
        results: [new MapperResult("Id", "id", MapperType.NUMBER)],
        expected: "Id:1",
      },
    ].forEach((test) => {
      it(test.results.join(","), () => {
        // @ts-ignore
        chai.expect(idCite(test.results).toString()).to.equal(test.expected);
      });
    });
  },
);

describe(
  "fullCite()",
  () => {
    [
      {
        results: [],
        expected: "",
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: "379 U.S. 241:3",
      },
    ].forEach((test) => {
      it(test.results.join(","), () => {
        // @ts-ignore
        chai.expect(fullCite(test.results).toString()).to.equal(test.expected);
      });
    });
  },
);
