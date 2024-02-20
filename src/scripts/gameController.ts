import { setupDisplayForRound } from "../scripts/display";
import { getRNG } from "../scripts/random";
import { startTimer } from "../scripts/time";
import { resetErrors, getPlayersCount, printError } from "../scripts/utils";

const selectAvatarError = "Please select an 👤 Avatar";
const playerCountError =
  "Error: 👤 > 👥 <br> Player # greater than total number of players";

export function startGame() {
  window.scrollTo(0, 0);
  resetErrors();

  // Get the Game params
  let seed = (
    document.getElementById("seed") as HTMLInputElement
  ).value.toUpperCase();
  const iterationField = document.getElementById(
    "iteration",
  ) as HTMLInputElement;
  const playerSelect = document.getElementById(
    "player-select",
  ) as HTMLSelectElement;
  const playerID = parseInt(
    playerSelect.options[playerSelect.selectedIndex].value,
  );
  const totalPlayers = getPlayersCount();

  if (playerID == -1) {
    printError(selectAvatarError);
    return;
  }

  // Validate the params
  while (seed.length < 4) {
    seed += "A";
  }
  if (playerID > totalPlayers) {
    printError(playerCountError);
    return;
  }

  const randomNumber = getRNG(
    seed,
    parseInt(iterationField.value),
    totalPlayers,
  );
  setupDisplayForRound(randomNumber, iterationField, totalPlayers, playerID);

  const timerElement = document.getElementById("timer") as HTMLElement;
  startTimer(60 * 5, timerElement);
}
