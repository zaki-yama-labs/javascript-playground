/*
 *  JavaScript Promise の本
 * 5. Chapter.5 - Async Function
 * https://azu.github.io/promises-book/#chapter5-async-function
 */

function fetchBookTitle() {
  // Fetch API は指定URLのリソースを取得しPromiseを返す関数
  return fetch("https://azu.github.io/promises-book/json/book.json")
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      return json.title;
    });
}

function main() {
  fetchBookTitle().then((title) => {
    console.log(title);
  });
}

main();

async function fetchBookTitleAsync() {
  // Fetch API は指定URLのリソースを取得しPromiseを返す関数
  const res = await fetch("https://azu.github.io/promises-book/json/book.json");
  const json = await res.json();
  return json.title;
}

async function mainAsync() {
  const title = await fetchBookTitleAsync();
  console.log(title);
}

mainAsync();
