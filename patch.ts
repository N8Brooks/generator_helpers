import { take } from "./take.ts";

/** Patch Generator typing */
declare global {
  interface Generator {
    map: typeof map;
    filter: typeof filter;
    take: typeof take;
    toArray: typeof toArray;
  }
}

/** Callback function type used for some iterator helpers. */
export interface CallbackFn<T, U> {
  (value: T, index: number): U;
}

/** Array of helpers added to `Generator`. */
const iteratorHelpers = [
  map,
  filter,
  toArray,
  take,
];

main(); // apply monkey-patch

/** Applies iterator helper monkey-patch. */
function main() {
  const GeneratorFunction = Object.getPrototypeOf(function* () {}).prototype;
  const propertyDescriptors = iteratorHelpers.map(iteratorHelperToProperty);
  const propertyDescriptorMap = Object.fromEntries(propertyDescriptors);
  Object.defineProperties(GeneratorFunction, propertyDescriptorMap);
}

/** Yields `stop` `numbers` from `0` to `stop - 1`. */
export function* range(stop: number): Generator<number> {
  if (!Number.isInteger(stop)) {
    throw RangeError("stop must be an integer");
  }
  for (let i = 0; i < stop; i++) {
    yield i;
  }
}

/** Allows users to apply a function to every element returned from an iterator. */
function* map<T, U>(
  this: Generator<T>,
  mapperFn: CallbackFn<T, U>,
): Generator<U> {
  let index = 0;
  for (const value of this) {
    yield mapperFn(value, index);
    index += 1;
  }
}

/** Allows users to skip values from an iterator which do not pass a filter function. */
function* filter<T, U>(
  this: Generator<T>,
  filtererFn: CallbackFn<T, U>,
): Generator<T> {
  let index = 0;
  for (const value of this) {
    if (filtererFn(value, index)) {
      yield value;
    }
    index += 1;
  }
}

/** Transforms a generator to an array. */
function toArray<T>(this: Generator<T>): T[] {
  return [...this];
}

/** Returns an `Array` of name and object of property descriptors. */
function iteratorHelperToProperty(helper: typeof iteratorHelpers[number]) {
  return [helper.name, {
    writable: true,
    enumerable: false,
    configurable: true,
    value: helper,
  }];
}
