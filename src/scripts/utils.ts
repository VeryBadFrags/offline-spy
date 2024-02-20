const errorBox = document.getElementById("error-container") as HTMLElement;

/**
 * Print an error box at the top of the page with the provided content
 * @param content
 */
export function printError(content: string) {
  errorBox.innerText = content;
  show(errorBox);
}

/**
 * Remove the error box
 */
export function resetErrors() {
  hide(errorBox);
  errorBox.innerText = "";
}

export function showHide(elem: HTMLElement) {
  if (elem.style.display === "none") {
    show(elem);
  } else {
    hide(elem);
  }
}

export function getPlayersCount(): number {
  const totalPlayers = document.getElementById(
    "total-players",
  ) as HTMLInputElement;
  return parseInt(totalPlayers.value);
}

/**
 * Set the element's display to 'block'
 * @param element
 */
export function show(element: HTMLElement) {
  element.style.display = "block";
}

/**
 * Set the element's display to 'none'
 * @param element
 */
export function hide(element: HTMLElement) {
  element.style.display = "none";
}
