import { ReducerFn } from "./function_types.ts";

export function reduce<T, U>(
  this: Generator<T>,
  reducerFn: ReducerFn<T, U>,
  initialValue?: U,
): U {
  const iterator = this[Symbol.iterator]();
  let previousValue: U = initialValue === undefined
    ? iterator.next().value
    : initialValue;
  if (previousValue === undefined) {
    throw TypeError("Reduce of empty generator with no initial value");
  }
  let index = 0;
  for (const currentValue of iterator) {
    previousValue = reducerFn(previousValue, currentValue, index);
    index += 1;
  }
  return previousValue;
}
