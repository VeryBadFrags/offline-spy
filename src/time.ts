let intervalId: number;

export function startTimer(duration: number, timerElement: HTMLElement) {
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

function setTimerDisplay(timer: number, timerElement: HTMLElement) {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;

  let minutesStr = minutes < 10 ? "0" + minutes : minutes;
  let secondsStr = seconds < 10 ? "0" + seconds : seconds;

  timerElement.textContent = `⏱ ${minutesStr}:${secondsStr}`;
}
