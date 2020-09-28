/* Init seed */
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var charactersLength = characters.length;
var newSeed = "";
for (let i = 0; i < 4; i++) {
    newSeed += characters.charAt(Math.floor(Math.random() * charactersLength));
}
document.getElementById("seed").value = newSeed;

/* Show the list of Locations */
var locationsListElement = document.getElementById("locationsList");
for (let i = 0; i < locationsList.length; i++) {
    var locationName = locationsList[i];
    var li = document.createElement("li");
    li.innerHTML = locationName;
    locationsListElement.appendChild(li);
}

/* Set the list of available Avatars */
const playerListElement = document.getElementById("player");
function setPlayersList() {
    removeOptions(playerListElement);
    var totalPlayers = getTotalNumberOfPlayers();
    for (let i = 0; i < players.length && i < totalPlayers; i++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = players[i];
        playerListElement.appendChild(opt);
    }
}

setPlayersList();
