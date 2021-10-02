import { CallbackFn } from "./function_types.ts";

export function some<T, U>(
  this: Generator<T>,
  callbackFn: CallbackFn<T, U>,
): boolean {
  let index = 0;
  for (const value of this) {
    if (callbackFn(value, index)) {
      return true;
    }
    index += 1;
  }
  return false;
}
