/**
 * Array.map()内で async function を使いつつ直列に処理できるのか -> できなさそう
 * ref.https://github.com/kintone/js-sdk/pull/925
 */

function sleep(sec, label) {
  return new Promise((resolve) => {
    console.log(`[${label}] start`);
    setTimeout(() => {
      console.log(`[${label}] done`);
      resolve(`[${label}] resolve`);
    }, sec * 1000);
  });
}

async function main() {
  // const promises = [sleep(1, "A"), sleep(2, "B"), sleep(3, "C")];

  // これはうまくいかない
  // ["A", "B", "C"].map(async (label, i) => {
  //   console.log("start");
  //   await sleep(i + 1, label);
  //   console.log("end");
  // });

  // 並列実行にするしかない
  const result = await Promise.all(
    ["A", "B", "C"].map(async (label, i) => {
      console.log("start");
      return await sleep(i + 1, label);
      console.log("end");
    })
  );
  console.log(result);

  // for .. of .. なら直列実行できる
  // let i = 1;
  // for (const label of ["A", "B", "C"]) {
  //   console.log("start");
  //   await sleep(i, label);
  //   i++;
  //   console.log("end");
  // }
}

main();

// const manifest = {
//   desktop: {
//     js: ["desktop-js-1", "desktop-js-2"],
//     css: ["desktop-css-1", "desktop-css-2"],
//   },
//   mobile: {
//     js: ["mobile-js-1", "mobile-js-2"],
//     css: ["mobile-css-1", "mobile-css-2"],
//   },
// };

// async function upload() {
//   // const [desktopJS, desktopCSS, mobileJS, mobileCSS] = await Promise.all(
//   //   [
//   //     manifest.desktop.js,
//   //     manifest.desktop.css,
//   //     manifest.mobile.js,
//   //     manifest.mobile.css,
//   //   ].map((files) => {
//   //     Promise.all(
//   //       files.map((file) => {
//   //         return sleep(1, file);
//   //       })
//   //     );
//   //   })
//   // );
//   // console.log("desktopJS", desktopJS);
//   // console.log("desktopCSS", desktopCSS);
//   // console.log("mobileJS", mobileJS);
//   // console.log("mobileCSS", mobileCSS);

//   const uploadFilesResult = [];
//   for (const files of [
//     manifest.desktop.js,
//     manifest.desktop.css,
//     manifest.mobile.js,
//     manifest.mobile.css,
//   ]) {
//     const results = [];
//     for (const file of files) {
//       const result = await sleep(1, file);
//       results.push(result);
//     }
//     uploadFilesResult.push(results);
//   }
//   console.log("---desktopJS", uploadFilesResult[0]);
//   console.log("---desktopCSS", uploadFilesResult[1]);
//   console.log("---mobileJS", uploadFilesResult[2]);
//   console.log("---mobileCSS", uploadFilesResult[3]);
//   // console.log("desktopJS", desktopJS);
//   // console.log("desktopCSS", desktopCSS);
//   // console.log("mobileJS", mobileJS);
//   // console.log("mobileCSS", mobileCSS);
// }

// upload();
