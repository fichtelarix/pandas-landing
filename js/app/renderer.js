class Renderer {

  constructor( settings ) {
    this.settings = settings;
    this.sprites = [];
  }


  init() {
    const contElem = document.getElementById( this.settings.render.canvas.container );
    const scale = contElem.clientWidth / this.settings.render.canvas.width;
    const realWidth = contElem.clientWidth;
    const realHeight = this.settings.render.canvas.height * scale;

    this.stage = new Konva.Stage({
      container: contElem,
      width: realWidth,
      height: realHeight,
      scale: { x: scale, y: scale }
    });

    this.layers = {};

    [ 'background', 'sprites', 'panel', 'pause', 'end', 'start' ].forEach( (layer) => {
      this.layers[layer] = new Konva.Layer();
      this.stage.add( this.layers[layer] );
      this[ `${layer}Draw` ]();
    });

    this.stage.find('.start').on('click', () => this.onStart() );
  }

  backgroundDraw() {
    Object.assign( this.settings.render.pikes, {
      image: this.sprites.pikes,
      width: this.settings.render.canvas.width,
    });

    this.layers.background.add(
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

    this.layers.panel
      .add( this.inputText )
      .add( this.panel );
  }

  startDraw() {
    this.settings.render.startButton.image = this.sprites.start;

    this.layers.start
      .add( new Konva.Rect({
        x: 0,
        y: 0,
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height,
        fill: 'white'
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
    this.finalScore = new Konva.Text( this.settings.render.finalScore );

    this.layers.end
      .add( new Konva.Rect({
        width: this.settings.render.canvas.width,
        height: this.settings.render.canvas.height,
        fill: 'white'
      }))
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
      x: - this.settings.render.panda.width / 2,
      animation: panda.state,
      frameRate: 1000 / this.settings.timeRate
    });
    panda.sprite = new Konva.Sprite( this.settings.render.panda );
    panda.sprite.start();

    this.settings.render.wordImg.image = img;
    panda.img = new Konva.Image( this.settings.render.wordImg );

    panda.group = new Konva.Group({
      scaleX: panda.rotate,
      x: panda.x,
      y: panda.y
    }).add( panda.sprite )
      .add( panda.img );

    this.layers.sprites.add( panda.group );
  }

  renderPanda( panda ) {

    panda.group
      .x( panda.x )
      .y( panda.y );


    panda.sprite.setAnimation( panda.state );

    if ( panda.state === 'dead' || panda.state === 'win' )
      panda.img.hide();

    panda.group.scaleX( panda.rotate );
  }

  deletePanda( panda ) {
    panda.group.remove();
  }

  getScoreString( score ) {
    return this.settings.render.score.text.slice( 0, - score.toString().length ) + score;
  }


}