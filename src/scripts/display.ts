import * as Constants from "./constants";
import * as Random from "./random";

export function populatePlayersList(playersCount: number) {
  const playerListElement = document.getElementById(
    "player",
  ) as HTMLSelectElement;
  removeOptions(playerListElement);

  const emptyOpt = document.createElement("option") as HTMLOptionElement;
  emptyOpt.value = "-1";
  playerListElement.append(emptyOpt);

  [...Array(Math.min(Constants.players.length, playersCount)).keys()]
    .map((i) => {
      const opt = document.createElement("option");
      opt.value = i.toString();
      opt.innerText = Constants.players[i];
      return opt;
    })
    .forEach((node) => playerListElement.append(node));
}

// Remove the Options from a Select
function removeOptions(selectElement: HTMLSelectElement) {
  for (let i = selectElement.options.length - 1; i >= 0; i--) {
    selectElement.remove(i);
  }
}

export function buildLocationsList() {
  const locationsListElement = document.getElementById("locations-list")!;
  Constants.locationsList
    .map((locationName) => {
      const li = document.createElement("li");
      li.innerText = locationName;
      return li;
    })
    .forEach((lineElement) => locationsListElement.append(lineElement));
}

export function initSeed() {
  const newSeed = Random.generateNewSeed();
  (document.getElementById("seed") as HTMLInputElement).value = newSeed;
}

export function setupDisplayForRound(
  randomNumber: number,
  iterationField: HTMLInputElement,
  totalPlayers: number,
  playerID: number,
) {
  initRoundSpecificUI(randomNumber, iterationField, totalPlayers, playerID);
  initGameUI();
}

function initGameUI() {
  document.getElementById("startButton")!.innerText = "🏁 Start Next Round";
  document.getElementById("secretBlock")!.style.display = "block";
  document.getElementById("gameWindow")!.style.display = "inline-block";
}

function initRoundSpecificUI(
  randomNumber: number,
  iterationField: HTMLInputElement,
  totalPlayers: number,
  playerID: number,
) {
  setLocationDisplay(randomNumber, playerID, totalPlayers);

  setFingerprintDisplay(randomNumber);

  setFirstPlayerDisplay(randomNumber, totalPlayers);

  document.getElementById("playerid")!.innerText = Constants.players[playerID];
  iterationField.value = (parseInt(iterationField.value) + 1).toString();
}

function setFirstPlayerDisplay(randomNumber: number, totalPlayers: number) {
  const firstPlayer = Random.getFirstPlayer(randomNumber, totalPlayers);
  document.getElementById("firstPlayer")!.innerText =
    Constants.players[firstPlayer];
}

function setLocationDisplay(
  randomNumber: number,
  playerID: number,
  totalPlayers: number,
) {
  let locationName = "❓";
  const isSpy = Random.isSpy(randomNumber, playerID, totalPlayers);
  if (!isSpy) {
    locationName = Random.getLocation(randomNumber);
    document.getElementById("spyBlock")!.style.display = "none";
    document.getElementById("innocentBlock")!.style.display = "block";
  } else {
    document.getElementById("spyBlock")!.style.display = "block";
    document.getElementById("innocentBlock")!.style.display = "none";
  }
  document.getElementById("location")!.innerText = locationName;
}

function setFingerprintDisplay(randomNumber: number) {
  const fingerprint = Random.getFingerprintString(randomNumber);
  document.getElementById("fingerprint")!.innerText = fingerprint;
}
