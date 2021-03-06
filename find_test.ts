import "./monkey_patch.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

Deno.test("n = 0", () => {
  const callbackFn = (_: number) => true;
  const actual = range(0).find(callbackFn);
  assertEquals(actual, undefined);
  assertEquals(callbackFn(0), true);
});

Deno.test("falsy", () => {
  const callbackFn = (value: number) => Number.isNaN(value);
  const actual = range(10).find(callbackFn);
  assertEquals(actual, undefined);
});

Deno.test("truthy", () => {
  const callbackFn = ((value: number) => value % 2 === 0);
  const actual = range(10).find(callbackFn);
  assertEquals(actual, 0);
});

Deno.test("falsy with index", () => {
  const callbackFn = (_: number, index: number) => index < -5;
  const actual = range(10).find(callbackFn);
  assertEquals(actual, undefined);
});

Deno.test("truthy with index", () => {
  const callbackFn = (_: number, index: number) => index === 5;
  const actual = range(10).find(callbackFn);
  assertEquals(actual, 5);
});
