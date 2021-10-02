import { CallbackFn } from "./main.ts";

export function forEach<T, U>(
  this: Generator<T>,
  callbackFn: CallbackFn<T, U>,
) {
  let index = 0;
  for (const value of this) {
    callbackFn(value, index);
    index += 1;
  }
}
