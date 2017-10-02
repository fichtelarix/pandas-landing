class Panda {
  constructor ( word, settings, x, speedX ) {
    this.word = word;
    this.settings = settings;
    this.setState('enter');
    this.ownSpeedX = speedX;
    this.x = x;
    this.y = - this.settings.render.panda.height;
    this.rotate = Math.sign( speedX );
  }

  setState( state ) {
    this.state = state;
    switch ( state ) {

      case 'win':
      case 'dead':
      case 'begin':
      case 'ouch':
        this.speedX = 0;
        this.speedY = 0;
        break;

      case 'fly':
      case 'fear':
        this.speedX = this.ownSpeedX;
        this.speedY = this.settings.panda.speedY;
          break;

      case 'enter':
        this.speedX = 0;
        this.speedY = this.settings.panda.speedYEnter;
        break;

      case 'rescue':
        this.speedX = 0;
        this.speedY = this.settings.panda.speedYup;
    }
  }

  action() {

    if (this.state !== 'dead') {
      this.calculatePosition();
      this.nextState();
    }
  }

  calculatePosition() {
    if ( this.x < this.settings.panda.limitLeft || this.x > this.settings.panda.limitRight )
      this.rotate = - this.rotate;

    this.y += this.speedY;
    this.x += this.speedX * this.rotate;
  }

  nextState() {
    if (this.state === 'enter' && this.y > 0)
      this.setState('begin');

    if ( this.state === 'begin' &&  this.sprite.frameIndex() === 2 )
      this.setState('fly');

    if (this.state === 'win' && this.sprite.frameIndex() === 5)
      this.setState('rescue');

    if(this.y < - 250 && this.state === 'rescue')
      this.setState('saved');

    if ( this.state === 'fly' && this.y > this.settings.panda.fearY - this.settings.render.panda.height )
      this.setState('fear');

    if ( this.state === 'fear' && this.y > this.settings.render.pikes.y - this.settings.render.panda.height )
      this.setState('ouch');

    if (this.state === 'ouch' && this.sprite.frameIndex() === 5)
      this.setState('dead');
  }

}