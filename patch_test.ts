import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { range } from "./patch.ts";

for (const n of [NaN, -Infinity, Infinity, 1 / 7, 0.5, Math.PI]) {
  Deno.test(n.toString(), () => {
    assertThrows(
      () => [...range(n)],
      RangeError,
      "stop must be an integer",
    );
  });
}

for (const n of [-Number.MAX_SAFE_INTEGER, -10, -1, 0]) {
  Deno.test(n.toString(), () => {
    assertEquals([...range(n)], []);
  });
}

for (const n of [1, 2, 5, 10, 100]) {
  Deno.test(n.toString(), () => {
    const actual = [...range(n)];
    const expected = Array(n).fill(null).map((_, i) => i);
    assertEquals(actual, expected);
  });
}

Deno.test("map((element) => 2 * x", () => {
  const actual = [...range(3).map((element) => 2 * element)];
  const expected = [0, 2, 4];
  assertEquals(actual, expected);
});

Deno.test("map((char) => char.upperCase()", () => {
  const actual = [...range(3).map((_, index) => 2 * index)];
  const expected = [0, 2, 4];
  assertEquals(actual, expected);
});
