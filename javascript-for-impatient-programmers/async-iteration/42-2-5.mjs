import assert from "assert";

// 42.2.5 Example: mapping over asynchronous iterables
function* mapSync(iterable, func) {
  let index = 0;
  for (const x of iterable) {
    yield func(x, index);
    index++;
  }
}
const syncIterable = mapSync(["a", "b", "c"], (s) => s.repeat(3));
assert.deepEqual([...syncIterable], ["aaa", "bbb", "ccc"]);

async function* mapAsync(asyncIterable, func) {
  // (A)
  let index = 0;
  for await (const x of asyncIterable) {
    // (B)
    yield func(x, index);
    index++;
  }
}

async function* createAsyncIterable() {
  yield "a";
  yield "b";
}

const mapped = mapAsync(createAsyncIterable(), (s) => s.repeat(3));

assert.deepEqual(
  await asyncIterableToArray(mapped), // (A)
  ["aaa", "bbb"]
);
