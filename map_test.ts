import "./monkey_patch.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

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
