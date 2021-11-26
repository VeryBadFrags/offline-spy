import * as Constants from "./constants.js";
import * as Display from "./display.js";
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
  let totalPlayers = Utils.getTotalNumberOfPlayers();

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

  let randomNumber = Random.getRNG(seed, iterationField.value, totalPlayers);
  Display.setupDisplayForRound(
    randomNumber,
    iterationField,
    totalPlayers,
    playerID
  );

  let timer = document.getElementById("timer");
  Time.startTimer(60 * 5, timer);
}

/* onload */

Display.initSeed();

/* Show the list of Locations */
{
  let locationsListElement = document.getElementById("locations-list");
  Constants.locationsList.forEach((locationName) => {
    let li = document.createElement("li");
    li.innerHTML = locationName;
    locationsListElement.append(li);
  });
}

document.getElementById("total-players").max = Constants.players.length;
Display.populatePlayersList();

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
