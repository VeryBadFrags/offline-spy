import * as Constants from "./constants.js";

/* Pseudo-LFSR, it just needs to be fast and unpredictable */
export function getRNG(seed, iteration, totalPlayers) {
  let startDate = [...seed].reduce(
    (acc, _, i) =>
      acc + (seed.charCodeAt(i) + iteration + totalPlayers) * (i + 1),
    0
  );

  const modulo = 65536;
  startDate %= modulo;
  let lfsr = startDate;
  let period = 0;

  do {
    lfsr ^= lfsr >> 7;
    lfsr ^= lfsr << 9;
    lfsr ^= lfsr >> 13;
    ++period;

    if (period > 1000000000) {
      break;
    }
  } while (lfsr % modulo != startDate);

  return period;
}

/* Generate a 3-emoji fingerprint to confirm that players are on the same game */
export function getFingerprint(seedNumber) {
  let seed1 = seedNumber + 1;
  let seed2 = Math.floor(seedNumber / 10);
  let seed3 = seedNumber ^ (seedNumber >> 2);
  return (
    Constants.validations[seed1 % Constants.validations.length] +
    Constants.validations[seed2 % Constants.validations.length] +
    Constants.validations[seed3 % Constants.validations.length]
  );
}

export function getLocation(seedNumber) {
  return Constants.locationsList[seedNumber % Constants.locationsList.length];
}

export function isPsy(seedNumber, playerId, totalPlayers) {
  let spy = seedNumber % totalPlayers;
  return playerId == spy;
}

export function getFirstPlayer(seedNumber, totalPlayers) {
  return Math.floor(seedNumber / 10) % totalPlayers;
}

export function generateNewSeed(characters, charactersLength) {
  let newSeed = "";
  [...Array(4).keys()].forEach(
    () => (newSeed += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    ))
  );
  return newSeed;
}