import "./main.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

for (const n of [NaN, Infinity, -Infinity]) {
  Deno.test(`range(${n})`, () => {
    assertThrows(
      () => [...range(n)],
      RangeError,
      "range() y0 must be a finite number",
    );
  });

  Deno.test(`range(0, ${n})`, () => {
    assertThrows(
      () => [...range(0, n)],
      RangeError,
      "range() y1 must be a finite number",
    );
  });

  Deno.test(`range(0, 10, ${n})`, () => {
    assertThrows(
      () => [...range(0, 10, n)],
      RangeError,
      "range() yd argument must be a non-zero finite number",
    );
  });
}

for (const n of [-Number.MIN_VALUE, -1, 0]) {
  Deno.test(`range(${n})`, () => {
    assertEquals([...range(n)], []);
  });
}

for (const n of [1, 0.5, Math.PI, 10, 100]) {
  Deno.test(`range(${n})`, () => {
    const actual = [...range(n)];
    const expected = Array(Math.ceil(n)).fill(0).map((_, i) => i);
    assertEquals(actual, expected);
  });
}

Deno.test(`range(0, 11, 0)`, () => {
  assertThrows(
    () => [...range(0, 10, 0)],
    RangeError,
    "range() yd argument must be a non-zero finite number",
  );
});

for (const y0 of [-5, 0, 1, 0.5, 10]) {
  for (const y1 of [-5, 0, 1, 0.5, 10]) {
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

for (const y0 of [-5, 0, 1, 0.5, 10]) {
  for (const y1 of [-5, 0, 1, 0.5, 10]) {
    for (const yd of [1, 0.5, 10]) {
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

for (const y0 of [-5, 0, 1, 0.5, 10]) {
  for (const y1 of [-5, 0, 1, 0.5, 10]) {
    for (const yd of [-1, -3.7]) {
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
