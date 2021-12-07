import "./main.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

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
