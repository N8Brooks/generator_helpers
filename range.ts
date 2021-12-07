/** Yields integers from `0` to `stop` */
function range(stop: number): Generator<number>;

/** Yields integers from `start` to `stop` */
function range(start: number, stop: number): Generator<number>;

/** Yields integers from `start` to `stop` with the given `step` size */
function range(start: number, stop: number, step: number): Generator<number>;

/** Implementation of range */
function* range(start: number, stop?: number, step = 1): Generator<number> {
  if (!Number.isSafeInteger(start)) {
    throw RangeError(
      stop === undefined
        ? "range() stop must be a safe integer"
        : "range() start must be a safe integer",
    );
  }

  if (stop === undefined) {
    // start is treated as the stop, step is ignored.
    for (let n = 0; n < start; n++) {
      yield n;
    }
    return;
  } else if (!Number.isSafeInteger(stop)) {
    throw RangeError("range() stop must be a safe integer");
  }

  if (step === 0 || !Number.isSafeInteger(step)) {
    throw RangeError("range() step argument must be a non-zero safe integer");
  } else if (Math.floor(start - stop) / step < 0) {
    // Based on cpython implementation
    stop += (((start - stop) % step) + step) % step;
    while (start !== stop) {
      yield start;
      start += step;
    }
  }
}

export { range };
