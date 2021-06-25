const first = document.getElementById("number1");
const second = document.getElementById("number2");

const result = document.querySelector(".result");

if (window.Worker) {
  const myWorker = new Worker("src/worker.js");

  first.onchange = () => {
    myWorker.postMessage([first.value, second.value]);
    console.log("[first] Message posted to worker");
  };

  second.onchange = () => {
    myWorker.postMessage([first.value, second.value]);
    console.log("[second] Message posted to worker");
  };

  myWorker.onmessage = (e) => {
    result.textContent = e.data;
    console.log("Message received from worker");
  };
} else {
  console.log("Your browser doesn't support web workers.");
}
