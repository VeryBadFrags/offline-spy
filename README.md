# Offline Spy

A serverless, standalone game inspired by [Spyfall](https://hwint.ru/portfolio-item/spyfall/) that can be played without an internet connection.
There are emojis to help non-english speakers.

[Play the game](https://spy.verybadfrags.com)

## How to play

Setup:
* All players must input the same *Code*, *Round* and total number of players
* Each player needs to pick a unique *Avatar*
* Start the game and confirm that all players have the same *Fingerprint*
* Start a 5 min timer

During the game:
* The spy has to guess what the current location is
* The innocent players have to guess who the spy is
* Players take turns asking questions to other players to identify the spy
* The player who just answered a question asks the next question

At the end of the timer:
* The players vote to designate the spy
    * If the players have voted for the spy, the spy has one chance to guess the location and win the game
    * If the players have voted for an innocent, the spy wins
* The players can vote during the game if they think they have found the spy
* The spy can guess the location before the end of the timer

## Build

Minify and bundle the css and js into a standalone HTML page.

* Get dependencies
    ```shell
    pip install htmlmin yuicompressor
    ```

* Get [qrencode](https://fukuchi.org/works/qrencode/index.html.en)

* Bundle and minify
    ```shell
    make
    ```

## Resources

* Colors: https://www.materialui.co/colors
* Emoji as Favicon: https://css-tricks.com/emojis-as-favicons/
