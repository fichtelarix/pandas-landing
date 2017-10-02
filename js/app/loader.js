class Loader {

  loadImagesList(folder, list) {
    return new Promise( (resolve, reject) => {
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

  loadAudioList(folder, list) {
    return new Promise( (resolve, reject) => {
      let tracksBuffer = {};
      let n = 0;

      list.forEach( src => {
        const key = src.split('.')[0];
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';

        xhr.onload = () => {
          tracksBuffer[ key ] = xhr.response;
          n++;
          if ( n === list.length)
            resolve(tracksBuffer);
        };

        xhr.open('GET', `${ folder }/${ src }`, true);
        xhr.send();

      });
    });
  }

  loadImg(folder, src) {
    return new Promise( (resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve( img );
      img.src = `${ folder }/${ src }`;
    });
  }

  loadFolder(folder) {
    return new Promise( (resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open('GET', `php/get-folder.php?folder=${ folder }`);
      xhr.onload = () => resolve( JSON.parse(xhr.responseText));
      xhr.send();
    });
  }



}