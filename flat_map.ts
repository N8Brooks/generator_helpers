import { CallbackFn } from "./function_types.ts";

export function* flatMap<T, U>(
  this: Iterable<T>,
  mapperFn: CallbackFn<T, Iterable<U>>,
): Generator<U> {
  let index = 0;
  for (const iterable of this) {
    for (const value of mapperFn(iterable, index)) {
      yield value;
    }
    index += 1;
  }
}
