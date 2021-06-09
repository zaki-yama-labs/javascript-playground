import assert from "assert";

// 42.2.4 Example: transforming an async iterable
async function* timesTwo(asyncNumbers) {
  for await (const x of asyncNumbers) {
    yield x * 2;
  }
}

async function* createAsyncIterable() {
  for (let i = 1; i <= 3; i++) {
    yield i;
  }
}

assert.deepEqual(await asyncIterableToArray(timesTwo(createAsyncIterable())), [
  2,
  4,
  6,
]);
