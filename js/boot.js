(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
      //this.load.image('loadBG', 'assets/loadBG.webp');      
    },

    create: function () {
      this.game.scale.scaleMode = Phaser.ScaleManager.RESIZE; 
      this.game.renderer.renderSession.roundPixels = true;
      
      this.game.state.start('preloader');
    }
  };

  window['simplewar'] = window['simplewar'] || {};
  window['simplewar'].Boot = Boot;

}());

