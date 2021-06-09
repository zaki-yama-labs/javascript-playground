import assert from "assert";

async function* yield123() {
  for (let i = 1; i <= 3; i++) {
    yield i;
  }
}

(async () => {
  const asyncIterable = yield123();
  const asyncIterator = asyncIterable[Symbol.asyncIterator]();
  assert.deepEqual(await asyncIterator.next(), { value: 1, done: false });
  assert.deepEqual(await asyncIterator.next(), { value: 2, done: false });
  assert.deepEqual(await asyncIterator.next(), { value: 3, done: false });
  assert.deepEqual(await asyncIterator.next(), {
    value: undefined,
    done: true,
  });
})();
