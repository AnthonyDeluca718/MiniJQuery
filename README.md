## MiniJQuery

[Live: Demonstration Tic Tac Toe]
(https://anthonydeluca718.github.io/MiniJQuery/)

### Functionality

All of the core functionality of chess is implemented:
-Players are restricted to legal moves
-The game automatically checks for Checkmate and Stalemate
-Castling is implemented correctly (you cannot castle through check or if either the King or the Rook has previously moved. You also cannot castle when in check)
-Alerts when a player is put into check

Using $l.ajax:
-Get Requests automatically add data key-value pairs to the url
-The method assumes that any data or error messages returned from the server will be formatted as JSON
-Two optional parameters input.contentType and input.processData control what you send to the server. By default the contentType is set to 'application/json' and processData is set to true.
-If processData is set to true then input.data will have JSON.parse called on it before being passed to the server.
-The attribute 'Content-Type' will be set to the variable input.contentType
-If you want to send a **FormData** object to the server set contentType to null and processData to false.


### Display

![Gameplay] (https://github.com/AnthonyDeluca718/JS_Chess/blob/master/assets/images/gameplay.png)

### Main Technologies

- Game Logic is written is Javascript (mostly ES6)
- Interactive display uses React/Redux
- Webpack is used to bundle and serve up the various scripts

### Implementation Notes
