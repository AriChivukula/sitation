import "mocha";

import * as chai from "chai";

import {
  MapperResult,
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
        results: [MapperResult.id("id")],
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
        results: [MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
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
        results: [MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: "3:379 U.S. 241",
      },
      {
        results: [MapperResult.id("id"), MapperResult.number("0"), MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: "1:Id,3:379 U.S. 241",
      },
      {
        results: [MapperResult.number("379"), MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.reporter("U.S.", "U.S."), MapperResult.number("241")],
        expected: "",
      },
      {
        results: [MapperResult.number("379"), MapperResult.reporter("U.S.", "U.S."), MapperResult.id("id")],
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
