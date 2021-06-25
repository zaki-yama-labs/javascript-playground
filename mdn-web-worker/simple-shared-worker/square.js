const squareNumber = document.getElementById('number3');

const result2 = document.querySelector('.result2');

if (!!window.SharedWorker) {
  const myWorker = new SharedWorker("worker.js");

  squareNumber.onchange = function() {
    myWorker.port.postMessage([squareNumber.value, squareNumber.value]);
    console.log('Message posted to worker');
  }

  myWorker.port.onmessage = function(e) {
    result2.textContent = e.data;
    console.log('Message received from worker');
  }
}
