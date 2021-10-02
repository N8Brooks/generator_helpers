import { CallbackFn } from "./function_types.ts";

export function every<T, U>(
  this: Generator<T>,
  callbackFn: CallbackFn<T, U>,
): boolean {
  let index = 0;
  for (const value of this) {
    if (!callbackFn(value, index)) {
      return false;
    }
    index += 1;
  }
  return true;
}
