const msgEl = document.getElementById("msg");

const randomNum = getRandomNumber();

console.log(randomNum);

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition()

//Start recognition and game
recognition.start();

//Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

//Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div id="msg" class="msg">
      <div>You said:</div>
      <span class="box">${msg}</span>
    </div>
  `
}

//Check msg against number
function checkNumber(msg) {
  const num = +msg

  //Check if valid number
  if(Number.isNaN(num)) {
    msgEl.innerHTML += `<div>That is not a valid number</div>`
    return;
  }

  //Check in range
  if(num > 100 || num < 1) {
    msgEl.innerHTML += `<div>Number must be between 1 and 100</div>`
  }

  //Check number
  if(num === randomNum) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the correct number<br><br>It was ${num}</h2>
      <button class='btn play-again'>Play Again</button>
    `
  }

  //Check if number in too low
  if (num < randomNum) {
    msgEl.innerHTML += `<div>Go Higher</div>`
  }

  //Check if number is too high
  if (num > randomNum) {
    msgEl.innerHTML += `<div>Go Lower</div>`
  }

}

//Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript
  // writeMessage(msg)
  // checkNumber(msg)
}

//Speak result
recognition.addEventListener('result', onSpeak)

//End SR service
// recognition.addEventListener('end', () => recognition.start())

document.body.addEventListener('click', (e) => {
  if(e.target.id === 'play-again') {
    window.location.reload()
  } 
})