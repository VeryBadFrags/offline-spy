function startGame() {
    resetErrors();

    /* Get the Game params */
    var seed = document.getElementById("seed").value.toUpperCase();
    var iterationField = document.getElementById("iteration");
    var playerElement = document.getElementById("player");
    var player = playerElement.options[playerElement.selectedIndex].value;
    var totalPlayers = getTotalNumberOfPlayers();

    /* Validate the params */
    while (seed.length < 4) {
        seed += "A";
    }
    if (player + 1 > totalPlayers) {
        var errorBox = document.getElementById("error");
        errorBox.innerHTML = "Error: 👤 > 👥 <br> Player # greater than total number of players"
        errorBox.style.display = "block";
        return;
    }

    /* Generate randomness */
    var randomNumber = getRNG(seed, iterationField.value, totalPlayers);
    var signature = getFingerprint(randomNumber);
    var isSpy = isPsy(randomNumber, player, totalPlayers);
    var firstPlayer = getFirstPlayer(randomNumber, player, totalPlayers);

    var locationName = "❓";
    if (!isSpy) {
        locationName = getLocation(randomNumber);
        document.getElementById("spyBlock").style.display = "none";
        document.getElementById("innocentBlock").style.display = "block";
    } else {
        document.getElementById("spyBlock").style.display = "block";
        document.getElementById("innocentBlock").style.display = "none";
    }

    /* Setup the Game Window */
    document.getElementById("fingerprint").innerHTML = signature;
    document.getElementById("playerid").innerHTML = players[player];
    document.getElementById("location").innerHTML = locationName;
    document.getElementById("firstPlayer").innerHTML = players[firstPlayer];
    iterationField.value = iterationField.value * 1 + 1;

    document.getElementById("secretBlock").style.display = "block"
    document.getElementById("gameWindow").style.display = "inline-block";
    window.scrollTo(0, 0);
}

function resetErrors() {
    var errorBox = document.getElementById("error");
    errorBox.style.display = "none";
    errorBox.innerHTML = "";
}

/* Pseudo-LFSR, it just needs to be fast and unpredictable */
function getRNG(seed, iteration, totalPlayers) {
    var startDate = 0;
    for (let i = 0; i < seed.length; i++) {
        var charCode = seed.charCodeAt(i) + iteration + totalPlayers;
        startDate += charCode * (i + 1);
    }

    var modulo = 65536;
    startDate %= modulo;
    var lfsr = startDate;
    var period = 0;

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

/* Generate a 3-emoji signature to confirm that players are on the same game */
function getFingerprint(seedNumber) {
    var seed1 = seedNumber + 1;
    var seed2 = Math.floor(seedNumber / 10);
    var seed3 = seedNumber ^ seedNumber >> 2;
    return validations[seed1 % validations.length] + validations[seed2 % validations.length] + validations[seed3 % validations.length];
}

function getLocation(seedNumber) {
    return locationsList[seedNumber % locationsList.length];
}

function isPsy(seedNumber, playerId, totalPlayers) {
    var spy = (seedNumber % totalPlayers);
    return playerId == spy;
}

function getFirstPlayer(seedNumber, playerId, totalPlayers) {
    return (Math.floor(seedNumber / 10) % totalPlayers);
}

function showHide(elementId) {
    var elem = document.getElementById(elementId);
    if (elem.style.display === 'none') {
        elem.style.display = 'block';
    } else {
        elem.style.display = 'none';
    }
}

function getTotalNumberOfPlayers() {
    return document.getElementById("total-players").value;
}

function removeOptions(selectElement) {
    for (var i = selectElement.options.length - 1; i >= 0; i--) {
        selectElement.remove(i);
    }
}
