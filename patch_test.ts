import "./patch.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { range } from "./range.ts";

Deno.test("map((value) => 2 * x", () => {
  const actual = [...range(3).map((value) => 2 * value)];
  const expected = [0, 2, 4];
  assertEquals(actual, expected);
});

Deno.test("map((char) => char.upperCase()", () => {
  const actual = [...range(3).map((_, index) => 2 * index)];
  const expected = [0, 2, 4];
  assertEquals(actual, expected);
});

Deno.test("filter((value) => value % 3 === 0)", () => {
  const actual = [...range(10).filter((value) => value % 3 === 0)];
  const expected = [0, 3, 6, 9];
  assertEquals(actual, expected);
});

Deno.test("filter((_, index) => index === 5)", () => {
  const actual = [...range(10).filter((_, index) => index === 5)];
  const expected = [5];
  assertEquals(actual, expected);
});
