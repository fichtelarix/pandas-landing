let variables =  {

    folder: 'words',                                                            //folders of images with words
    lifes: 3,                                                                   //starting number of lives
    timeRate: 70,                                                               //screen refresh rate ( ms )
    panda: {
      speedX: 5,                                                                //the horizontal speed
      speedXvariation: .25,                                                     //max relative horizontal speed variation
      generationChance: .05,                                                    //chance of panda generation
      speedY: 2,                                                                //the vertical speed
      speedYup: - 20,                                                           //the speed of "rescued" panda
      speedYEnter: 30,                                                          //the speed of panda falling from the top of the screen at beginning
      minInterval: 2,                                                           //the minimum interval (number of loop iteration) between the appearance of pandas
      maxNumber: 3,                                                             //max number of pandas on screen
      limitLeft: 100,                                                           //borders of pandas trajectory
      limitRight: 700,                                                          //
      limitY: 600,                                                              //bottom border = death
      enterY: 50,                                                               //the border from above, below which the panda ceases to fall rapidly
      fearY: 520,                                                               //the border below which the "fear" animation is shown
    },
    render: {                                                                   //params for rendering. Are collected mainly in order to clean the renderer script. But you can play with them to slightly change the appearance of the game.
      canvas: {
        container: 'game-container',                                            //id of container element
        width: 800,                                                             //size of game screen
        height: 1000,
      },
      panda: {
        width: 250,                                                             //panda dimensions are used in calculations, so their changing may cause bugs.
        height: 275,
        x: -120,
        y: 0,
        scaleX: 1.2,                                                            //so better use the scales
        scaleY: 1.2,
        frameRate: 10,                                                          //speed of panda animation ( see Konva.Sprite docs )
        animations: {
          enter: [ 0, 0, 250, 275,                                              //animations frames
            250, 0, 250, 275,
            500, 0, 250, 275,
            750, 0, 250, 275],
          fly: [ 0, 0, 250, 275,
            250, 0, 250, 275,
            500, 0, 250, 275,
            750, 0, 250, 275 ],
          fear: [ 0, 275, 250, 275,
            250, 275, 250, 275,
            500, 275, 250, 275,
            750, 275, 250, 275 ],
          ouch: [ 0, 550, 250, 275,
            250, 550, 250, 275,
            500, 550, 250, 275,
            750, 550, 250, 275 ],
          dead: [ 0, 825, 250, 275,
            250, 825, 250, 275,
            500, 825, 250, 275,
            750, 825, 250, 275 ],
          rescue:  [750, 1375, 250, 275 ],
          saved:  [ 750, 1375, 250, 275 ],
          win: [ 0, 1100, 250, 275,
            250, 1100, 250, 275,
            500, 1100, 250, 275,
            750, 1100, 250, 275,
            0, 1375, 250, 275,
            250, 1375, 250, 275,
            500, 1375, 250, 275],
        }
      },
      wordImg: {
        width: 74,
        height: 65,
        x: 24,
        y: 225,
      },
      pikes: {
        x: 0,
        y: 750,
        height: 250
      },
      input: {
        y: 60,
        fontSize: 40,
        fill: '#a8dbf2',
        fontFamily: 'Lucida Console',
        align: 'center'
      },
      panel: {
        x: 0,
        y: 940
      },
      score: {
        text: '000000',
        x: 650,
        y: 20,
        width: 120,
        fontSize: 30,
        fill: 'white',
        fontFamily: 'Impact',
        align: 'right',
      },
      lifes: {
        width: 50,
        height: 50,
        offset: 30,
        space: 20,
        name: 'life'
      },
      startButton: {
        x: 270,
        y: 400,
        width: 260,
        height: 100,
        name: 'start'
      },
      pauseText: {
        x: 0,
        y: 400,
        fontSize: 30,
        fontFamily: 'Lucida Console',
        text: 'PAUSE',
        align: 'center'
      },
      finalScoreText: {
        x: 150,
        width: 300,
        y: 340,
        fill: 'white',
        fontSize: 36,
        fontFamily: 'Lucida Console',
        align: 'left',
        text: 'Your score:'
      },
      finalScore: {
        x: 450,
        width: 200,
        y: 340,
        fill: 'white',
        fontSize: 36,
        fontFamily: 'Lucida Console',
        align: 'right'
      },
      againButton: {
        x: 270,
        y: 450,
        width: 260,
        height: 100,
        name: 'start'
      },
      winText: {
        x: 0,
        y: 700,
        fontSize: 36,
        fontFamily: 'Lucida Console',
        align: 'center',
        fill: 'red',
        text: 'You saved all pandas!',
        name: 'win'
      },
      loseImg1: {
        x: 630,
        y: 150,
        name: 'lose'
      },
      loseImg2: {
        x: 420,
        y: 840,
        name: 'lose'
      },
      winImg: {
        x: 320,
        y: 0,
        name: 'win'
      },
      loading: {
        x: 200,
        y: 400,
        width: 400,
        fill: 'white',
        align: 'center',
        fontSize: 40,
        fontFamily: 'Lucida Console',
        text: 'L O A D I N G'
      },
      loadImgs:[{
        x: 250,
        y: 550,
        width: 90,
        height: 80
      }, {
        x: 345,
        y: 550,
        width: 90,
        height: 80
      }, {
        x: 440,
        y: 550,
        width: 90,
        height: 80
      }]
    }
  };