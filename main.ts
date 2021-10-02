import { asIndexedPairs } from "./as_indexed_pairs.ts";
import { drop } from "./drop.ts";
import { filter } from "./filter.ts";
import { flatMap } from "./flat_map.ts";
import { map } from "./map.ts";
import { range } from "./range.ts";
import { take } from "./take.ts";
import { reduce } from "./reduce.ts";
import { toArray } from "./to_array.ts";

/** Patch Generator typing */
declare global {
  interface Generator {
    map: typeof map;
    filter: typeof filter;
    take: typeof take;
    drop: typeof drop;
    asIndexedPairs: typeof asIndexedPairs;
    flatMap: typeof flatMap;
    reduce: typeof reduce;
    toArray: typeof toArray;
  }
}

/** Callback function type used for some iterator helpers. */
export interface CallbackFn<T, U> {
  (value: T, index: number): U;
}

/** Reducer function used for reduce. */
export interface ReducerFn<T, U> {
  (previousValue: U, currentValue: T, index: number): U;
}

/** Array of helpers added to `Generator`. */
export const iteratorHelpers = [
  map,
  filter,
  take,
  drop,
  asIndexedPairs,
  flatMap,
  reduce,
  toArray,
];

/** Generator function prototype. */
export const GeneratorFunction = Object.getPrototypeOf(range).prototype;

main(); // apply monkey-patch

/** Applies iterator helper monkey-patch. */
function main() {
  const propertyDescriptors = iteratorHelpers.map(iteratorHelperToProperty);
  const propertyDescriptorMap = Object.fromEntries(propertyDescriptors);
  Object.defineProperties(GeneratorFunction, propertyDescriptorMap);
}

/** Returns an `Array` of name and object of property descriptors. */
export function iteratorHelperToProperty(
  helper: typeof iteratorHelpers[number],
) {
  return [helper.name, {
    writable: true,
    enumerable: false,
    configurable: true,
    value: helper,
  }];
}
