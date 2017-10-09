export class Renderer {                                                         //render module

  constructor( settings ) {
    this.settings = settings;
    this.sprites = [];
    this.layers = {};
  }

  resizeCanvas() {                                                              //Scaling the canvas depending on the screen size.
                                                                                //is executed at the beginning and window resize.
    const contElem = this.stage.container();
    contElem.style.height = window.innerHeight + 'px';

    const scale = contElem.clientHeight / this.settings.render.canvas.height;
    const realWidth = this.settings.render.canvas.width * scale;
    const realHeight =  contElem.clientHeight;

    this.stage.width( realWidth )
      .height( realHeight )
      .scale({x: scale, y: scale});
    this.stage.draw();
  }

  loading() {                                                                   //functions for 3-step loading

    this.container = document.getElementById( this.settings.render.canvas.container );
    this.stage = new Konva.Stage({
      container: this.container
    });

    this.resizeCanvas();
    window.addEventListener('resize', () => { this.resizeCanvas() });

    this.layers.loading =  new Konva.Layer();
    this.stage.add( this.layers.loading );
    this.loadingDraw();
  }

  loading2() {
    this.settings.render.loadImgs[1] = this.loadImage;
    this.layers.loading.add(
      new Konva.Image( this.settings.render.loadImgs[1] )
    ).draw();
  }

  loading3() {
    this.settings.render.loadImgs[2] = this.loadImage;
    this.layers.loading.add(
      new Konva.Image( this.settings.render.loadImgs[2] )
    ).draw();
  }

  init() {

    this.layers.loading.hide();

    [ 'background', 'sprites', 'panel', 'pause', 'end', 'start' ].forEach( (layer) => {
      this.layers[layer] = new Konva.Layer();
      this.stage.add( this.layers[layer] );
      this[ `${layer}Draw` ]();
    });

    this.stage.find('.start').on('click touchend', () => this.onStart() );
  }

  loadingDraw() {
    this.layers.loading.add(
      new Konva.Rect({
        fill: '#89f87f',
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height,
      })
    ).add(
      new Konva.Text( this.settings.render.loading )
    )
      .draw();

    this.loadImage = new Image();

    this.loadImage.onload = () => {

      this.settings.render.loadImgs[0] = this.loadImage;
      this.layers.loading.add(
        new Konva.Image( this.settings.render.loadImgs[0] )
      ).draw();
    };

    this.loadImage.src = 'sprites/loading.png';
  }

  backgroundDraw() {
    Object.assign( this.settings.render.pikes, {
      image: this.sprites.pikes,
      width: this.settings.render.canvas.width,
    });

    this.layers.background.add(
      new Konva.Image({
        image: this.sprites.background,
        x: 0, y: 0,
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height
      })
    ).add(
      new Konva.Image( this.settings.render.pikes )
    ).draw();
  }

  panelDraw() {

    this.scoreText = new Konva.Text( this.settings.render.score );
    this.panel = new Konva.Group( this.settings.render.panel )
      .add( this.scoreText );

    this.settings.render.lifes.image = this.sprites.life;
    for ( let i = 0; i < this.settings.lifes; i++ ) {
      this.settings.render.lifes.x = this.settings.render.lifes.offset + i *
        ( this.settings.render.lifes.space + this.settings.render.lifes.width );
      this.panel.add(
        new Konva.Image( this.settings.render.lifes ));
    }

    Object.assign( this.settings.render.input, {
      x: 0,
      width: this.settings.render.canvas.width,
      align: 'center'
    });
    this.inputText = new Konva.Text( this.settings.render.input );

    this.inputTextClone = this.inputText.clone();
    this.inputTextClone.opacity(0);

    this.layers.panel
      .add( this.inputText )
      .add( this.inputTextClone )
      .add( this.panel );
  }

  startDraw() {
    this.settings.render.startButton.image = this.sprites.start;

    this.layers.start
      .add( new Konva.Image({
        x: 0,
        y: 0,
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height,
        image: this.sprites['bg-start'],
      }))
      .add( new Konva.Image( this.settings.render.startButton ))
      .draw();
  }

  pauseDraw() {
    this.settings.render.pauseText.width = this.settings.render.canvas.width;
    this.layers.pause.add(
      new Konva.Text( this.settings.render.pauseText ))
      .draw()
      .hide();
  }

  endDraw() {
    this.settings.render.winText.width = this.settings.render.canvas.width;
    this.settings.render.againButton.image = this.sprites.again;
    this.settings.render.loseImg1.image = this.sprites['end-lose-1'];
    this.settings.render.loseImg2.image = this.sprites['end-lose-2'];
    this.settings.render.winImg.image = this.sprites['end-win'];

    this.finalScore = new Konva.Text( this.settings.render.finalScore );

    this.layers.end
      .add( new Konva.Image({
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height,
        image: this.sprites['bg-end']
      }))
      .add( new Konva.Image( this.settings.render.loseImg1 ))
      .add( new Konva.Image( this.settings.render.loseImg2 ))
      .add( new Konva.Image( this.settings.render.winImg ))
      .add( new Konva.Text( this.settings.render.winText ))
      .add( new Konva.Text( this.settings.render.finalScoreText ))
      .add( this.finalScore )
      .add( new Konva.Image( this.settings.render.againButton ));
  }

  spritesDraw() { }

  onStart() { }

  start() {
    this.layers.start.hide();
    this.layers.end.hide();
    this.layers.sprites.destroyChildren();
    this.render({ inputWord: '', score: 0, lifes: this.settings.lifes });
  }

  pauseOn() {
    this.layers.sprites.hide();
    this.layers.pause.show();
  }

  pauseOff() {
    this.layers.pause.hide();
    this.layers.sprites.show();
  }

  end( status, score ) {
    this.finalScore.text( this.getScoreString(score) );
    this.stage.find('.win').visible( status === 'win' );
    this.stage.find('.lose').visible( status === 'lose' );

    this.layers.end.show()
      .draw();
  }

  render({ inputWord, lifes, score }) {
    this.inputText.text( inputWord );
    this.scoreText.text( this.getScoreString( score ) );

    this.stage.find('.life').forEach( (life, i) => {
      life.visible( i < lifes );
    });

    this.layers.sprites.draw();
    this.layers.panel.draw();
  }

  initPanda( panda, sprite, img ) {

    Object.assign( this.settings.render.panda, {
      image: this.sprites.panda,
      animation: panda.state
    });
    panda.sprite = new Konva.Sprite( this.settings.render.panda );
    panda.sprite.start();

    this.settings.render.wordImg.image = img;
    panda.img = new Konva.Image( this.settings.render.wordImg );

    panda.group = new Konva.Group({
      x: panda.x,
      y: panda.y,
      scaleX: panda.rotate
    }).add( panda.sprite )
      .add( panda.img );

    this.layers.sprites.add( panda.group );

  }

  renderPanda( panda ) {

    panda.group
      .x( panda.x )
      .y( panda.y );


    panda.sprite
      .setAnimation( panda.state );

    if ( panda.state === 'dead' || panda.state === 'win' )
      panda.img.hide();

    panda.group.scaleX( panda.rotate );

      panda.img
        .scaleX( panda.rotate )
        .x( panda.img.scaleX() == '1'
          ? this.settings.render.wordImg.x
          : this.settings.render.wordImg.x  + this.settings.render.wordImg.width ) ;
  }

  deletePanda( panda ) {
    panda.group.remove();
  }

  getScoreString( score ) {
    return this.settings.render.score.text.slice( 0, - score.toString().length ) + score;
  }

  playInputTween( word ) {
    this.inputTextClone.text( word );
    this.inputTextClone.opacity(1);
    this.inputTextClone.fill( this.inputText.fill() );

    let tween = new Konva.Tween({
      node: this.inputTextClone,
      duration: .5,
      fill: 'red',
      scaleX: 1.5,
      x: this.inputText.x() - this.inputText.width() * .25,
      scaleY: 1.5,
      y: this.inputText.y() - this.inputText.height() * .25,
      opacity: 0,
    });

    tween.play();
  }

  playDeadTween( panda ) {
    let tween = new Konva.Tween({
      node: panda.sprite,
      duration: .5,
      y: 100
    });

    tween.play();
  }


}