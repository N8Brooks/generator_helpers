import { ReducerFn } from "./function_types.ts";

/** Applies a function to every element returned from a generator, while keeping track of the most recent result of the reducer. */
export function reduce<T, U>(
  this: Generator<T>,
  reducerFn: ReducerFn<T, U>,
  initialValue?: U,
): U {
  const iterator = this[Symbol.iterator]();
  let previousValue: U, index: number;
  if (initialValue === undefined) {
    previousValue = iterator.next().value;
    index = 1;
    if (previousValue === undefined) {
      throw TypeError("Reduce of empty generator with no initial value");
    }
  } else {
    previousValue = initialValue;
    index = 0;
  }
  for (const currentValue of iterator) {
    previousValue = reducerFn(previousValue, currentValue, index);
    index += 1;
  }
  return previousValue;
}
