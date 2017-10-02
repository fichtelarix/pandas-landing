class AudioPlayer {
  constructor() {
    this.context = new  window.AudioContext();
    this.destination = this.context.destination;
    this.tracks = {};
    this.currectPlay = [];
  }

  decodeAll( tracksBuffer ) {
    return new Promise( (resolve, reject ) => {
      let n = 0;
      const length = Object.keys( tracksBuffer ).length;

      for ( let key in tracksBuffer ) {
        this.context.decodeAudioData( tracksBuffer[key], decoded => {
          this.tracks[key] = decoded;

          n++;
          if ( n === length )
            resolve();
        });
      }});
  }


  playTrack( name, loop = false ) {

    if ( this.currectPlay[name] ) {
      this.currectPlay[name].disconnect();
      this.currectPlay[name] = false;
    }

    this.currectPlay[name] = this.context.createBufferSource();
    this.currectPlay[name].buffer = this.tracks[ name ];
    this.currectPlay[name].loop = loop;
    this.currectPlay[name].connect( this.destination );
    this.currectPlay[name].start(0);

  }

  stop( name ) {
    this.currectPlay[name].disconnect();
  }

  continue( name ) {
    this.currectPlay[name].connect( this.destination );
  }

}