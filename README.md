## Connect 4 API
This is the backend for my Multiplayer Connect 4 Game. [Click here to view the code for the Front End.](https://github.com/AndrewWilborn/connect-4-api)

## Functions
The API uses 4 main functions to communicate with the backend.

# join
The join function allows a player to join the lobby and start a game and assigns the user a userId which is needed to stay connected to the game and submit moves.  If a game is already in progress the join function will set the user as a spectator.

# getGameState
The getGameState function allows players and spectators to view the current board and check for moves from the opponent.  It also keeps track of how long it has been since a player last checked the gamestate in order to handle disconnects.

# submitMove
The submit move functiona allows players to submit their move, it requires the userId of the player whose turn it is as well as which collumn the player is submitting their move to.

# reset
The reset function resets the game and disconnects both playres, it is called whenever someone leaves the game page.

## Website
[Click here to view the site!](https://connect-4-ajw.web.app)