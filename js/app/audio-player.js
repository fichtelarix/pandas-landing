export class AudioPlayer {                                                      //game sound mode
  constructor() {

    this.channels = {
      bg: document.getElementById('bg-audio'),                                  //it uses two HTMLAudio elements,
      effects: document.getElementById('effects-audio')                         //the one for playing background music
    };                                                                          //and the one for sound effects ( sound of 'rescue' and 'dying')
    this.tracks = {};
    this.currectPlay = [];
  }

  playTrack( name, channel, loop = false ) {                                    //playing a track. 'Name' is the name of audio file without extension, 'channel' - see above, loop is used for background music
    this.channels[channel].src = this.tracks[name].src;                         //

    this.channels[channel].onloadedmetadata = () => {
      this.channels[channel].currentTime = 0;
      this.channels[channel].play();
      this.channels[channel].loop = loop;
    };


  }

  stop( channel ) {
    this.channels[channel].pause();
  }

  continue( channel ) {
    this.channels[channel].play();                                              //used for background music when returning from a pause
  }


}