import fs from "fs";
import assert from "assert";

const asyncIterable = syncToAsyncIterable(["a", "b"]); // (A)
const asyncIterator = asyncIterable[Symbol.asyncIterator]();

// Call .next() until .done is true:
asyncIterator
  .next() // (B)
  .then((iteratorResult) => {
    assert.deepEqual(iteratorResult, { value: "a", done: false });
    return asyncIterator.next(); // (C)
  })
  .then((iteratorResult) => {
    assert.deepEqual(iteratorResult, { value: "b", done: false });
    return asyncIterator.next(); // (D)
  })
  .then((iteratorResult) => {
    assert.deepEqual(iteratorResult, { value: undefined, done: true });
  });

async function f() {
  const asyncIterable = syncToAsyncIterable(["a", "b"]);
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();

  // Call .next() until .done is true:
  assert.deepEqual(await asyncIterator.next(), { value: "a", done: false });
  assert.deepEqual(await asyncIterator.next(), { value: "b", done: false });
  assert.deepEqual(await asyncIterator.next(), {
    value: undefined,
    done: true,
  });
}
f();

// 42.1.3 Using async iteration via for-await-of
for await (const x of syncToAsyncIterable(["a", "b"])) {
  console.log(x);
}
// Output:
// 'a'
// 'b'

// for-await-of is relatively flexible. In addition to asynchronous iterables, it also supports synchronous iterables:
for await (const x of ["a", "b"]) {
  console.log(x);
}
// Output:
// 'a'
// 'b'

// 42.2 Asynchronous generators
async function* asyncGen() {
  // Input: Promises, async iterables
  const x = await somePromise;
  for await (const y of someAsyncIterable) {
    // ···
  }

  // Output
  yield someValue;
  yield* otherAsyncGen();
}

// 42.2.1 Example: creating an async iterable via an async generator
async function* yield123() {
  for (let i = 1; i <= 3; i++) {
    yield i;
  }
}

// 42.2.2 Example: converting a sync iterable to an async iterable #
async function* syncToAsyncIterable(syncIterable) {
  for (const elem of syncIterable) {
    yield elem;
  }
}

// 42.2.3 Example: converting an async iterable to an Array #
async function asyncIterableToArray(asyncIterable) {
  const result = [];
  for await (const value of asyncIterable) {
    result.push(value);
  }
  return result;
}

// 42.2.4 Example: transforming an async iterable
async function* timesTwo(asyncNumbers) {
  for await (const x of asyncNumbers) {
    yield x * 2;
  }
}

// 42.2.5 Example: mapping over asynchronous iterables

// 42.3 Async iteration over Node.js streams
// 42.3.1 Node.js streams: async via callbacks (push)

// 伝統的な書き方
function main(inputFilePath) {
  const readStream = fs.createReadStream(inputFilePath, {
    encoding: "utf-8",
    highWaterMark: 1044,
  });

  readStream.on("data", (chunk) => {
    console.log(">>>" + chunk);
  });
  readStream.on("end", () => {
    console.log("### DONE ###");
  });
}

main("sample.txt");

// 42.3.2 Node.js streams: async via async iteration (pull)
