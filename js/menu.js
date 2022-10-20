(function() {
    'use strict';
  
    function Menu() {
      this.titleTxt = null;
      this.startTxt = null;
    }
  
    Menu.prototype = {
  
      create: function () {
        var x = this.game.width / 2
          , y = this.game.height / 2;
  
  
        this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Example Game',16);
        this.titleTxt.anchor.setTo(0.5, 0.5);
  
        y = y + this.titleTxt.height + 5;
        this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'Click to Start',16);
        this.startTxt.anchor.setTo(0.5, 0.5);
  
        this.input.onDown.add(this.onDown, this);
      },
  
      update: function () {

        this.titleTxt.x = this.game.width / 2
        this.titleTxt.y = this.game.height / 2

        this.startTxt.x = this.game.width / 2
        this.startTxt.y = this.game.height / 2 + this.titleTxt.height + 5;
        
      },
  
      onDown: function () {
        
      this.game.state.start('game');
    
          
      }
    };
  
    window['simplewar'] = window['simplewar'] || {};
    window['simplewar'].Menu = Menu;
  
  }());
  