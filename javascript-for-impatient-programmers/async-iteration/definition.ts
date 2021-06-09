// 通常のiterator
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface Iterator<T> {
  next(): IteratorResult<T>;
}

interface IteratorResult<T> {
  value: T;
  done: boolean;
}

// Async Iterator
interface AsyncIterable<T> {
  [Symbol.asyncIterator](): AsyncIterator<T>;
}

interface AsyncIterator<T> {
  next(): Promise<IteratorResult<T>>; // (A)
}

interface IteratorResult<T> {
  value: T;
  done: boolean;
}
