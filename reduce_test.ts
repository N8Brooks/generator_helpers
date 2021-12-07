import "./monkey_patch.ts";
import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { Iterator } from "./iterator.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

function add(a: number, b: number): number {
  return a + b;
}

Deno.test("n = 0", () => {
  assertThrows(
    () => range(0).reduce(add),
    TypeError,
    "Reduce of empty generator with no initial value",
  );
});

Deno.test("n = 1", () => {
  const actual = range(1).reduce(add);
  const expected = 0;
  assertEquals(actual, expected);
});

Deno.test("n = 5", () => {
  const actual = range(5).reduce(add);
  const expected = 10;
  assertEquals(actual, expected);
});

Deno.test("n = 0 with initial value of 10", () => {
  const actual = range(0).reduce(add, 10);
  const expected = 10;
  assertEquals(actual, expected);
});

Deno.test("n = 2 with initial value of -1", () => {
  const actual = range(2).reduce(add, -1);
  const expected = 0;
  assertEquals(actual, expected);
});

Deno.test("n = 5 with initial value of Infinity", () => {
  const actual = range(5).reduce(add, Infinity);
  const expected = Infinity;
  assertEquals(actual, expected);
});

Deno.test("U is different than t", () => {
  const input = [[1, 2], [3, 4], [5, 6, 7], [], [8]];
  const reducerFn = (a: number, b: number[]): number => a + b.length;
  const actual = Iterator.from(input).reduce(reducerFn, 2);
  const expected = 10;
  assertEquals(actual, expected);
});

Deno.test("reduce on arrays", () => {
  const input = [[1, 2], [3, 4], [5, 6, 7], [], [8]];
  const reducerFn = (a: number | number[], b: number[]): number => {
    if (Array.isArray(a)) {
      return a.length + b.length;
    } else {
      return a + b.length;
    }
  };
  const actual = Iterator.from(input).reduce(reducerFn);
  const expected = 8;
  assertEquals(actual, expected);
});

Deno.test("reduce on previous with initialValue", () => {
  const input = [8, -1, -1, -1, -1];
  const previous: number[] = [];
  const reducerFn = (a: number, _b: number, _i: number): number => {
    previous.push(a);
    return 2 * a;
  };
  assertEquals(Iterator.from(input).reduce(reducerFn, 2), 64);
  assertEquals(previous, [2, 4, 8, 16, 32]);
});

Deno.test("reduce on previous without initialValue", () => {
  const input = [8, -1, -1, -1, -1];
  const previous: number[] = [];
  const reducerFn = (a: number, _b: number, _i: number): number => {
    previous.push(a);
    return 2 * a;
  };
  assertEquals(Iterator.from(input).reduce(reducerFn), 128);
  assertEquals(previous, [8, 16, 32, 64]);
});

Deno.test("reduce on current with initialValue", () => {
  const input = [11, 22, 33, 44];
  const current: number[] = [];
  const reducerFn = (_a: number, b: number, _i: number): number => {
    current.push(b);
    return 0;
  };
  assertEquals(Iterator.from(input).reduce(reducerFn, 99), 0);
  assertEquals(current, [11, 22, 33, 44]);
});

Deno.test("reduce on current without initialValue", () => {
  const input = [11, 22, 33, 44];
  const current: number[] = [];
  const reducerFn = (_a: number, b: number, _i: number): number => {
    current.push(b);
    return 0;
  };
  assertEquals(Iterator.from(input).reduce(reducerFn), 0);
  assertEquals(current, [22, 33, 44]);
});

Deno.test("reduce on index with initialValue", () => {
  const input = "abcdefg";
  const indices: number[] = [];
  const reducerFn = (_a: string, _b: string, i: number): string => {
    indices.push(i);
    return "";
  };
  assertEquals(Iterator.from(input).reduce(reducerFn, ""), "");
  assertEquals(indices, [0, 1, 2, 3, 4, 5, 6]);
});

Deno.test("reduce on index without initialValue", () => {
  const input = "abcdefg";
  const indices: number[] = [];
  const reducerFn = (_a: string, _b: string, i: number): string => {
    indices.push(i);
    return "";
  };
  assertEquals(Iterator.from(input).reduce(reducerFn), "");
  assertEquals(indices, [1, 2, 3, 4, 5, 6]);
});
