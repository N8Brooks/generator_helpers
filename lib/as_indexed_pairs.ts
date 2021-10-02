export function* asIndexedPairs<T>(this: Generator<T>): Generator<[number, T]> {
  let index = 0;
  for (const value of this) {
    yield [index, value];
    index += 1;
  }
}
