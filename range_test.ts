import "./monkey_patch.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { range } from "./range.ts";

for (
  const n of [
    NaN,
    Math.PI,
    Number.MIN_VALUE,
    Number.MAX_VALUE,
    Infinity,
    -Infinity,
  ]
) {
  Deno.test(`range(${n})`, () => {
    assertThrows(
      () => [...range(n)],
      RangeError,
      "range() stop must be a safe integer",
    );
  });

  Deno.test(`range(0, ${n})`, () => {
    assertThrows(
      () => [...range(0, n)],
      RangeError,
      "range() stop must be a safe integer",
    );
  });

  Deno.test(`range(0, 10, ${n})`, () => {
    assertThrows(
      () => [...range(0, 10, n)],
      RangeError,
      "range() step must be a non-zero safe integer",
    );
  });
}

Deno.test(`range(Infinity, 10)`, () => {
  assertThrows(
    () => [...range(Infinity, 10)],
    RangeError,
    "range() start must be a safe integer",
  );
});

Deno.test(`range(0, 11, 0)`, () => {
  assertThrows(
    () => [...range(0, 10, 0)],
    RangeError,
    "range() step must be a non-zero safe integer",
  );
});

for (const n of [-100, -1, 0]) {
  Deno.test(`range(${n})`, () => {
    assertEquals([...range(n)], []);
  });
}

for (const n of [1, 10, 100]) {
  Deno.test(`range(${n})`, () => {
    const actual = [...range(n)];
    const expected = Array(Math.ceil(n)).fill(0).map((_, i) => i);
    assertEquals(actual, expected);
  });
}

for (const y0 of [-5, 0, 1, 4, 10]) {
  for (const y1 of [-5, 0, 1, 4, 10]) {
    Deno.test(`range(${y0}, ${y1})`, () => {
      const actual = [...range(y0, y1)];
      const expected: number[] = [];
      let n = y0;
      while (n < y1) {
        expected.push(n++);
      }
      assertEquals(actual, expected);
    });
  }
}

for (const y0 of [-5, 0, 1, 4, 10]) {
  for (const y1 of [-5, 0, 1, 4, 10]) {
    for (const yd of [1, 4, 10]) {
      Deno.test(`range(${y0}, ${y1}, ${yd})`, () => {
        const actual = [...range(y0, y1, yd)];
        const expected: number[] = [];
        let n = y0;
        while (n < y1) {
          expected.push(n);
          n += yd;
        }
        assertEquals(actual, expected);
      });
    }
  }
}

for (const y0 of [-5, 0, 1, 4, 10]) {
  for (const y1 of [-5, 0, 1, 4, 10]) {
    for (const yd of [-1, -4]) {
      Deno.test(`range(${y0}, ${y1}, ${yd})`, () => {
        const actual = [...range(y0, y1, yd)];
        const expected: number[] = [];
        let n = y0;
        while (n > y1) {
          expected.push(n);
          n += yd;
        }
        assertEquals(actual, expected);
      });
    }
  }
}
