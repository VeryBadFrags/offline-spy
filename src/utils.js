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
