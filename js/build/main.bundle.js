/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(5);

Math.sign = Math.sign || function (x) {
  // polyfill for IE
  x = +x;
  if (x === 0 || isNaN(x)) return Number(x);

  return x > 0 ? 1 : -1;
};

var game = new _game.Game(variables);
game.load();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = exports.Renderer = function () {
  //render module

  function Renderer(settings) {
    _classCallCheck(this, Renderer);

    this.settings = settings;
    this.sprites = [];
    this.layers = {};
  }

  _createClass(Renderer, [{
    key: 'resizeCanvas',
    value: function resizeCanvas() {
      //Scaling the canvas depending on the screen size.
      //is executed at the beginning and window resize.
      var contElem = this.stage.container();
      contElem.style.height = window.innerHeight + 'px';

      var scale = contElem.clientHeight / this.settings.render.canvas.height;
      var realWidth = this.settings.render.canvas.width * scale;
      var realHeight = contElem.clientHeight;

      this.stage.width(realWidth).height(realHeight).scale({ x: scale, y: scale });
      this.stage.draw();
    }
  }, {
    key: 'loading',
    value: function loading() {
      var _this = this;

      //functions for 3-step loading

      this.container = document.getElementById(this.settings.render.canvas.container);
      this.stage = new Konva.Stage({
        container: this.container
      });

      this.resizeCanvas();
      window.addEventListener('resize', function () {
        _this.resizeCanvas();
      });

      this.layers.loading = new Konva.Layer();
      this.stage.add(this.layers.loading);
      this.loadingDraw();
    }
  }, {
    key: 'loading2',
    value: function loading2() {
      this.settings.render.loadImgs[1].image = this.loadImage;
      this.layers.loading.add(new Konva.Image(this.settings.render.loadImgs[1])).draw();
    }
  }, {
    key: 'loading3',
    value: function loading3() {
      this.settings.render.loadImgs[2].image = this.loadImage;
      this.layers.loading.add(new Konva.Image(this.settings.render.loadImgs[2])).draw();
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      this.layers.loading.hide();

      ['background', 'sprites', 'panel', 'pause', 'end', 'start'].forEach(function (layer) {
        _this2.layers[layer] = new Konva.Layer();
        _this2.stage.add(_this2.layers[layer]);
        _this2[layer + 'Draw']();
      });

      this.stage.find('.start').on('click touchend', function () {
        return _this2.onStart();
      });
    }
  }, {
    key: 'loadingDraw',
    value: function loadingDraw() {
      var _this3 = this;

      this.layers.loading.add(new Konva.Rect({
        fill: '#89f87f',
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height
      })).add(new Konva.Text(this.settings.render.loading)).draw();

      this.loadImage = new Image();

      this.loadImage.onload = function () {

        _this3.settings.render.loadImgs[0].image = _this3.loadImage;
        _this3.layers.loading.add(new Konva.Image(_this3.settings.render.loadImgs[0])).draw();
      };

      this.loadImage.src = 'sprites/loading.png';
    }
  }, {
    key: 'backgroundDraw',
    value: function backgroundDraw() {
      Object.assign(this.settings.render.pikes, {
        image: this.sprites.pikes,
        width: this.settings.render.canvas.width
      });

      this.layers.background.add(new Konva.Image({
        image: this.sprites.background,
        x: 0, y: 0,
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height
      })).add(new Konva.Image(this.settings.render.pikes)).draw();
    }
  }, {
    key: 'panelDraw',
    value: function panelDraw() {

      this.scoreText = new Konva.Text(this.settings.render.score);
      this.panel = new Konva.Group(this.settings.render.panel).add(this.scoreText);

      this.settings.render.lifes.image = this.sprites.life;
      for (var i = 0; i < this.settings.lifes; i++) {
        this.settings.render.lifes.x = this.settings.render.lifes.offset + i * (this.settings.render.lifes.space + this.settings.render.lifes.width);
        this.panel.add(new Konva.Image(this.settings.render.lifes));
      }

      Object.assign(this.settings.render.input, {
        x: 0,
        width: this.settings.render.canvas.width,
        align: 'center'
      });
      this.inputText = new Konva.Text(this.settings.render.input);

      this.inputTextClone = this.inputText.clone();
      this.inputTextClone.opacity(0);

      this.layers.panel.add(this.inputText).add(this.inputTextClone).add(this.panel);
    }
  }, {
    key: 'startDraw',
    value: function startDraw() {
      this.settings.render.startButton.image = this.sprites.start;

      this.layers.start.add(new Konva.Image({
        x: 0,
        y: 0,
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height,
        image: this.sprites['bg-start']
      })).add(new Konva.Image(this.settings.render.startButton)).draw();
    }
  }, {
    key: 'pauseDraw',
    value: function pauseDraw() {
      this.settings.render.pauseText.width = this.settings.render.canvas.width;
      this.layers.pause.add(new Konva.Text(this.settings.render.pauseText)).draw().hide();
    }
  }, {
    key: 'endDraw',
    value: function endDraw() {
      this.settings.render.winText.width = this.settings.render.canvas.width;
      this.settings.render.againButton.image = this.sprites.again;
      this.settings.render.loseImg1.image = this.sprites['end-lose-1'];
      this.settings.render.loseImg2.image = this.sprites['end-lose-2'];
      this.settings.render.winImg.image = this.sprites['end-win'];

      this.finalScore = new Konva.Text(this.settings.render.finalScore);

      this.layers.end.add(new Konva.Image({
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height,
        image: this.sprites['bg-end']
      })).add(new Konva.Image(this.settings.render.loseImg1)).add(new Konva.Image(this.settings.render.loseImg2)).add(new Konva.Image(this.settings.render.winImg)).add(new Konva.Text(this.settings.render.winText)).add(new Konva.Text(this.settings.render.finalScoreText)).add(this.finalScore).add(new Konva.Image(this.settings.render.againButton));
    }
  }, {
    key: 'spritesDraw',
    value: function spritesDraw() {}
  }, {
    key: 'onStart',
    value: function onStart() {}
  }, {
    key: 'start',
    value: function start() {
      this.layers.start.hide();
      this.layers.end.hide();
      this.layers.sprites.destroyChildren();
      this.render({ inputWord: '', score: 0, lifes: this.settings.lifes });
    }
  }, {
    key: 'pauseOn',
    value: function pauseOn() {
      this.layers.sprites.hide();
      this.layers.pause.show();
    }
  }, {
    key: 'pauseOff',
    value: function pauseOff() {
      this.layers.pause.hide();
      this.layers.sprites.show();
    }
  }, {
    key: 'end',
    value: function end(status, score) {
      this.finalScore.text(this.getScoreString(score));
      this.stage.find('.win').visible(status === 'win');
      this.stage.find('.lose').visible(status === 'lose');

      this.layers.end.show().draw();
    }
  }, {
    key: 'render',
    value: function render(_ref) {
      var inputWord = _ref.inputWord,
          lifes = _ref.lifes,
          score = _ref.score;

      this.inputText.text(inputWord);
      this.scoreText.text(this.getScoreString(score));

      this.stage.find('.life').forEach(function (life, i) {
        life.visible(i < lifes);
      });

      this.layers.sprites.draw();
      this.layers.panel.draw();
    }
  }, {
    key: 'initPanda',
    value: function initPanda(panda, sprite, img) {

      Object.assign(this.settings.render.panda, {
        image: this.sprites.panda,
        animation: panda.state
      });
      panda.sprite = new Konva.Sprite(this.settings.render.panda);
      panda.sprite.start();

      this.settings.render.wordImg.image = img;
      panda.img = new Konva.Image(this.settings.render.wordImg);

      panda.group = new Konva.Group({
        x: panda.x,
        y: panda.y,
        scaleX: panda.rotate
      }).add(panda.sprite).add(panda.img);

      this.layers.sprites.add(panda.group);
    }
  }, {
    key: 'renderPanda',
    value: function renderPanda(panda) {

      panda.group.x(panda.x).y(panda.y);

      panda.sprite.setAnimation(panda.state);

      if (panda.state === 'dead' || panda.state === 'win') panda.img.hide();

      panda.group.scaleX(panda.rotate);

      panda.img.scaleX(panda.rotate).x(panda.img.scaleX() == '1' ? this.settings.render.wordImg.x : this.settings.render.wordImg.x + this.settings.render.wordImg.width);
    }
  }, {
    key: 'deletePanda',
    value: function deletePanda(panda) {
      panda.group.remove();
    }
  }, {
    key: 'getScoreString',
    value: function getScoreString(score) {
      return this.settings.render.score.text.slice(0, -score.toString().length) + score;
    }
  }, {
    key: 'playInputTween',
    value: function playInputTween(word) {
      this.inputTextClone.text(word);
      this.inputTextClone.opacity(1);
      this.inputTextClone.fill(this.inputText.fill());

      var tween = new Konva.Tween({
        node: this.inputTextClone,
        duration: .5,
        fill: 'red',
        scaleX: 1.5,
        x: this.inputText.x() - this.inputText.width() * .25,
        scaleY: 1.5,
        y: this.inputText.y() - this.inputText.height() * .25,
        opacity: 0
      });

      tween.play();
    }
  }, {
    key: 'playDeadTween',
    value: function playDeadTween(panda) {
      var tween = new Konva.Tween({
        node: panda.sprite,
        duration: .5,
        y: 100
      });

      tween.play();
    }
  }]);

  return Renderer;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = exports.Loader = function () {
  function Loader() {
    _classCallCheck(this, Loader);
  }

  _createClass(Loader, [{
    key: 'loadImagesList',
    //module of loading functions

    value: function loadImagesList(folder, list) {
      //used for loading sprites
      return new Promise(function (resolve, reject) {
        //resolved promise returns object with images, where key is img filename without the extension
        var n = 0;
        var images = {};

        list.forEach(function (src) {
          var key = src.split('.')[0];

          images[key] = new Image();
          images[key].onload = function () {
            n++;
            if (n === list.length) resolve(images);
          };

          images[key].src = folder + '/' + src;
        });
      });
    }
  }, {
    key: 'loadAudioList',
    value: function loadAudioList(folder, list) {
      return new Promise(function (resolve, reject) {
        //same principle as for images
        var tracks = {};
        var n = 0;

        list.forEach(function (src) {
          var key = src.split('.')[0];
          var track = new Audio();

          track.oncanplaythrough = function () {
            tracks[key] = track;
            n++;
            if (n === list.length) resolve(tracks);
          };

          track.src = folder + '/' + src;
        });
      });
    }
  }, {
    key: 'loadImg',
    value: function loadImg(folder, src) {
      //at the beginning of the game we don't need to load images for all word at once
      return new Promise(function (resolve, reject) {
        //this function loads the selected image by generation of new panda
        var img = new Image();

        img.onload = function () {
          return resolve(img);
        };
        img.src = folder + '/' + src;
      });
    }
  }, {
    key: 'loadFolder',
    value: function loadFolder(folder) {
      //returns just list of files in folder
      return new Promise(function (resolve, reject) {
        //so we can easily add images to a folder without the need to edit the code.
        var xhr = new XMLHttpRequest();

        xhr.open('GET', 'php/get-folder.php?folder=' + folder);
        xhr.onload = function () {
          return resolve(JSON.parse(xhr.responseText));
        };
        xhr.send();
      });
    }
  }]);

  return Loader;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioPlayer = exports.AudioPlayer = function () {
  //game sound mode
  function AudioPlayer() {
    _classCallCheck(this, AudioPlayer);

    this.channels = {
      bg: document.getElementById('bg-audio'), //it uses two HTMLAudio elements,
      effects: document.getElementById('effects-audio') //the one for playing background music
    }; //and the one for sound effects ( sound of 'rescue' and 'dying')
    this.tracks = {};
    this.currectPlay = [];
  }

  _createClass(AudioPlayer, [{
    key: 'playTrack',
    value: function playTrack(name, channel) {
      var _this = this;

      var loop = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      //playing a track. 'Name' is the name of audio file without extension, 'channel' - see above, loop is used for background music
      this.channels[channel].src = this.tracks[name].src; //

      this.channels[channel].onloadedmetadata = function () {
        _this.channels[channel].currentTime = 0;
        _this.channels[channel].play();
        _this.channels[channel].loop = loop;
      };
    }
  }, {
    key: 'stop',
    value: function stop(channel) {
      this.channels[channel].pause();
    }
  }, {
    key: 'continue',
    value: function _continue(channel) {
      this.channels[channel].play(); //used for background music when returning from a pause
    }
  }]);

  return AudioPlayer;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Panda = exports.Panda = function () {
  function Panda(word, settings, x, speedX) {
    _classCallCheck(this, Panda);

    this.word = word;
    this.settings = settings;
    this.setState('enter');
    this.ownSpeedX = speedX; //keep the speed that we generated for the panda
    this.x = x;
    this.y = -this.settings.render.panda.height;
    this.rotate = Math.sign(speedX); //determine the direction of the panda, depending on the sign of horizontal speed
  }

  _createClass(Panda, [{
    key: 'setState',
    value: function setState(state) {
      this.state = state;
      switch (state) {

        case 'win': //when the entered word is correct and the animation is played
        case 'ouch': //the animation when the panda "dies" is played
        case 'dead':
          this.speedX = 0;
          this.speedY = 0;
          break;

        case 'fly':
          //the panda descends, moving in a zigzag
          this.speedX = this.ownSpeedX * -this.rotate;
          this.speedY = this.settings.panda.speedY;
          break;

        case 'enter':
          //when in the beginning the panda quickly descends from above
          this.speedX = 0;
          this.speedY = this.settings.panda.speedYEnter;
          break;

        case 'rescue':
          //when the rescued panda flies up
          this.speedX = 0;
          this.speedY = this.settings.panda.speedYup;
      }
    }
  }, {
    key: 'action',
    value: function action() {

      if (this.state !== 'dead') {
        //we define a new position
        this.calculatePosition(); //and from it, as well as from the animation state, determine the state of the panda
        this.nextState();
      }
    }
  }, {
    key: 'calculatePosition',
    value: function calculatePosition() {
      if (this.speedX !== 0 && (this.x < this.settings.panda.limitLeft || this.x > this.settings.panda.limitRight)) this.rotate = -this.rotate; //turn the panda in the opposite direction when it reaches the border

      this.y += this.speedY;
      this.x += this.speedX * this.rotate;
    }
  }, {
    key: 'nextState',
    value: function nextState() {
      if (this.state === 'enter' && this.y > this.settings.panda.enterY) this.setState('fly');

      if (this.state === 'win' && this.sprite.frameIndex() === 6) //when the animation is over
        this.setState('rescue');

      if (this.y < -this.settings.render.panda.height && this.state === 'rescue') this.setState('saved');

      if (this.state === 'fly' && this.y > this.settings.panda.fearY) this.setState('fear');

      if (this.state === 'fear' && this.y > this.settings.panda.limitY) this.setState('ouch');

      if (this.state === 'ouch' && this.sprite.frameIndex() === 3) //when the animation is over
        this.setState('dead');
    }
  }]);

  return Panda;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Game = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _renderer = __webpack_require__(1);

var _loader = __webpack_require__(2);

var _audioPlayer = __webpack_require__(3);

var _panda = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = exports.Game = function () {
  function Game(settings) {
    _classCallCheck(this, Game);

    this.settings = settings; //Here we pass the variables to the game.
    this.loader = new _loader.Loader();
    this.renderer = new _renderer.Renderer(settings);
    this.audioPlayer = new _audioPlayer.AudioPlayer();

    this.renderer.loading(); //Display first loading screen (with one panda)
  }

  _createClass(Game, [{
    key: 'load',
    value: function load() {
      var _this = this;

      this.loader.loadImagesList('sprites', ['panda.png', 'life.png', 'pikes.png', 'start.png', 'again.png', 'background.png', 'bg-start.png', 'bg-end.png', 'end-lose-1.png', 'end-lose-2.png', 'end-win.png']).then(function (images) {
        //Load the sprites, then display second loading screen
        _this.renderer.loading2();
        _this.renderer.sprites = images;
        return _this.loader.loadAudioList('audio', ['success.mp3', 'fail.mp3', 'background.mp3']);
      }).then(function (tracks) {
        //Load the audio files, then display third loading screen
        _this.renderer.loading3();
        _this.audioPlayer.tracks = tracks;
        return _this.loader.loadFolder(_this.settings.folder);
      }).then(function (data) {
        //Loading list of images and display start screen
        _this.wordBase = data;
        _this.renderer.init();
        _this.state = 'stop';
        _this.delegateEvents();
      });
    }
  }, {
    key: 'delegateEvents',
    value: function delegateEvents() {
      var _this2 = this;

      this.input = document.getElementById('game-input'); //We use input hidden outside of the screen to make it work on mobile devices.

      this.input.addEventListener('input', function (event) {
        return _this2.onInput(event);
      });
      this.input.addEventListener('keydown', function (event) {
        return _this2.onKeyDown(event);
      });

      this.renderer.stage.on('click touchend', function () {
        //When you click on the canvas, the cursor is focused on the input.
        _this2.input.focus(); //So you can add other interactive elements to the page, and the game should not intercept events from them.
        _this2.inputWord = _this2.input.value; //And then you can return to the game, just by clicking on it! (after you put its on a pause and googled the word ;-) )
      });

      this.renderer.onStart = this.start.bind(this);
    }
  }, {
    key: 'onInput',
    value: function onInput(event) {
      this.inputWord = this.input.value.toLowerCase();
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      if (event.keyCode === 9 && this.state !== 'stop') {
        //Tab
        event.preventDefault();
        this.pause();
      }

      if ((event.keyCode === 46 || event.keyCode === 13) && //Delete or Enter. I noticed that I press Enter out of habit. So this can be useful for quickly removing the wrong words.
      this.state === 'run') {

        this.inputWord = '';
        this.input.value = '';
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.lifes = this.settings.lifes; //Start settings.
      this.score = 0;
      this.inputWord = '';
      this.state = 'run';
      this.pandaIntervalCount = 0;
      this.pandas = [];
      this.words = this.wordBase.slice();

      this.renderer.start();
      this.audioPlayer.playTrack('background', 'bg', true);
      this.input.value = '';

      this.run();
    }
  }, {
    key: 'run',
    value: function run() {
      var _this3 = this;

      if (this.state === 'run') {
        //if game isn't paused
        setTimeout(function () {
          _this3.pandaIntervalCount++; //counts iterations since the last panda generation

          if (_this3.lifes === 0) _this3.lose();else if (_this3.words.length > 0 || _this3.pandas.length > 0) {

            if (_this3.words.length > 0) {
              //if there are still words, we generate a panda with a given probability,
              if (_this3.pandas.length < _this3.settings.panda.maxNumber //or generate immediately if the pandas are over
              && _this3.pandaIntervalCount > _this3.settings.panda.minInterval && Math.random() < _this3.settings.panda.generationChance || _this3.pandas.length === 0) _this3.generatePanda();
            }

            var inputString = _this3.inputWord //I left the opportunity to use phrases.
            .split(' ') //so we check that the entered string contains all the words in the phrase and no other
            .filter(function (word) {
              return word !== '';
            }).sort().join('_');

            _this3.pandas.forEach(function (panda, i) {
              //We determine for each panda its state and position,
              //depending on our actions and pandas previous position, then draw its sprite on the canvas.
              panda.action();
              var wordString = panda.word.split('_').filter(function (word) {
                return word !== '';
              }).sort().join('_');

              if (inputString === wordString) _this3.rescuePanda(panda, i);

              if (panda.state === 'dead') _this3.losePanda(panda, i);

              if (panda.state === 'saved') {
                //If the saved panda flew off the screen, we remove it from the array
                _this3.pandas.splice(i, 1);
                _this3.renderer.deletePanda(panda);
              } else _this3.renderer.renderPanda(panda);
            });

            _this3.renderer.render({ //we draw the screen with the changed parameters
              inputWord: _this3.inputWord,
              score: _this3.score,
              lifes: _this3.lifes
            });

            _this3.run(); //next iteration
          } else _this3.finish(); //so if we have no words left and all pandas are saved, we are finishing
        }, this.settings.timeRate);
      }
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (this.state !== 'pause') {
        this.state = 'pause';
        this.renderer.pauseOn();
        this.audioPlayer.stop('bg');
      } else {
        this.state = 'run';
        this.renderer.pauseOff();
        this.audioPlayer.continue('bg');
        this.run();
      }
    }
  }, {
    key: 'finish',
    value: function finish() {
      this.state = 'stop';
      this.audioPlayer.stop('bg');
      this.renderer.end(this.lifes === this.settings.lifes //we check whether we have lost pandas, although we have reached the end
      ? 'win' : 'lose', this.score);
    }
  }, {
    key: 'lose',
    value: function lose() {
      this.state = 'stop';
      this.audioPlayer.stop('bg');
      this.renderer.end('lose', this.score);
    }
  }, {
    key: 'generatePanda',
    value: function generatePanda() {
      var _this4 = this;

      var rnd = Math.floor(Math.random() * this.words.length),
          //random position in words array
      speedX = this.settings.panda.speedX * (1 + this.settings.panda.speedXvariation - Math.random() / 2) //random relative speed variation
      * Math.sign(Math.random() - .5),
          //random direction
      selected = this.words.splice(rnd, 1)[0];

      var overlay = false,
          x = void 0;

      do {
        overlay = false; //We generate a random x coordinate for the panda and
        x = (this.settings.panda.limitRight - this.settings.panda.limitLeft) * //check if its sprite is overlayed on another panda
        Math.random() + this.settings.panda.limitLeft;

        this.pandas.forEach(function (panda) {
          if (panda.y < _this4.settings.render.panda.height //Since the sprites are large, we allow the overlay of 1/4 of the width on each side.
          && Math.abs(panda.x - x) > _this4.settings.render.panda.width * 0.25 //That's why changing the size of the panda in the larger direction can cause bugs.
          && Math.abs(panda.x - x) < _this4.settings.render.panda.width * 0.75) overlay = true;
        });
      } while (overlay);

      this.loader.loadImg(this.settings.folder, selected).then(function (img) {
        var panda = new _panda.Panda(selected.split('.')[0], _this4.settings, x, speedX);

        _this4.pandas.push(panda);
        _this4.renderer.initPanda(panda, 'panda', img);
        _this4.pandaIntervalCount = 0;
      });
    }
  }, {
    key: 'rescuePanda',
    value: function rescuePanda(panda, i) {
      this.renderer.playInputTween(this.inputWord); //when the correct word is entered
      this.audioPlayer.playTrack('success', 'effects'); //We haven't yet removed the panda from the array to continue to calculate its position
      panda.setState('win');

      this.score++;
      this.inputWord = '';
      this.input.value = '';
    }
  }, {
    key: 'losePanda',
    value: function losePanda(panda, i) {
      this.renderer.playDeadTween(panda);
      this.audioPlayer.playTrack('fail', 'effects');

      this.pandas.splice(i, 1);
      this.lifes--;
    }
  }]);

  return Game;
}();

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map