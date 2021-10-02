/** Yields `stop` `numbers` from `0` to `stop - 1`. */
export function* range(stop: number): Generator<number> {
  if (!Number.isInteger(stop)) {
    throw RangeError("stop must be an integer");
  }
  for (let i = 0; i < stop; i++) {
    yield i;
  }
}

/** Turns an iterable into an object. */
export function* iter<T>(iterable: Iterable<T>): Generator<T> {
  for (const value of iterable) {
    yield value;
  }
}
