class Game {
  constructor( settings ) {
    this.settings = settings;
    this.loader = new Loader();
    this.renderer = new Renderer( settings );
    this.audioPlayer = new AudioPlayer();
  };

  load() {
    this.loader.loadImagesList('sprites', [ 'panda.png', 'life.png', 'pikes.png', 'start.png', 'again.png' ])
      .then( (images) => {
        this.renderer.sprites = images;
        return this.loader.loadAudioList('audio', [ 'success.mp3', 'fail.mp3', 'background.mp3' ]);
      })
      .then( (tracksBuffer) =>
        this.audioPlayer.decodeAll( tracksBuffer )
      )
      .then( () =>
        this.loader.loadFolder('words')
      )
      .then( (data) => {
        this.wordBase = data;
        this.renderer.init();
        this.state = 'stop';
        this.delegateEvents();
    });
  }

  delegateEvents() {
    document.addEventListener('keypress', event => this.onKeyPress(event) );
    this.renderer.onStart = this.start.bind(this);
  }

  onKeyPress( event ) {
    if ( event.key === ' ' && this.state !== 'stop' ) {
      event.preventDefault();
      this.pause();
    }

    if (this.state === 'run') {
      event.preventDefault();

      if( (event.charCode >= 65 && event.charCode <= 90) ||  (event.charCode >= 97 && event.charCode <= 122) )
        this.inputWord += event.key.toLowerCase();



      if( event.key === 'Backspace' )
        this.inputWord = this.inputWord.slice(0, -1);

      if( event.key === 'Delete' || event.key === 'Enter' )
        this.inputWord = '';
    }
  }

  start() {
    this.lifes = this.settings.lifes;
    this.score = 0;
    this.inputWord = '';
    this.state = 'run';
    this.pandaIntervalCount = 0;
    this.pandas = [];
    this.words = this.wordBase.slice();

    this.renderer.start();
    this.audioPlayer.playTrack('background', true);

    this.run();
  }

  run() {
    if( this.state === 'run' ) {
      setTimeout(() => {
        this.pandaIntervalCount++;

        if ( this.lifes === 0 )
          this.lose();
        else

        if (this.words.length > 0 || this.pandas.length > 0) {

          if ( this.words.length > 0 ) {
            if ( (this.pandas.length     < this.settings.panda.maxNumber
              && this.pandaIntervalCount > this.settings.panda.minInterval
              && Math.random() < 0.05 )
              || this.pandas.length === 0  )
              this.generatePanda();
          }

          this.pandas.forEach( ( panda, i ) => {

            panda.action();

            if ( this.inputWord === panda.word.toLowerCase() )
              this.rescuePanda( panda, i );

            if ( panda.state === 'dead' )
              this.losePanda( panda, i );

            this.renderer.renderPanda( panda );

            if ( panda.state === 'saved' ) {
              this.pandas.splice( i, 1 );
              this.renderer.deletePanda( panda );
            }
          });

          this.renderer.render({
            inputWord: this.inputWord,
            score: this.score,
            lifes: this.lifes
          });

          this.run();
        } else
          this.finish();

      }, this.settings.timeRate );
    }
  }

  pause() {
    if ( this.state !== 'pause' ) {
      this.state = 'pause';
      this.renderer.pauseOn();
      this.audioPlayer.stop('background');

    } else {
      this.state = 'run';
      this.renderer.pauseOff();
      this.audioPlayer.continue('background');
      this.run();
    }
  }

  finish() {
    this.state = 'stop';
    this.audioPlayer.stop('background');
    this.renderer.end( 'win', this.score );
  }

  lose() {
    this.state = 'stop';
    this.audioPlayer.stop('background');
    this.renderer.end( 'lose', this.score );
  }

  generatePanda() {
    const rnd = Math.floor( Math.random() * this.words.length ),
      speedX = this.settings.panda.speedX * ( 1.25 - Math.random() / 2 ) * Math.sign( Math.random() - .5),
      selected = this.words.splice( rnd, 1 )[0];
    let overlay = false,
      x;

    do {
      overlay = false;
      x = ( this.settings.panda.limitRight - this.settings.panda.limitLeft )
        * Math.random() + this.settings.panda.limitLeft;

      this.pandas.forEach( panda => {
        if ( panda.y < this.settings.render.panda.height
          && Math.abs( panda.x - x ) < this.settings.render.panda.width )
          overlay = true;
      });
    }
    while ( overlay );

    this.loader.loadImg( 'words', selected )
      .then( (img) => {
        const panda = new Panda( selected.split('.')[0], this.settings, x, speedX);

        this.pandas.push( panda );
        this.renderer.initPanda( panda, 'panda', img );
        this.pandaIntervalCount = 0;
      });
  }

  rescuePanda( panda, i ) {
    this.score++;
    this.audioPlayer.playTrack('success');
    panda.setState('win');
    this.inputWord = '';
  }

  losePanda( panda, i ) {
    this.pandas.splice( i, 1 );
    this.audioPlayer.playTrack('fail');
    this.lifes--;
  }
}

let game = new Game( variables );

game.load();
