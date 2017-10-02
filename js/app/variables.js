let variables =  {

    lifes: 3,
    timeRate: 70,
    panda: {
      speedX: 5,
      speedY: 2,
      speedYup: - 20,
      speedYEnter: 30,
      minInterval: 2,
      maxNumber: 3,
      limitLeft: 100,
      limitRight: 700,
      limitY: 600,
      fearY: 400,
    },
    render: {
      canvas: {
        container: 'game-container',
        width: 800,
        height: 800,
      },
      panda: {
        width: 150,
        height: 200,
        animations: {
          enter: [ 2201, 0, 200, 250],
          begin: [ 2401, 0, 200, 250,
            2601, 0, 200, 250,
            2801, 0, 200, 250],
          fly: [ 0, 0, 200, 250,
            201, 0, 200, 250,
            401, 0, 200, 250],
          fear: [ 3001, 0, 200, 250,
            3201, 0, 200, 250,
            3401, 0, 200, 250],
          ouch: [3601, 0, 200, 250,
            3801, 0, 200, 250,
            4000, 0, 200, 250,
            4201, 0, 200, 250,
            4401, 0, 200, 250,
            4601, 0, 200, 250,
          ],
          dead: [ 601, 0, 200, 250,
            801, 0, 200, 250 ],
          rescue:  [ 0, 0, 200, 250,
            201, 0, 200, 250,
            401, 0, 200, 250],
          saved:  [ 0, 0, 200, 250,
            201, 0, 200, 250,
            401, 0, 200, 250],
          win: [ 1001, 0, 200, 250,
            1201, 0, 200, 250,
            1401, 0, 200, 250,
            1601, 0, 200, 250,
            1801, 0, 200, 250,
            2001, 0, 200, 250 ]
        }
      },
      wordImg: {
        width: 75,
        height: 75,
        x: - 120,
        y: 160,
      },
      pikes: {
        x: 0,
        y: 600,
        height: 80
      },
      input: {
        y: 30,
        fontSize: 30,
        fill: 'black',
        fontFamily: 'Lucida Console',
        align: 'center'
      },
      panel: {
        x: 0,
        y: 700
      },
      score: {
        text: '000000',
        x: 700,
        width: 100,
        fontSize: 20,
        fontFamily: 'Impact',
        align: 'right',
      },
      lifes: {
        width: 40,
        height: 35,
        offset: 30,
        space: 10,
        name: 'life'
      },
      startButton: {
        x: 360,
        y: 300,
        width: 80,
        height: 30,
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
        x: 200,
        width: 200,
        y: 300,
        fontSize: 30,
        fontFamily: 'Lucida Console',
        align: 'left',
        text: 'Your score:'
      },
      finalScore: {
        x: 400,
        width: 200,
        y: 300,
        fontSize: 30,
        fontFamily: 'Lucida Console',
        align: 'right'
      },
      againButton: {
        x: 360,
        y: 300,
        width: 80,
        height: 30,
        name: 'start'
      },
      winText: {
        x: 0,
        y: 200,
        fontSize: 36,
        fontFamily: 'Lucida Console',
        align: 'center',
        fill: 'red',
        text: 'You saved all pandas!',
        name: 'win'
      }

    }
  };