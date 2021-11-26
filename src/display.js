import * as Constants from "./constants.js";
import * as Random from "./random.js";
import * as Utils from "./utils.js";

export function populatePlayersList() {
  const playerListElement = document.getElementById("player");
  removeOptions(playerListElement);
  let totalPlayers = Utils.getTotalNumberOfPlayers();

  let emptyOpt = document.createElement("option");
  emptyOpt.value = -1;
  playerListElement.append(emptyOpt);

  [...Array(Math.min(Constants.players.length, totalPlayers)).keys()]
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
  let fingerprint = Random.getFingerprint(randomNumber);
  document.getElementById("fingerprint").innerHTML = fingerprint;
}
