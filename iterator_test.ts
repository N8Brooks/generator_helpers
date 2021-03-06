import "./monkey_patch.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { Iterator } from "./iterator.ts";

function* range(stop: number) {
  for (let n = 0; n < stop; n++) {
    yield n;
  }
}

Deno.test("n = 0", () => {
  const actual = [...Iterator.from(range(0))];
  assertEquals(actual, []);
});

Deno.test("string", () => {
  const actual = [...Iterator.from("abc")];
  const expected = ["a", "b", "c"];
  assertEquals(actual, expected);
});

Deno.test("range", () => {
  const actual = [...Iterator.from(range(5))];
  const expected = [...range(5)];
  assertEquals(actual, expected);
});
