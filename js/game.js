(function () {
  'use strict';

  function Game() {
      this.player = null;
  }
  Game.prototype = {
      create: function () {
  
     
  
          var x = (this.game.width / 2.25)
              , y = this.game.height / 3;
        
          this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
          
          this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);
          this.input.onDown.add(this.onDown, this);
          
          
          
      }
      , update: function () {
          

      }
      , onDown: function () {
        this.game.state.start('menu');  

      }
        
      
  };
  window['simplewar'] = window['simplewar'] || {};
  window['simplewar'].Game = Game;
}());