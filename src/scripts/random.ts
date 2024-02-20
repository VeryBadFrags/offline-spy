const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const charactersLength = characters.length;

/* Pseudo-LFSR, it just needs to be fast and unpredictable */
export function getRNG(seed: string, iteration: number, totalPlayers: number) {
  let startDate = [...seed].reduce((acc, currentChar, index) => {
    return (
      acc + (currentChar.charCodeAt(0) + iteration + totalPlayers) * (index + 1)
    );
  }, 0);

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
export function getFingerprintString(
  seedNumber: number,
  fingerprintTokens: Array<string>,
) {
  const seed1 = seedNumber + 1;
  const seed2 = Math.floor(seedNumber / 10);
  const seed3 = seedNumber ^ (seedNumber >> 2);
  return (
    fingerprintTokens[seed1 % fingerprintTokens.length] +
    fingerprintTokens[seed2 % fingerprintTokens.length] +
    fingerprintTokens[seed3 % fingerprintTokens.length]
  );
}

export function getLocationIndex(seedNumber: number, locationsLength: number) {
  return seedNumber % locationsLength;
}

export function isSpy(
  seedNumber: number,
  playerId: number,
  totalPlayers: number,
) {
  const spy = seedNumber % totalPlayers;
  return playerId == spy;
}

export function getFirstPlayer(seedNumber: number, totalPlayers: number) {
  return Math.floor(seedNumber / 10) % totalPlayers;
}

export function generateNewSeed() {
  return [...Array(4)]
    .map(() => characters.charAt(Math.floor(Math.random() * charactersLength)))
    .join("");
}
