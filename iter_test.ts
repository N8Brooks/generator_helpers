import "./main.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { iter } from "./iter.ts";
import { range } from "./range.ts";

Deno.test("n = 0", () => {
  const actual = iter("").toArray();
  assertEquals(actual, []);
});

Deno.test("n = 1", () => {
  const actual = iter([0]).toArray();
  const expected = [0];
  assertEquals(actual, expected);
});

Deno.test("n = 10", () => {
  const actual = iter(range(10)).toArray();
  const expected = [...range(10)];
  assertEquals(actual, expected);
});
