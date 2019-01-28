import "mocha";

import * as chai from "chai";

import {
  matchFirst,
  matchSplit,
  MapperResult,
} from "../source/mapper";

describe(
  "matchFirst()",
  () => {
    [
      {
        description: "Empty",
        mappers: [],
        token: "blah",
        expected: [],
      },
      {
        description: "Basic",
        mappers: [
          () => [],
          () => [MapperResult.number("1776")]
        ],
        token: "blah",
        expected: [MapperResult.number("1776")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(matchFirst(test.mappers)(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);

describe(
  "matchSplit()",
  () => {
    [
      {
        description: "Empty",
        splitterFN: () => [],
        mapperFN: () => [],
        token: "blah",
        expected: [],
      },
      {
        description: "Basic",
        splitterFN: (token: string) => token.split("la"),
        mapperFN: (token: string) => {
          if (token === "b") {
            return [MapperResult.number("1776")];
          } else if (token === "h") {
            return [MapperResult.number("1812")];
          }
          return [MapperResult.number("2016")];
        },
        token: "blah",
        expected: [MapperResult.number("1776"), MapperResult.number("1812")],
      },
    ].forEach((test) => {
      it(
        test.description,
        () => {
          chai.expect(matchSplit(test.splitterFN, test.mapperFN)(test.token).join("\n")).to.equal(test.expected.join("\n"));
        },
      );
    });
  },
);
