let intervalId;

export function startTimer(duration, timerElement) {
  clearInterval(intervalId);
  var timer = duration;
  setTimerDisplay(timer, timerElement);
  intervalId = setInterval(function () {
    timer--;
    setTimerDisplay(timer, timerElement);
    if (timer < 0) {
      timerElement.textContent = "🔔 Time's up! Who is the Spy?";
      clearInterval(intervalId);
    }
  }, 1000);
}

function setTimerDisplay(timer, timerElement) {
  let minutes = parseInt(timer / 60, 10);
  let seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timerElement.textContent = `⏱ ${minutes}:${seconds}`;
}
