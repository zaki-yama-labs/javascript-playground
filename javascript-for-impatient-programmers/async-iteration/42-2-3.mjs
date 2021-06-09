import assert from "assert";

// 42.2.3 Example: converting an async iterable to an Array #
async function asyncIterableToArray(asyncIterable) {
  const result = [];
  for await (const value of asyncIterable) {
    console.log(value);
    result.push(value);
  }
  return result;
}

async function* createAsyncIterable() {
  yield "a";
  yield "b";
}
const asyncIterable = createAsyncIterable();
assert.deepEqual(
  await asyncIterableToArray(asyncIterable), // (A)
  ["a", "b"]
);
