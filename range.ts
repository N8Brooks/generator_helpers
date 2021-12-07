/** Yields `stop` `numbers` from `0` to `stop - 1`. */
export function* range(y0: number, y1?: number, yd = 1): Generator<number> {
  if (!Number.isFinite(y0)) {
    throw RangeError("range() y0 must be a finite number");
  }

  if (y1 === undefined) {
    // y0 is treated as the stop, yd is ignored.
    for (let n = 0; n < y0; n++) {
      yield n;
    }
    return;
  } else if (!Number.isFinite(y1)) {
    throw RangeError("range() y1 must be a finite number");
  }

  if (yd === 0 || !Number.isFinite(yd)) {
    throw RangeError("range() yd argument must be a non-zero finite number");
  } else if (yd < 0) {
    // increment
    for (let n = y0; n > y1; n += yd) {
      yield n;
    }
  } else {
    // decrement
    for (let n = y0; n < y1; n += yd) {
      yield n;
    }
  }
}
