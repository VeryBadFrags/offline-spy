import * as Constants from "./constants";
import * as Display from "./display";
import * as Random from "./random";
import * as Time from "./time";
import * as Utils from "./utils";

function startGame() {
  window.scrollTo(0, 0);
  Utils.resetErrors();

  // Get the Game params
  let seed = (
    document.getElementById("seed") as HTMLInputElement
  ).value.toUpperCase();
  let iterationField = document.getElementById("iteration") as HTMLInputElement;
  let playerSelect = document.getElementById("player") as HTMLSelectElement;
  let playerID = parseInt(
    playerSelect.options[playerSelect.selectedIndex].value
  );
  let totalPlayers = Utils.getPlayersCount();

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

  let randomNumber = Random.getRNG(
    seed,
    parseInt(iterationField.value),
    totalPlayers
  );
  Display.setupDisplayForRound(
    randomNumber,
    iterationField,
    totalPlayers,
    playerID
  );

  let timer = document.getElementById("timer")!;
  Time.startTimer(60 * 5, timer);
}

/* onload */

Display.initSeed();
Display.buildLocationsList();

const totalPlayersElement = document.getElementById(
  "total-players"
) as HTMLInputElement;
totalPlayersElement.max = Constants.players.length.toString();
totalPlayersElement.addEventListener("input", (event) =>
  Display.populatePlayersList(
    parseInt((event.target as HTMLInputElement).value)
  )
);
Display.populatePlayersList(parseInt(totalPlayersElement.value));

document.getElementById("start-form")!.addEventListener("submit", (event) => {
  event.preventDefault();
  startGame();
});

document
  .getElementById("secret-block-button")!
  .addEventListener("click", () => Utils.showHide("secretBlock"));

document
  .getElementById("rules-button")!
  .addEventListener("click", () => Utils.showHide("instructions"));
