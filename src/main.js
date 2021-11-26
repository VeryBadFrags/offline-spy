import * as Constants from "./constants.js";
import * as Random from "./random.js";
import * as Time from "./time.js";
import * as Utils from "./utils.js";

function startGame() {
  window.scrollTo(0, 0);
  Utils.resetErrors();

  // Get the Game params
  let seed = document.getElementById("seed").value.toUpperCase();
  let iterationField = document.getElementById("iteration");
  let playerSelect = document.getElementById("player");
  let playerID = Number(playerSelect.options[playerSelect.selectedIndex].value);
  let totalPlayers = getTotalNumberOfPlayers();

  if (playerID == -1) {
    Utils.printError(`Please select an 👤 Avatar`);
    return;
  }

  // Validate the params
  while (seed.length < 4) {
    seed += "A";
  }
  if (playerID > totalPlayers) {
    Utils.printError(
      "Error: 👤 > 👥 <br> Player # greater than total number of players"
    );
    return;
  }

  // Generate randomness and setup the game window
  {
    let randomNumber = Random.getRNG(seed, iterationField.value, totalPlayers);

    setLocationDisplay(randomNumber, playerID, totalPlayers);

    setFingerprintDisplay(randomNumber);

    setFirstPlayerDisplay(randomNumber, playerID, totalPlayers);

    document.getElementById("playerid").innerHTML = Constants.players[playerID];
    iterationField.value = iterationField.value * 1 + 1;
  }

  {
    document.getElementById("startButton").innerHTML = "🏁 Start Next Round";
    document.getElementById("secretBlock").style.display = "block";

    let timer = document.getElementById("timer");
    Time.startTimer(60 * 5, timer);

    document.getElementById("gameWindow").style.display = "inline-block";
  }
}

function setFirstPlayerDisplay(randomNumber, playerID, totalPlayers) {
  let firstPlayer = Random.getFirstPlayer(randomNumber, playerID, totalPlayers);
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

function getTotalNumberOfPlayers() {
  return document.getElementById("total-players").value;
}

// Remove the Options from a Select
function removeOptions(selectElement) {
  for (let i = selectElement.options.length - 1; i >= 0; i--) {
    selectElement.remove(i);
  }
}

/* onload */

/* Init seed */
{
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const charactersLength = characters.length;

  let newSeed = "";
  [...Array(4).keys()].forEach(
    () =>
      (newSeed += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      ))
  );
  document.getElementById("seed").value = newSeed;
}

/* Show the list of Locations */
{
  let locationsListElement = document.getElementById("locations-list");
  Constants.locationsList.forEach((locationName) => {
    let li = document.createElement("li");
    li.innerHTML = locationName;
    locationsListElement.append(li);
  });
}

/* Set the list of available Avatars */
const playerListElement = document.getElementById("player");
function setPlayersList() {
  removeOptions(playerListElement);
  let totalPlayers = getTotalNumberOfPlayers();

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

document.getElementById("total-players").max = Constants.players.length;
setPlayersList();

document.getElementById("start-form").addEventListener("submit", (event) => {
  event.preventDefault();
  startGame();
});

document
  .getElementById("secret-block-button")
  .addEventListener("click", () => Utils.showHide("secretBlock"));

document
  .getElementById("rules-button")
  .addEventListener("click", () => Utils.showHide("instructions"));
