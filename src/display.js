import * as Constants from "./constants.js";
import * as Random from "./random.js";

export function populatePlayersList(playersCount) {
  const playerListElement = document.getElementById("player");
  removeOptions(playerListElement);

  let emptyOpt = document.createElement("option");
  emptyOpt.value = -1;
  playerListElement.append(emptyOpt);

  [...Array(Math.min(Constants.players.length, playersCount)).keys()]
    .map((i) => {
      let opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = Constants.players[i];
      return opt;
    })
    .forEach((node) => playerListElement.append(node));
}

// Remove the Options from a Select
function removeOptions(selectElement) {
  for (let i = selectElement.options.length - 1; i >= 0; i--) {
    selectElement.remove(i);
  }
}

export function buildLocationsList() {
  let locationsListElement = document.getElementById("locations-list");
  Constants.locationsList
    .map((locationName) => {
      let li = document.createElement("li");
      li.innerHTML = locationName;
      return li;
    })
    .forEach((lineElement) => locationsListElement.append(lineElement));
}

export function initSeed() {
  let newSeed = Random.generateNewSeed();
  document.getElementById("seed").value = newSeed;
}

export function setupDisplayForRound(
  randomNumber,
  iterationField,
  totalPlayers,
  playerID
) {
  initRoundSpecificUI(randomNumber, iterationField, totalPlayers, playerID);
  initGameUI();
}

function initGameUI() {
  document.getElementById("startButton").innerHTML = "🏁 Start Next Round";
  document.getElementById("secretBlock").style.display = "block";
  document.getElementById("gameWindow").style.display = "inline-block";
}

function initRoundSpecificUI(
  randomNumber,
  iterationField,
  totalPlayers,
  playerID
) {
  setLocationDisplay(randomNumber, playerID, totalPlayers);

  setFingerprintDisplay(randomNumber);

  setFirstPlayerDisplay(randomNumber, playerID, totalPlayers);

  document.getElementById("playerid").innerHTML = Constants.players[playerID];
  iterationField.value = iterationField.value * 1 + 1;
}

function setFirstPlayerDisplay(randomNumber, playerID, totalPlayers) {
  let firstPlayer = Random.getFirstPlayer(randomNumber, totalPlayers);
  document.getElementById("firstPlayer").innerHTML =
    Constants.players[firstPlayer];
}

function setLocationDisplay(randomNumber, playerID, totalPlayers) {
  let locationName = "❓";
  let isSpy = Random.isPsy(randomNumber, playerID, totalPlayers);
  if (!isSpy) {
    locationName = Random.getLocation(randomNumber);
    document.getElementById("spyBlock").style.display = "none";
    document.getElementById("innocentBlock").style.display = "block";
  } else {
    document.getElementById("spyBlock").style.display = "block";
    document.getElementById("innocentBlock").style.display = "none";
  }
  document.getElementById("location").innerHTML = locationName;
}

function setFingerprintDisplay(randomNumber) {
  let fingerprint = Random.getFingerprintString(randomNumber);
  document.getElementById("fingerprint").innerHTML = fingerprint;
}
