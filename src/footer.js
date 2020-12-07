let intervalId;

function startGame() {
    resetErrors();

    /* Get the Game params */
    let seed = document.getElementById("seed").value.toUpperCase();
    let iterationField = document.getElementById("iteration");
    let playerSelect = document.getElementById("player");
    let playerID = Number(playerSelect.options[playerSelect.selectedIndex].value);
    let totalPlayers = getTotalNumberOfPlayers();

    /* Validate the params */
    while (seed.length < 4) {
        seed += "A";
    }
    if (playerID > totalPlayers) {
        let errorBox = document.getElementById("error");
        errorBox.innerHTML = "Error: 👤 > 👥 <br> Player # greater than total number of players";
        errorBox.style.display = "block";
        return;
    }

    /* Generate randomness and setup the game window */
    {
        let randomNumber = getRNG(seed, iterationField.value, totalPlayers);

        /* Set Location */
        {
            let locationName = "❓";
            let isSpy = isPsy(randomNumber, playerID, totalPlayers);
            if (!isSpy) {
                locationName = getLocation(randomNumber);
                document.getElementById("spyBlock").style.display = "none";
                document.getElementById("innocentBlock").style.display = "block";
            } else {
                document.getElementById("spyBlock").style.display = "block";
                document.getElementById("innocentBlock").style.display = "none";
            }
            document.getElementById("location").innerHTML = locationName;
        }

        /* Set Fingerprint */
        {
            let fingerprint = getFingerprint(randomNumber);
            document.getElementById("fingerprint").innerHTML = fingerprint;
        }

        /* Set First Player */
        {
            let firstPlayer = getFirstPlayer(randomNumber, playerID, totalPlayers);
            document.getElementById("firstPlayer").innerHTML = players[firstPlayer];
        }

        document.getElementById("playerid").innerHTML = players[playerID];
        iterationField.value = iterationField.value * 1 + 1;
    }

    {
        document.getElementById("startButton").innerHTML = "🏁 Start Next Round";
        document.getElementById("secretBlock").style.display = "block";

        /* Start timer */
        let timer = document.getElementById('timer');
        startTimer(60 * 5, timer);

        document.getElementById("gameWindow").style.display = "inline-block";
        window.scrollTo(0, 0);
    }
}

function resetErrors() {
    let errorBox = document.getElementById("error");
    errorBox.style.display = "none";
    errorBox.innerHTML = "";
}

/* Pseudo-LFSR, it just needs to be fast and unpredictable */
function getRNG(seed, iteration, totalPlayers) {
    let startDate = 0;
    for (let i = 0; i < seed.length; i++) {
        let charCode = seed.charCodeAt(i) + iteration + totalPlayers;
        startDate += charCode * (i + 1);
    }

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
    }
    while ((lfsr % modulo) != startDate);

    return period;
}

/* Generate a 3-emoji fingerprint to confirm that players are on the same game */
function getFingerprint(seedNumber) {
    let seed1 = seedNumber + 1;
    let seed2 = Math.floor(seedNumber / 10);
    let seed3 = seedNumber ^ seedNumber >> 2;
    return validations[seed1 % validations.length] + validations[seed2 % validations.length] + validations[seed3 % validations.length];
}

function getLocation(seedNumber) {
    return locationsList[seedNumber % locationsList.length];
}

function isPsy(seedNumber, playerId, totalPlayers) {
    let spy = (seedNumber % totalPlayers);
    return playerId == spy;
}

function getFirstPlayer(seedNumber, playerId, totalPlayers) {
    return (Math.floor(seedNumber / 10) % totalPlayers);
}

function showHide(elementId) {
    let elem = document.getElementById(elementId);
    if (elem.style.display === 'none') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
}

function getTotalNumberOfPlayers() {
    return document.getElementById("total-players").value;
}

/* Remove the Options from a Select */
function removeOptions(selectElement) {
    for (let i = selectElement.options.length - 1; i >= 0; i--) {
        selectElement.remove(i);
    }
}

function startTimer(duration, display) {
    clearInterval(intervalId);
    var timer = duration;
    setTimerDisplay(timer, display);
    intervalId = setInterval(function () {
        timer--;
        setTimerDisplay(timer, display);
        if (timer < 0) {
            display.textContent = "🔔 Time's up! Who is the Spy?";
            clearInterval(intervalId);
        }
    }, 1000);
}

function setTimerDisplay(timer, display) {
    let minutes = parseInt(timer / 60, 10);
    let seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? ("0" + minutes) : minutes;
    seconds = seconds < 10 ? ("0" + seconds) : seconds;

    display.textContent = `⏱ ${minutes}:${seconds}`;
}

/* onload */

/* Init seed */
{
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    const charactersLength = characters.length;

    let newSeed = "";
    for (let i = 0; i < 4; i++) {
        newSeed += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    document.getElementById("seed").value = newSeed;
}

/* Show the list of Locations */
{
    let locationsListElement = document.getElementById("locationsList");
    locationsList.forEach(locationName => {
        let li = document.createElement("li");
        li.innerHTML = locationName;
        locationsListElement.appendChild(li);
    });
}

/* Set the list of available Avatars */
const playerListElement = document.getElementById("player");
function setPlayersList() {
    removeOptions(playerListElement);
    let totalPlayers = getTotalNumberOfPlayers();
    for (let i = 0; i < players.length && i < totalPlayers; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = players[i];
        playerListElement.appendChild(opt);
    }
}

document.getElementById("total-players").max = players.length;
setPlayersList();
