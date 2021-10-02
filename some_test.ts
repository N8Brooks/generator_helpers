import "./main.ts";
import { assertEquals } from "https://deno.land/std@0.108.0/testing/asserts.ts";
import { range } from "./utility_generators.ts";

Deno.test("n=0", () => {
  const actual = range(0).some((value) => !!value);
  assertEquals(actual, false);
});

Deno.test("falsy", () => {
  const actual = range(1).some((value) => value);
  assertEquals(actual, false);
});

Deno.test("truthy", () => {
  const actual = range(5).some((value) => value === 4);
  assertEquals(actual, true);
});

Deno.test("falsy index", () => {
  const actual = range(5).some((_, index) => index === 6);
  assertEquals(actual, false);
});

Deno.test("truthy index", () => {
  const actual = range(5).some((_, index) => index === 4);
  assertEquals(actual, true);
});
