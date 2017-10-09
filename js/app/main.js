import { Game } from './game.js'


Math.sign = Math.sign || function(x) {                                          // polyfill for IE
    x = +x;
    if (x === 0 || isNaN(x))
      return Number(x);

    return x > 0
      ? 1
      : -1;
  };


let game = new Game( variables );
game.load();