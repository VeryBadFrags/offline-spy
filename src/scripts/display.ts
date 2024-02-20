import { locationsList, fingerprintTokens, playersList } from "./constants";
import {
  getFirstPlayer,
  isSpy,
  getLocationIndex,
  getFingerprintString,
} from "../scripts/random";

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

  document.getElementById("playerid")!.innerText = playersList.data[playerID];
  iterationField.value = (parseInt(iterationField.value) + 1).toString();
}

function setFirstPlayerDisplay(randomNumber: number, totalPlayers: number) {
  const firstPlayer = getFirstPlayer(randomNumber, totalPlayers);
  document.getElementById("firstPlayer")!.innerText =
    playersList.data[firstPlayer];
}

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
    document.getElementById("spyBlock")!.style.display = "none";
    document.getElementById("innocentBlock")!.style.display = "block";
  } else {
    document.getElementById("spyBlock")!.style.display = "block";
    document.getElementById("innocentBlock")!.style.display = "none";
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
