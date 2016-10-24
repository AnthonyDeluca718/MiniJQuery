## JavaScript Chess

[Live Site]
()

### Functionality

All of the core functionality of chess is implemented:
-Players are restricted to legal moves
-The game automatically checks for Checkmate and Stalemate
-Castling is implemented correctly (you cannot castle through check or if either the King or the Rook has previously moved. You also cannot castle when in check)
-Alerts when a player is put into check

However some rarely occurring rules are not implemented:
-En Peasant
-Threefold repetition draws
-Fifty Move Rule

### Display

![Gameplay] (https://github.com/AnthonyDeluca718/JS_Chess/blob/master/assets/images/gameplay.png)

### Main Technologies

- Game Logic is written is Javascript (mostly ES6)
- Interactive display uses React/Redux
- Webpack is used to bundle and serve up the various scripts

### Implementation Notes