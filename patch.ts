const iteratorHelpers = [
  map,
  toArray,
];

main(); // apply monkey-patch

/** Patch Generator typing */
declare global {
  interface Generator {
    map: typeof map;
    toArray: typeof toArray;
  }
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

/** Callback function type used for some iterator helpers. */
interface CallbackFunction<T, U> {
  (value: T, index: number): U;
}

/** Allows users to apply a function to every element returned from an iterator. */
function* map<T, U>(
  this: Generator<T>,
  mapperFn: CallbackFunction<T, U>,
): Generator<U> {
  let index = 0;
  for (const value of this) {
    yield mapperFn(value, index);
    index += 1;
  }
}

/** Transforms a generator to an array. */
function toArray<T>(this: Generator<T>): T[] {
  return [...this];
}

/** Applies iterator helper monkey-patch. */
function main() {
  const GeneratorFunction = Object.getPrototypeOf(function* () {}).prototype;
  const propertyDescriptors = iteratorHelpers.map(iteratorHelperToProperty);
  const propertyDescriptorMap = Object.fromEntries(propertyDescriptors);
  Object.defineProperties(GeneratorFunction, propertyDescriptorMap);
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
