(function () {
  'use strict';

  function Game() {
      this.player = null;
  }
  Game.prototype = {
      create: function () {
  
     
  
          var x = (this.game.width / 2);
          var y = this.game.height /2;
        
          this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
          
          this.game.plugins.screenShake = this.game.plugins.add(Phaser.Plugin.ScreenShake);
          //this.input.onDown.add(this.onDown, this);
          
          this.game.stage.backgroundColor = "#160c2c";
          this.map = this.add.sprite(x, y, 'bg');
          this.map.anchor.setTo(0.5, 0.5);

          this.moneyValue = 10
          this.moneyValueHolder = this.moneyValue
          this.moneyUI = this.add.sprite(25, 25, 'money');
          this.moneyUI.anchor.setTo(0.5, 0.5);  
          var style = { font: '16pt Muli', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 290 };
          this.moneyUIText = this.add.text(this.moneyUI.x+35, this.moneyUI.y, this.moneyValue, style);    
          this.moneyUIText.anchor.setTo(0.5, 0.5);     

          this.itemMouseOver = false
          var style = { font: '16pt Muli', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 200 };
          this.itemDesc = this.add.text(this.game.width+225, this.map.y, "TEST", style);    
          //this.moneyUIText.anchor.setTo(0.5, 0.5);            

          this.item = []
          var dist = -100;
          for(var i = 0; i < 3; i++){
            this.item[i] = this.add.sprite(x+dist, this.game.height+ 50, 'item');
            this.item[i].anchor.setTo(0.5, 0.5);
            this.item[i].itemType = Math.floor(Math.random() * 4);
            this.item[i].itemVal = Math.floor(Math.random() * 7);
            this.item[i].itemCost = 1//item[ this.item[i].itemVal].cost
            this.item[i].bought = false
            //on click
            this.item[i].inputEnabled = true;
            this.item[i].events.onInputDown.add(this.onClick, this);
            //on hover
            this.item[i].events.onInputOver.add(this.showInfo, this);                 
            dist += 100;
          }
         
          this.player = this.add.sprite(this.map.x, this.map.y-25, 'player');
          this.player.anchor.setTo(0.5, 0.5);       
          this.player.item = []
          this.player.item[0] = 0
          this.player.item[1] = 0
          this.player.item[2] = 0
          this.player.item[3] = 0

          
          this.phase = 0;
        
          
      }
      , update: function () {

        this.moneyUIText.text = this.moneyValueHolder
        if(this.moneyValueHolder > this.moneyValue){
          this.moneyValueHolder--;
        }
        else if(this.moneyValueHolder < this.moneyValue){
          this.moneyValueHolder++
        }

        if(!this.itemMouseOver){
          this.itemDesc.x += (this.game.width-225 - this.itemDesc.x) * 0.5;  
        }
        else{
          this.itemDesc.x += (this.game.width+225 - this.itemDesc.x) * 0.5;  
        }
        this.itemMouseOver = false

        for(var i = 0; i < 3; i++){
          if(this.phase == 0 && !this.item[i].bought){
            this.item[i].y += (this.game.height- 50 - this.item[i].y) * 0.5;
          }
          else{
            this.item[i].y += (this.game.height+50 - this.item[i].y) * 0.5;
          }
        }          
        

      }
      , onDown: function () {
        this.game.state.start('menu');  

      }
      , showInfo: function (unit) {
        console.log("test")
        this.itemDesc.text = unit.itemVal
        //this.itemMouseOver = true;
        //this.game.state.start('menu');  

      }        
      , onClick: function (unit) {
        if(this.moneyValue>= unit.itemCost && !unit.bought){
          unit.bought = true;
          this.moneyValue -= unit.itemCost
          this.player.item[unit.itemType] = unit.itemVal
        }

      }
          
        
      
  };
  window['simplewar'] = window['simplewar'] || {};
  window['simplewar'].Game = Game;
}());