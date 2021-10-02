import { CallbackFn } from "./function_types.ts";

export function find<T, U>(
  this: Generator<T>,
  callbackFn: CallbackFn<T, U>,
): T | undefined {
  let index = 0;
  for (const value of this) {
    if (callbackFn(value, index)) {
      return value;
    }
    index += 1;
  }
}
