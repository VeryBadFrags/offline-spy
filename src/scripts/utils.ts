const errorBox = document.getElementById("error-container") as HTMLElement;

/**
 * Print an error box at the top of the page
 */
export function printError(content: string) {
  errorBox.innerText = content;
  errorBox.style.display = "block";
}

/**
 * Remove the error box
 */
export function resetErrors() {
  errorBox.style.display = "none";
  errorBox.innerText = "";
}

export function showHide(elementId: string) {
  const elem = document.getElementById(elementId)!;
  if (elem.style.display === "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

export function getPlayersCount(): number {
  const totalPlayers = document.getElementById(
    "total-players",
  ) as HTMLInputElement;
  return parseInt(totalPlayers.value);
}
