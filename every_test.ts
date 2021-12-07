import "./monkey_patch.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

Deno.test("n = 0", () => {
  const callbackFn = (value: number) => value;
  const actual = range(0).every(callbackFn);
  assertEquals(callbackFn(1), 1);
  assertEquals(actual, true);
});

Deno.test("truthy", () => {
  const actual = range(5).every((value) => value >= 0);
  assertEquals(actual, true);
});

Deno.test("falsy", () => {
  const actual = range(5).every((value) => value < 4);
  assertEquals(actual, false);
});
