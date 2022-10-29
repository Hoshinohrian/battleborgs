(function () {
  'use strict';

  function Preloader() {
      this.asset = null;
      this.ready = false;
  }
  Preloader.prototype = {
      preload: function () {
        
          this.asset = this.add.sprite(320, 240, 'preloader');
          this.asset.anchor.setTo(0.5, 0.5);
          this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
          this.load.setPreloadSprite(this.asset);

          
          this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');

          this.load.image('player', 'assets/player.png');

          this.load.image('player_stand', 'assets/player_stand.png');
          this.load.image('player_stand', 'assets/player_slash.png');
          this.load.image('player_stand', 'assets/player_staff.png');  
          this.load.image('player_stand', 'assets/player_shoot.png');  

          for(var i = 0; i < 16; i++){
            this.load.image('item'+i, 'assets/item'+i+'.png');
          }
          

          this.load.image('refresh', 'assets/refresh.png');  

          this.load.image('opp', 'assets/opp.png');
          this.load.image('item', 'assets/item.png');
          this.load.image('bg', 'assets/bg.png');
          this.load.image('money', 'assets/money.png');
          this.load.image('detail', 'assets/detail.png');
          this.load.image('button', 'assets/1-38.png');
          this.load.image('falconHelm_icon', 'assets/HakkeHelmet_Icon.png');
          this.load.image('raidCore_icon', 'assets/HakkeCore_Icon.png')
          this.load.image('ravenCore_icon', 'assets/RavenCore_Icon.png');
          this.load.image('sparkCore_icon', 'assets/SparkCore_Icon.png');
          this.load.image('scepter_icon', 'assets/Scepter_Icon.png');


      }
      , create: function () {
          this.asset.cropEnabled = false;
      }
      , update: function () {
          if (!!this.ready) {
              this.game.state.start('menu');
          }
      }
      , onLoadComplete: function () {
          this.ready = true;
      }
  };
  window['simplewar'] = window['simplewar'] || {};
  window['simplewar'].Preloader = Preloader;
}());