import { map } from "./map.ts";
import { take } from "./take.ts";
import { toArray } from "./to_array.ts";

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
  take,
  toArray,
];

main(); // apply monkey-patch

/** Applies iterator helper monkey-patch. */
function main() {
  const GeneratorFunction = Object.getPrototypeOf(function* () {}).prototype;
  const propertyDescriptors = iteratorHelpers.map(iteratorHelperToProperty);
  const propertyDescriptorMap = Object.fromEntries(propertyDescriptors);
  Object.defineProperties(GeneratorFunction, propertyDescriptorMap);
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

/** Returns an `Array` of name and object of property descriptors. */
function iteratorHelperToProperty(helper: typeof iteratorHelpers[number]) {
  return [helper.name, {
    writable: true,
    enumerable: false,
    configurable: true,
    value: helper,
  }];
}
