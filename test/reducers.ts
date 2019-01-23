import "mocha";

import * as chai from "chai";

import {
  MapperResult,
  MapperType,
} from "../source/mapper";
import {
  idConsume,
  fullConsume,
  rootReducer,
} from "../source/reducers";

describe(
  "idConsume()",
  () => {
    [
      {
        results: [],
        expected: "",
      },
      {
        results: [new MapperResult("Id", "id", MapperType.ID)],
        expected: "1:Id",
      },
    ].forEach((test) => {
      it(
        test.results.join(","),
        () => {
          chai.expect(idConsume(test.results).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);

describe(
  "fullConsume()",
  () => {
    [
      {
        results: [],
        expected: "",
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: "3:379 U.S. 241",
      },
    ].forEach((test) => {
      it(
        test.results.join(","),
        () => {
          chai.expect(fullConsume(test.results).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);

describe(
  "rootReducer()",
  () => {
    [
      {
        results: [],
        expected: "",
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: "3:379 U.S. 241",
      },
      {
        results: [new MapperResult("Id", "Id", MapperType.ID), new MapperResult("0", "0", MapperType.NUMBER), new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: "1:Id,3:379 U.S. 241",
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("241", "241", MapperType.NUMBER)],
        expected: "",
      },
      {
        results: [new MapperResult("379", "379", MapperType.NUMBER), new MapperResult("U.S.", "U.S.", MapperType.REPORTER), new MapperResult("Id", "Id", MapperType.ID)],
        expected: "1:Id",
      },
    ].forEach((test) => {
      it(
        test.results.join(","),
        () => {
          chai.expect(rootReducer(test.results).join(",")).to.equal(test.expected);
        },
      );
    });
  },
);
