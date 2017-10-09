export class Loader {                                                           //module of loading functions

  loadImagesList( folder, list ) {                                              //used for loading sprites
    return new Promise( (resolve, reject) => {                                  //resolved promise returns object with images, where key is img filename without the extension
      let n = 0;
      let images = {};

      list.forEach( src => {
        const key = src.split('.')[0];

        images[ key ] = new Image();
        images[ key ].onload = () => {
          n++;
          if ( n === list.length )
            resolve( images );
        };

        images[ key ].src = `${ folder }/${ src }`;
      });
    });
  }

  loadAudioList( folder, list ) {
    return new Promise( (resolve, reject) => {                                  //same principle as for images
      let tracks = {};
      let n = 0;

      list.forEach( src => {
        const key = src.split('.')[0];
        let track = new Audio();

        track.oncanplaythrough = () => {
          tracks[ key ] = track;
          n++;
          if ( n === list.length)
            resolve(tracks);
        };

        track.src = `${folder}/${src}`;

      });
    });
  }

  loadImg( folder, src ) {                                                        //at the beginning of the game we don't need to load images for all word at once
    return new Promise( (resolve, reject) => {                                  //this function loads the selected image by generation of new panda
      const img = new Image();

      img.onload = () => resolve( img );
      img.src = `${ folder }/${ src }`;
    });
  }

  loadFolder( folder ) {                                                          //returns just list of files in folder
    return new Promise( (resolve, reject) => {                                  //so we can easily add images to a folder without the need to edit the code.
      const xhr = new XMLHttpRequest();

      xhr.open('GET', `php/get-folder.php?folder=${ folder }`);
      xhr.onload = () => resolve( JSON.parse(xhr.responseText));
      xhr.send();
    });
  }



}