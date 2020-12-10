// array.forEach() 内でasync関数回したらどうなるのか

// ref. https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#forEach_expects_a_synchronous_function
// > `forEach` はプロミスを待ちません

// ref. https://qiita.com/frameair/items/e7645066075666a13063

function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
}

// sample 1
// const arr = [1, 2, 3, 4, 5];
// (async () => {
//   await arr.forEach(async (value) => {
//     console.log('start: ', value);
//     await sleep(1000);
//     console.log('end: ', value);
//   });

//   console.log("finished");
// })();
// start:  1
// start:  2
// start:  3
// start:  4
// start:  5
// finished
// (1秒)
// end:  1
// end:  2
// end:  3
// end:  4
// end:  5

// sample 2
// 回避策としてforEachでなく for .. of を使う方法
// const arr = [1, 2, 3, 4, 5];
// (async () => {
//   for (const value of arr) {
//     console.log('start: ', value);
//     await sleep(1000);
//     console.log('end: ', value);
//   }

//   console.log("finished");
// })();

// sample 3
// ループ中のPromiseを一つずつ処理する必要がない場合
// Promise.allで全部の終了を待つ
const arr = [1, 2, 3, 4, 5];
(async () => {
  await Promise.all(
    arr.map(async (value) => {
      console.log("start: ", value);
      await sleep(1000);
      console.log("end: ", value);
    })
  );

  console.log("finished");
})();
