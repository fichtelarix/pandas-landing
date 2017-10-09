import { Renderer } from './renderer.js'
import { Loader } from './loader.js'
import { AudioPlayer } from './audio-player.js'
import { Panda } from './panda.js'

export class Game {
  constructor( settings ) {
    this.settings = settings;                                                   //Here we pass the variables to the game.
    this.loader = new Loader();
    this.renderer = new Renderer( settings );
    this.audioPlayer = new AudioPlayer();

    this.renderer.loading();                                                    //Display first loading screen (with one panda)
  };

  load() {
    this.loader.loadImagesList('sprites',
      [ 'panda.png', 'life.png', 'pikes.png', 'start.png', 'again.png',
        'background.png', 'bg-start.png', 'bg-end.png', 'end-lose-1.png',
        'end-lose-2.png','end-win.png' ])

      .then( images => {                                                        //Load the sprites, then display second loading screen
        this.renderer.loading2();
        this.renderer.sprites = images;
        return this.loader.loadAudioList('audio',
          [ 'success.mp3', 'fail.mp3', 'background.mp3' ]);
      })

      .then( tracks => {                                                        //Load the audio files, then display third loading screen
        this.renderer.loading3();
        this.audioPlayer.tracks = tracks;
        return this.loader.loadFolder( this.settings.folder );
      })

      .then( (data) => {                                                        //Loading list of images and display start screen
        this.wordBase = data;
        this.renderer.init();
        this.state = 'stop';
        this.delegateEvents();
      });
  }

  delegateEvents() {
    this.input = document.getElementById('game-input');                         //We use input hidden outside of the screen to make it work on mobile devices.

    this.input.addEventListener('input', event => this.onInput(event) );
    this.input.addEventListener('keydown', ( event ) => this.onKeyDown( event ));

    this.renderer.stage.on('click touchend', () => {                            //When you click on the canvas, the cursor is focused on the input.
      this.input.focus();                                                       //So you can add other interactive elements to the page, and the game should not intercept events from them.
      this.inputWord = this.input.value;                                        //And then you can return to the game, just by clicking on it! (after you put its on a pause and googled the word ;-) )
    });

    this.renderer.onStart = this.start.bind(this);
  }

  onInput(event) {
    this.inputWord = this.input.value.toLowerCase();
  }

  onKeyDown( event ) {
    if ( event.keyCode === 9 && this.state !== 'stop' ) {                       //Tab
      event.preventDefault();
      this.pause();
    }

    if( (event.keyCode === 46 || event.keyCode === 13)                          //Delete or Enter. I noticed that I press Enter out of habit. So this can be useful for quickly removing the wrong words.
      && this.state === 'run' ) {

      this.inputWord = '';
      this.input.value = '';
    }
  }

  start() {
    this.lifes = this.settings.lifes;                                           //Start settings.
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

  run() {
    if( this.state === 'run' ) {                                                //if game isn't paused
      setTimeout(() => {
        this.pandaIntervalCount++;                                              //counts iterations since the last panda generation

        if ( this.lifes === 0 )
          this.lose();
        else

        if (this.words.length > 0 || this.pandas.length > 0) {

          if ( this.words.length > 0 ) {                                        //if there are still words, we generate a panda with a given probability,
            if ( (this.pandas.length     < this.settings.panda.maxNumber        //or generate immediately if the pandas are over
              && this.pandaIntervalCount > this.settings.panda.minInterval
              && Math.random() < this.settings.panda.generationChance )
              || this.pandas.length === 0  )
              this.generatePanda();
          }

          let inputString = this.inputWord                                      //I left the opportunity to use phrases.
            .split(' ')                                                         //so we check that the entered string contains all the words in the phrase and no other
            .filter( word => word!=='' )
            .sort()
            .join('_');

          this.pandas.forEach( ( panda, i ) => {                                //We determine for each panda its state and position,
                                                                                //depending on our actions and pandas previous position, then draw its sprite on the canvas.
            panda.action();
            let wordString = panda.word
              .split('_')
              .filter( word => word!=='' )
              .sort()
              .join('_');

            if ( inputString === wordString )
              this.rescuePanda( panda, i );

            if ( panda.state === 'dead' )
              this.losePanda( panda, i );

            if ( panda.state === 'saved' ) {                                    //If the saved panda flew off the screen, we remove it from the array
              this.pandas.splice( i, 1 );
              this.renderer.deletePanda( panda );
            } else
              this.renderer.renderPanda( panda );
          });

          this.renderer.render({                                                //we draw the screen with the changed parameters
            inputWord: this.inputWord,
            score: this.score,
            lifes: this.lifes
          });

          this.run();                                                           //next iteration
        } else
          this.finish();                                                        //so if we have no words left and all pandas are saved, we are finishing

      }, this.settings.timeRate );
    }
  }

  pause() {
    if ( this.state !== 'pause' ) {
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

  finish() {
    this.state = 'stop';
    this.audioPlayer.stop('bg');
    this.renderer.end( this.lifes === this.settings.lifes                       //we check whether we have lost pandas, although we have reached the end
      ? 'win'
      : 'lose', this.score );
  }

  lose() {
    this.state = 'stop';
    this.audioPlayer.stop('bg');
    this.renderer.end( 'lose', this.score );
  }

  generatePanda() {
    const rnd = Math.floor( Math.random() * this.words.length ),                //random position in words array
      speedX = this.settings.panda.speedX
        * ( 1 + this.settings.panda.speedXvariation - Math.random() / 2 )       //random relative speed variation
        * Math.sign( Math.random() - .5),                                       //random direction
      selected = this.words.splice( rnd, 1 )[0];

    let overlay = false,
      x;

    do {
      overlay = false;                                                          //We generate a random x coordinate for the panda and
      x = ( this.settings.panda.limitRight - this.settings.panda.limitLeft )    //check if its sprite is overlayed on another panda
        * Math.random() + this.settings.panda.limitLeft;

      this.pandas.forEach( panda => {
        if ( panda.y < this.settings.render.panda.height                        //Since the sprites are large, we allow the overlay of 1/4 of the width on each side.
          && Math.abs( panda.x - x ) > this.settings.render.panda.width * 0.25  //That's why changing the size of the panda in the larger direction can cause bugs.
          && Math.abs( panda.x - x ) < this.settings.render.panda.width * 0.75 )
          overlay = true;
      });
    }
    while ( overlay );

    this.loader.loadImg( this.settings.folder, selected )
      .then( (img) => {
        const panda = new Panda( selected.split('.')[0], this.settings, x, speedX);

        this.pandas.push( panda );
        this.renderer.initPanda( panda, 'panda', img );
        this.pandaIntervalCount = 0;
      });
  }

  rescuePanda( panda, i ) {
    this.renderer.playInputTween( this.inputWord );                             //when the correct word is entered
    this.audioPlayer.playTrack('success', 'effects');                           //We haven't yet removed the panda from the array to continue to calculate its position
    panda.setState('win');

    this.score++;
    this.inputWord = '';
    this.input.value = '';
  }

  losePanda( panda, i ) {
    this.renderer.playDeadTween( panda );
    this.audioPlayer.playTrack('fail', 'effects');

    this.pandas.splice( i, 1 );
    this.lifes--;
  }
}