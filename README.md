# generator_helpers

[![generator_helpers code coverage](https://img.shields.io/codecov/c/github/N8Brooks/generator_helpers?logo=deno)](https://app.codecov.io/gh/N8Brooks/generator_helpers)

This module monkey patches
[proposal-iterator-helpers](https://github.com/tc39/proposal-iterator-helpers)
onto JavaScript or TypeScript generators. After importing this module, methods
that can normally only be used on arrays can also be used on generators. Methods
that take a function as an argument are given the `value` and `index` of
elements as parameters. A list of all monkey patched methods is provided below.
Check the proposal-iterator-helpers repository for more information and
examples.

- [`.map(mapperFn)`](https://github.com/tc39/proposal-iterator-helpers#mapmapperfn)
- [`.filter(filtererFn)`](https://github.com/tc39/proposal-iterator-helpers#filterfiltererfn)
- [`.take(limit)`](https://github.com/tc39/proposal-iterator-helpers#takelimit)
- [`.drop(limit)`](https://github.com/tc39/proposal-iterator-helpers#droplimit)
- [`.asIndexedPairs()`](https://github.com/tc39/proposal-iterator-helpers#asindexedpairs)
- [`.flatMap(mapperFn)`](https://github.com/tc39/proposal-iterator-helpers#flatmapmapperfn)
- [`.reduce(reducer [, initialValue ])`](https://github.com/tc39/proposal-iterator-helpers#reducereducer--initialvalue-)
- [`.toArray()`](https://github.com/tc39/proposal-iterator-helpers#toarray)
- [`.forEach(fn)`](https://github.com/tc39/proposal-iterator-helpers#foreachfn)
- [`.some(fn)`](https://github.com/tc39/proposal-iterator-helpers#somefn)
- [`.every(fn)`](https://github.com/tc39/proposal-iterator-helpers#everyfn)
- [`.find(fn)`](https://github.com/tc39/proposal-iterator-helpers#findfn)

Additionally `range` is provided as a helper generator as well as the
`Iterator.from` method.

- `range(stop)`
- `range(start, stop [, step = 1 ])`
- [`.from(object)`](https://github.com/tc39/proposal-iterator-helpers#fromobject)

## Examples

### `.map(mapperFn)` and `.toArray()`

The `.map(mapperFn)` method yields the results of `mapperFn` called with the
`value` and `index` of every element passed as parameters.

The `.toArray()` method returns the generator cast to an `Array`.

```ts
import "https://deno.land/x/generator_helpers/monkey_patch.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function* lowercase(): Generator<string> {
  yield "a";
  yield "b";
  yield "c";
}

const uppercase = lowercase()
  .map((char) => char.toUpperCase())
  .toArray()
  .join("");

assertEquals(uppercase, "ABC");
```

### `range(limit)` and `.reduce(reducer [, initialValue ])`

The `range(stop)` or `range(start, stop [, step = 1 ])` function is not included
in iterator-helpers proposal, but is included as a utility. It yields from `0`
up to, but not included, the `y0` parameter. If `y1` and `yd` are provided it
yields from `y0` until `y1` with steps of `yd`. The `yd` parameter is `1` by
default.

The `.reduce(reducer [, initialValue ])` method applies the `reducer` function
to each value using the previous result for for the first parameter. The first
time it is called `initialValue` is used if provided or else the first item of
the generator. The third parameter that is provided to `mapperFn` is the current
`index`.

```ts
import { range } from "https://deno.land/x/generator_helpers/monkey_patch.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const sum = range(10).reduce((prev, cur) => prev + cur, 0);

assertEquals(sum, 45);
```

### `.flatMap(mapperFn)`

The `.flatMap(mapperFn)` method the results from calls to `mapperFn`. Thereby
flattening the generator one level.

```ts
import { range } from "https://deno.land/x/generator_helpers/monkey_patch.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const oneArray = range(5).flatMap((value) => Array(value).fill(value));

assertEquals(oneArray, [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]);
```
