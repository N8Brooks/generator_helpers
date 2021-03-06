import "./monkey_patch.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

Deno.test("-1", () => {
  assertThrows(() => range(10).drop(-1).toArray());
});

Deno.test("NaN", () => {
  assertThrows(() => range(10).drop(NaN).toArray());
});

Deno.test("0", () => {
  const actual = range(10).drop(0).toArray();
  const expected = [...range(10)];
  assertEquals(actual, expected);
});

Deno.test("1", () => {
  const actual = range(3).drop(1).toArray();
  const expected = [1, 2];
  assertEquals(actual, expected);
});

Deno.test("3", () => {
  const actual = range(3).drop(3).toArray();
  assertEquals(actual, []);
});

Deno.test("10", () => {
  const actual = range(3).drop(10).toArray();
  assertEquals(actual, []);
});
