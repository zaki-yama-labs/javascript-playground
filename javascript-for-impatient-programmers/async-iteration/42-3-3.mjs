import assert from "assert";

// 42.3.3 Example: from chunks to lines #

/**
 * Parameter: async iterable of chunks (strings)
 * Result: async iterable of lines (incl. newlines)
 */
async function* chunksToLines(chunksAsync) {
  let previous = "";
  for await (const chunk of chunksAsync) {
    // input
    previous += chunk;
    let eolIndex;
    while ((eolIndex = previous.indexOf("\n")) >= 0) {
      // line includes the EOL (Windows '\r\n' or Unix '\n')
      const line = previous.slice(0, eolIndex + 1);
      yield line; // output
      previous = previous.slice(eolIndex + 1);
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

async function* chunkIterable() {
  yield "First\nSec";
  yield "ond\nThird\nF";
  yield "ourth";
}
const linesIterable = chunksToLines(chunkIterable());
assert.deepEqual(await asyncIterableToArray(linesIterable), [
  "First\n",
  "Second\n",
  "Third\n",
  "Fourth",
]);

async function asyncIterableToArray(asyncIterable) {
  const result = [];
  for await (const value of asyncIterable) {
    result.push(value);
  }
  return result;
}
