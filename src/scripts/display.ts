import { locationsList, fingerprintTokens, playersList } from "./constants";
import {
  getFirstPlayer,
  isSpy,
  getLocationIndex,
  getFingerprintString,
} from "../scripts/random";
import { hide, show } from "./utils";

export function setupDisplayForRound(
  randomNumber: number,
  iterationField: HTMLInputElement,
  totalPlayers: number,
  playerID: number,
) {
  initRoundSpecificUI(randomNumber, iterationField, totalPlayers, playerID);
  initGameUI();
}

const startButton = document.getElementById("start-button") as HTMLElement;
const secretBlock = document.getElementById("secretBlock") as HTMLElement;
function initGameUI() {
  startButton.innerText = "🏁 Start Next Round";
  show(secretBlock);
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

  document.getElementById("playerid")!.innerText = playersList.data[playerID];
  iterationField.value = (parseInt(iterationField.value) + 1).toString();
}

function setFirstPlayerDisplay(randomNumber: number, totalPlayers: number) {
  const firstPlayer = getFirstPlayer(randomNumber, totalPlayers);
  document.getElementById("firstPlayer")!.innerText =
    playersList.data[firstPlayer];
}

const spyBlock = document.getElementById("spy-block") as HTMLElement;
const innocentBlock = document.getElementById("innocent-block") as HTMLElement;
function setLocationDisplay(
  randomNumber: number,
  playerID: number,
  totalPlayers: number,
) {
  let locationName = "❓";
  const playerIsSpy = isSpy(randomNumber, playerID, totalPlayers);
  if (!playerIsSpy) {
    locationName =
      locationsList.data[
        getLocationIndex(randomNumber, locationsList.data.length)
      ];
    hide(spyBlock);
    show(innocentBlock);
  } else {
    show(spyBlock);
    hide(innocentBlock);
  }
  document.getElementById("location")!.innerText = locationName;
}

const fingerPrintContainer = document.getElementById(
  "fingerprint-container",
) as HTMLElement;
function setFingerprintDisplay(randomNumber: number) {
  const fingerprint = getFingerprintString(
    randomNumber,
    fingerprintTokens.data,
  );
  fingerPrintContainer.innerText = fingerprint;
}
