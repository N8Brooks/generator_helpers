export function* iter<T>(iterable: Iterable<T>): Generator<T> {
  for (const value of iterable) {
    yield value;
  }
}
