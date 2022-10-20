window.onload = function () {
  'use strict';

  var game
    , ns = window['simplewar'];

    var config = {
      width: 960,
      height: 540,
      renderer: Phaser.WEBGL,
      transparent: false,
      enableDebug: true,
      resolution: 1,
      pixelArt: true,
      antialias: true,
      autoFocus: true
    };   
    game = new Phaser.Game(config);
  
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('menu', ns.Menu); 
    game.state.add('game', ns.Game);
    game.state.start('boot');

    //game.forceSingleUpdate = true;
    //game.time.desiredFps = this.game.time.fps || 60;
    //console.log(game)
};
