import {
  Token,
  Tokenized,
} from "./token";

export function match(tokens: Tokenized[]): string[] {
  const citations: string[] = [];
  idx = 0
  while (idx < tokens.length) {
    const token_a = tokens[idx];
    idx++;
    if (token_a[1] === Token.ID) {
      citations.push(token_a[0]);
      continue;
    }
    if (token_a[1] !== Token.NUMBER) {
      continue;
    }
    if (idx == tokens.length) {
      break;
    }
    const token_b = tokens[idx];
    if (token_b[1] !== Token.REPORTER) {
      continue;
    }
    idx++;
    if (idx == tokens.length) {
      break;
    }
    const token_c = tokens[idx];
    if (token_c[1] !== Token.NUMBER) {
      continue;
    }
    idx++;
    citations.push([token_a[0], token_b[0], token_c[0]].join(" "))
  }
  return citations;
}
