function removeOptions(selectElement) {
    for (let i = selectElement.options.length - 1; i >= 0; i--) {
        selectElement.remove(i);
    }
}

/* Init seed */
{
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
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
    for (let i = 0; i < locationsList.length; i++) {
        let locationName = locationsList[i];
        let li = document.createElement("li");
        li.innerHTML = locationName;
        locationsListElement.appendChild(li);
    }
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
