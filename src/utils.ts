// Print an error box at the top of the page
export function printError(content: string) {
  let errorBox: HTMLElement = document.getElementById("error")!;
  errorBox.innerText = content;
  errorBox.style.display = "block";
}

export function resetErrors() {
  let errorBox = document.getElementById("error")!;
  errorBox.style.display = "none";
  errorBox.innerHTML = "";
}

export function showHide(elementId: string) {
  let elem = document.getElementById(elementId)!;
  if (elem.style.display === "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

export function getPlayersCount(): number {
  let totalPlayers = document.getElementById(
    "total-players"
  ) as HTMLInputElement;
  return parseInt(totalPlayers.value);
}
