// Print an error box at the top of the page
export function printError(content) {
  let errorBox = document.getElementById("error");
  errorBox.innerText = content;
  errorBox.style.display = "block";
}

export function resetErrors() {
  let errorBox = document.getElementById("error");
  errorBox.style.display = "none";
  errorBox.innerHTML = "";
}

export function showHide(elementId) {
  let elem = document.getElementById(elementId);
  if (elem.style.display === "none") {
    elem.style.display = "block";
  } else {
    elem.style.display = "none";
  }
}

export function getTotalNumberOfPlayers() {
  return document.getElementById("total-players").value;
}
