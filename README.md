# Offline Spy

A serverless, standalone game inspired by [Spyfall](https://hwint.ru/portfolio-item/spyfall/) that can be played without an internet connection.
There are emojis to help non-english speakers.

[Play the game](https://spy.verybadfrags.com)

## How to play

* All players need to input the same seed, iteration number and total number of players.
* Each player needs to pick a unique player ID.
* Start the game and confirm that all players have the same fingerprint.


* The spy has to guess what the current location is.
* The innocent players have to guess who the spy is.
* Try to establish trust without giving away the location.
* At the end of the game, the players vote to designate the spy.
    * If the players have voted for the spy, the spy has one chance to guess the location and win the game.
    * If the players have voted for an innocent, the spy wins.

## Build

These steps are only needed if you want to minify the page.

Get [htmlmin](https://pypi.org/project/htmlmin/)
```shell
pip3 install htmlmin
```

Minify the page
```shell
make
```

## Resources

* Colors: https://www.materialui.co/colors
