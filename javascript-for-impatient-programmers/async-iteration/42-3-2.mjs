import fs from "fs";

// 42.3.2 Node.js streams: async via async iteration (pull)
async function main(inputFilePath) {
  const readStream = fs.createReadStream(inputFilePath, {
    encoding: "utf-8",
    highWaterMark: 1044,
  });

  for await (const chunk of readStream) {
    console.log(">>>" + chunk);
  }
  console.log("### DONE ###");
}

main("sample.txt");
