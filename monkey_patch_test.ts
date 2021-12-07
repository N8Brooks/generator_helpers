import {
  assertEquals,
  assertStrictEquals,
} from "https://deno.land/std@0.108.0/testing/asserts.ts";
import {
  generator,
  GeneratorFunction,
  iteratorHelpers,
} from "./monkey_patch.ts";

for (const helper of iteratorHelpers) {
  Deno.test(helper.name, () => {
    const actual = Object.getOwnPropertyDescriptor(
      GeneratorFunction,
      helper.name,
    );
    const expected = {
      writable: true,
      enumerable: false,
      configurable: true,
      value: helper,
    };
    assertEquals(actual, expected);
  });
}

Deno.test("Generator", () => {
  assertStrictEquals(GeneratorFunction.toString(), "[object Generator]");
});

Deno.test("generator", () => {
  assertEquals([...generator()], []);
});
