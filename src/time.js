let intervalId;

export function startTimer(duration, display) {
  clearInterval(intervalId);
  var timer = duration;
  setTimerDisplay(timer, display);
  intervalId = setInterval(function () {
    timer--;
    setTimerDisplay(timer, display);
    if (timer < 0) {
      display.textContent = "🔔 Time's up! Who is the Spy?";
      clearInterval(intervalId);
    }
  }, 1000);
}

function setTimerDisplay(timer, display) {
  let minutes = parseInt(timer / 60, 10);
  let seconds = parseInt(timer % 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  display.textContent = `⏱ ${minutes}:${seconds}`;
}
