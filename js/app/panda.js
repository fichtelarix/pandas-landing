export class Panda {
  constructor ( word, settings, x, speedX ) {
    this.word = word;
    this.settings = settings;
    this.setState('enter');
    this.ownSpeedX = speedX;                                                    //keep the speed that we generated for the panda
    this.x = x;
    this.y = - this.settings.render.panda.height;
    this.rotate = Math.sign( speedX );                                          //determine the direction of the panda, depending on the sign of horizontal speed
  }

  setState( state ) {
    this.state = state;
    switch ( state ) {

      case 'win':                                                               //when the entered word is correct and the animation is played
      case 'ouch':                                                              //the animation when the panda "dies" is played
      case 'dead':
        this.speedX = 0;
        this.speedY = 0;
        break;

      case 'fly':                                                               //the panda descends, moving in a zigzag
        this.speedX = this.ownSpeedX * - this.rotate;
        this.speedY = this.settings.panda.speedY;
        break;

      case 'enter':                                                             //when in the beginning the panda quickly descends from above
        this.speedX = 0;
        this.speedY = this.settings.panda.speedYEnter;
        break;

      case 'rescue':                                                            //when the rescued panda flies up
        this.speedX = 0;
        this.speedY = this.settings.panda.speedYup;
    }
  }

  action() {

    if (this.state !== 'dead') {                                                //we define a new position
      this.calculatePosition();                                                 //and from it, as well as from the animation state, determine the state of the panda
      this.nextState();
    }
  }

  calculatePosition() {
    if ( this.speedX !== 0 &&
      ( this.x < this.settings.panda.limitLeft || this.x > this.settings.panda.limitRight ) )
      this.rotate = - this.rotate;                                              //turn the panda in the opposite direction when it reaches the border

    this.y += this.speedY;
    this.x += this.speedX * this.rotate;
  }

  nextState() {
    if (this.state === 'enter' && this.y > this.settings.panda.enterY )
      this.setState('fly');

    if (this.state === 'win' && this.sprite.frameIndex() === 6)                 //when the animation is over
      this.setState('rescue');

    if(this.y < - this.settings.render.panda.height && this.state === 'rescue')
      this.setState('saved');

    if ( this.state === 'fly' && this.y > this.settings.panda.fearY )
      this.setState('fear');

    if ( this.state === 'fear' && this.y > this.settings.panda.limitY )
      this.setState('ouch');

    if (this.state === 'ouch' && this.sprite.frameIndex() === 3)                //when the animation is over
      this.setState('dead');
  }

}