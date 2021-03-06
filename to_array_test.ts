import "./monkey_patch.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

Deno.test("n = 0", () => {
  assertEquals(range(0).toArray(), []);
});

Deno.test("n = 1", () => {
  const actual = range(1).toArray();
  const expected = [0];
  assertEquals(actual, expected);
});

Deno.test("n = 10", () => {
  const actual = range(10).toArray();
  const expected = [...range(10)];
  assertEquals(actual, expected);
});
