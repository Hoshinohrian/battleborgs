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

          this.itemSelected = false
          style = { font: '12pt Muli', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 300 };
          this.itemDesc = this.add.text(this.game.width+225, this.map.y-150, "", style);    
          //this.moneyUIText.anchor.setTo(0.5, 0.5);            

          style = { font: '12pt Muli', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 300 };
          this.playerStats = this.add.text(24, this.map.y-150, "", style);            

          this.buyButton = this.add.sprite(this.game.width-135, this.game.height+100, 'button');
          var scale = 0.50
          this.buyButton.width = this.buyButton.width*scale
          this.buyButton.height = this.buyButton.height*scale
          this.buyButton.anchor.setTo(0.5, 0.5);       
          this.buyButton.inputEnabled = true;
          this.buyButton.events.onInputDown.add(this.purchase, this);       
          style = { font: '14pt Muli', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 300 };
          this.buyButtonText = this.add.text(this.buyButton.x, this.buyButton.y, "", style);     
          this.buyButtonText.anchor.setTo(0.5, 0.5);            

          this.fightButton = this.add.sprite(135, this.game.height-50, 'button');
          var scale = 0.50
          this.fightButton.width = this.fightButton.width*scale
          this.fightButton.height = this.fightButton.height*scale
          this.fightButton.anchor.setTo(0.5, 0.5);       
          this.fightButton.inputEnabled = true;
          this.fightButton.events.onInputDown.add(this.fight, this);                  

          style = { font: '14pt Muli', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 300 };
          this.fightButtonText = this.add.text(this.fightButton.x, this.fightButton.y, "", style);     
          this.fightButtonText.anchor.setTo(0.5, 0.5);         

          this.item = []
          var dist = -100;
          for(var i = 0; i < 3; i++){
            this.item[i] = this.add.sprite(x+dist, this.game.height+ 50, 'item');
            this.item[i].anchor.setTo(0.5, 0.5);
            //this.item[i].itemType = Math.floor(Math.random() * 4);
            this.item[i].itemVal = Math.floor(Math.random() * 16);
            this.item[i].itemCost = item[ this.item[i].itemVal].price
            this.item[i].bought = false
            //on click
            this.item[i].inputEnabled = true;
            this.item[i].events.onInputDown.add(this.onClick, this);               
            dist += 100;
          }

          this.unitSelected = null;
          
          this.player = this.add.sprite(this.map.x, this.map.y-15, 'player');
          this.playerDamage = 0;
          this.player.anchor.setTo(0.5, 0.5);       
          this.player.item = []
          this.player.item[0] = new Object();
          this.player.item[0].priority = 0;
          this.player.item[0].armor = 0;
          this.player.item[0].damage = 0;
          this.player.item[0].health = 0;
          this.player.item[0].itemVal = 0;

          this.player.item[1] = new Object();
          this.player.item[1].priority = 0;
          this.player.item[1].armor = 0;
          this.player.item[1].damage = 0;
          this.player.item[1].health = 0;
          this.player.item[1].itemVal = 0;

          this.player.item[2] = new Object();
          this.player.item[2].priority = 0;
          this.player.item[2].armor = 0;
          this.player.item[2].damage = 0;
          this.player.item[2].health = 0;
          this.player.item[2].itemVal = 0;

          this.player.item[3] = new Object();
          this.player.item[3].priority = 0;
          this.player.item[3].armor = 0;
          this.player.item[3].damage = 0;
          this.player.item[3].health = 0;
          this.player.item[3].itemVal = 0;

          this.opp = this.add.sprite(this.map.x+45, this.map.y-15, 'player');
          this.opp.anchor.setTo(0.5, 0.5);        
          this.opp.alpha = 0;  
          this.oppDamage = 0;
          this.opp.item = []    
          for(var i = 0; i < 4; i++){
            this.opp.item[i] = new Object();
            //helm
            if(i == 0){
              this.opp.itemPiece = Math.floor(Math.random() * 4);
              switch(this.opp.itemPiece){
                case 0:
                  this.opp.item[i].itemVal = 1;
                  break;
                case 1:
                  this.opp.item[i].itemVal = 5;
                  break;
                case 2:
                  this.opp.item[i].itemVal = 9;
                  break;
                case 3:
                  this.opp.item[i].itemVal = 13;
                  break;                
              }
              this.opp.item[i].priority = item[this.opp.item[i].itemVal].priority;
              this.opp.item[i].armor = item[this.opp.item[i].itemVal].armor;
              this.opp.item[i].damage = item[this.opp.item[i].itemVal].damage;
              this.opp.item[i].health = item[this.opp.item[i].itemVal].health;  
            }
            //wep
            if(i == 2){
              this.opp.itemPiece = Math.floor(Math.random() * 4);
              switch(this.opp.itemPiece){
                case 0:
                  this.opp.item[i].itemVal = 0;
                  break;
                case 1:
                  this.opp.item[i].itemVal = 4;
                  break;
                case 2:
                  this.opp.item[i].itemVal = 8;
                  break;
                case 3:
                  this.opp.item[i].itemVal = 12;
                  break;                
              }
              this.opp.item[i].priority = item[this.opp.item[i].itemVal].priority;
              this.opp.item[i].armor = item[this.opp.item[i].itemVal].armor;
              this.opp.item[i].damage = item[this.opp.item[i].itemVal].damage;
              this.opp.item[i].health = item[this.opp.item[i].itemVal].health;  
            }   
            //shield    
            if(i == 1){
              this.opp.itemPiece = Math.floor(Math.random() * 4);
              switch(this.opp.itemPiece){
                case 0:
                  this.opp.item[i].itemVal = 2;
                  break;
                case 1:
                  this.opp.item[i].itemVal = 6;
                  break;
                case 2:
                  this.opp.item[i].itemVal = 10;
                  break;
                case 3:
                  this.opp.item[i].itemVal = 14;
                  break;                
              }
              this.opp.item[i].priority = item[this.opp.item[i].itemVal].priority;
              this.opp.item[i].armor = item[this.opp.item[i].itemVal].armor;
              this.opp.item[i].damage = item[this.opp.item[i].itemVal].damage;
              this.opp.item[i].health = item[this.opp.item[i].itemVal].health;  
            }    
            //core   
            if(i == 3){
              this.opp.itemPiece = Math.floor(Math.random() * 4);
              switch(this.opp.itemPiece){
                case 0:
                  this.opp.item[i].itemVal = 4;
                  break;
                case 1:
                  this.opp.item[i].itemVal = 8;
                  break;
                case 2:
                  this.opp.item[i].itemVal = 12;
                  break;
                case 3:
                  this.opp.item[i].itemVal = 15;
                  break;                
              }
              this.opp.item[i].priority = item[this.opp.item[i].itemVal].priority;
              this.opp.item[i].armor = item[this.opp.item[i].itemVal].armor;
              this.opp.item[i].damage = item[this.opp.item[i].itemVal].damage;
              this.opp.item[i].health = item[this.opp.item[i].itemVal].health;  
            }                           
             
          }
          
          this.phase = 0;
          this.attackTimer = 0;
          this.turnOrder = -1
          
      }
      , update: function () {
        
        if(this.phase == 0){
          this.opp.alpha += (0 - this.opp.alpha) * 0.5;  
          this.moneyUIText.text = this.moneyValueHolder
          //this.fightButtonText.text = "FIGHT"
          if(this.moneyValueHolder > this.moneyValue){
            this.moneyValueHolder--;
          }
          else if(this.moneyValueHolder < this.moneyValue){
            this.moneyValueHolder++
          }
          this.moneyUI.y += (25 - this.moneyUI.y ) * 0.5;  
          this.moneyUIText.y += (this.moneyUI.y - this.moneyUIText.y) * 0.5;  

          this.player.x += (this.map.x - this.player.x) * 0.5;   

          this.fightButton.y += (this.game.height-50 - this.fightButton.y) * 0.5;  

          this.buyButtonText.y = this.buyButton.y
          if(this.itemSelected){
            this.itemDesc.x += (this.game.width-250 - this.itemDesc.x) * 0.5;  
            this.buyButton.y += (this.game.height-50 - this.buyButton.y) * 0.5;  
            
            
          }
          else{
            this.itemDesc.x += (this.game.width+225 - this.itemDesc.x) * 0.5;  
            this.buyButton.y += (this.game.height+200 - this.buyButton.y) * 0.5;  
            
            
          }
          

          for(var i = 0; i < 3; i++){
            if(this.phase == 0 && !this.item[i].bought){
              this.item[i].y += (this.game.height- 50 - this.item[i].y) * 0.5;
            }
            else{
              this.item[i].y += (this.game.height+50 - this.item[i].y) * 0.5;
            }
          }          
          
          this.fightButtonText.text = "FIGHT"

          //character details
          var priority = this.player.item[0].priority+this.player.item[1].priority+this.player.item[2].priority+this.player.item[3].priority
          var armor = this.player.item[0].armor+this.player.item[1].armor+this.player.item[2].armor+this.player.item[3].armor
          var damage = this.player.item[0].damage+this.player.item[1].damage+this.player.item[2].damage+this.player.item[3].damage
          var health = this.player.item[0].health+this.player.item[1].health+this.player.item[2].health+this.player.item[3].health

          if(this.unitSelected === null){
            this.fightButtonText.text = "FIGHT"
            this.buyButtonText.text = "PURCHASE"
            this.playerStats.text = "\n--------------------------------\n******* PLAYER STATS *******\n--------------------------------\n"+"PRI: "+priority+"\n"+"ARM: "+armor+"\n"+"DMG: "+damage+"\n"+"HP: "+health+""        

          }
          else{
            var priorityCompare = this.compare(0,item[this.unitSelected.itemVal].partType) - priority
            var armorCompare = this.compare(1,item[this.unitSelected.itemVal].partType) - armor
            var damageCompare = this.compare(2,item[this.unitSelected.itemVal].partType) - damage
            var healthCompare = this.compare(3,item[this.unitSelected.itemVal].partType) - health

            if(priorityCompare < 0){
              priorityCompare = 0
            }  
            if(armorCompare < 0){
              armorCompare = 0
            }  
            if(damageCompare < 0){
              damageCompare = 0
            }  
            if(healthCompare < 0){
              healthCompare = 0
            }  
            this.fightButtonText.text = "FIGHT"
            this.buyButtonText.text = "PURCHASE"
            this.playerStats.text = "\n--------------------------------\n******* PLAYER STATS *******\n--------------------------------\n"+"PRI: "+priority+" (+"+priorityCompare+")\n"+"ARM: "+armor+" (+"+armorCompare+")\n"+"DMG: "+damage+" (+"+damageCompare+")\n"+"HP: "+health+" (+"+healthCompare+")"        

          }
        }
        else{
          console.log(this.attackTimer)
          if(this.turnOrder == 1){
            this.player.x += (this.map.x - this.player.x) * 0.5; 
            this.opp.x += (this.map.x+45 - this.opp.x) * 0.5;   
          }
          else if(this.turnOrder == 2){
            this.player.x += (this.map.x-45 - this.player.x) * 0.5; 
            this.opp.x += (this.map.x - this.opp.x) * 0.5;  
          }
          else{
            this.player.x += (this.map.x-45 - this.player.x) * 0.5; 
            this.opp.x += (this.map.x+45 - this.opp.x) * 0.5; 
          }

          this.opp.alpha += (1 - this.opp.alpha) * 0.1;  

          this.buyButtonText.y = this.buyButton.y
          
          this.buyButton.y += (this.game.height+200 - this.buyButton.y) * 0.5;  

          this.fightButtonText.y += (this.game.height+200 - this.fightButtonText.y) * 0.5;  
          this.fightButton.y += (this.game.height+200 - this.fightButton.y) * 0.5; 
          var playerpriority = this.player.item[0].priority+this.player.item[1].priority+this.player.item[2].priority+this.player.item[3].priority
          var playerarmor = this.player.item[0].armor+this.player.item[1].armor+this.player.item[2].armor+this.player.item[3].armor
          var playerdamage = this.player.item[0].damage+this.player.item[1].damage+this.player.item[2].damage+this.player.item[3].damage
          var playerhealth = this.player.item[0].health+this.player.item[1].health+this.player.item[2].health+this.player.item[3].health-this.playerDamage
          this.playerStats.text = "\n--------------------------------\n******* PLAYER STATS *******\n--------------------------------\n"+"PRI: "+playerpriority+"\n"+"ARM: "+playerarmor+"\n"+"DMG: "+playerdamage+"\n"+"HP: "+playerhealth+""        

          //this.playerStats.x += (-250 - this.playerStats.x) * 0.5;  
          this.itemDesc.x += (this.game.width-250 - this.itemDesc.x) * 0.5;  
          var opppriority = this.opp.item[0].priority+this.opp.item[1].priority+this.opp.item[2].priority+this.opp.item[3].priority
          var opparmor = this.opp.item[0].armor+this.opp.item[1].armor+this.opp.item[2].armor+this.opp.item[3].armor
          var oppdamage = this.opp.item[0].damage+this.opp.item[1].damage+this.opp.item[2].damage+this.opp.item[3].damage
          var opphealth = this.opp.item[0].health+this.opp.item[1].health+this.opp.item[2].health+this.opp.item[3].health-this.oppDamage
          

          this.itemDesc.text = "\n--------------------------------\n******* ENEMY STATS *******\n--------------------------------\n"+"PRI: "+opppriority+"\n"+"ARM: "+opparmor+"\n"+"DMG: "+oppdamage+"\n"+"HP: "+opphealth+""             
          

          this.moneyUI.y += (-200 - this.moneyUI.y ) * 0.5;  
          this.moneyUIText.y += (-200 - this.moneyUIText.y) * 0.5;  

          for(var i = 0; i < 3; i++){
            this.item[i].y += (this.game.height+50 - this.item[i].y) * 0.5;
          }    

          if(this.attackTimer < 50){
            this.attackTimer++;

          }
          else{
            if(this.turnOrder < 0){
              if(playerpriority>= opppriority){
                this.turnOrder = 1;
              }
              else{
                this.turnOrder = 2;
              }
            }
            else{
              this.attackTimer = 0;
              if(this.turnOrder == 1){
                var hurt = (oppdamage-playerarmor)
                if(hurt < 0){
                  hurt = 0
                }                
                this.playerDamage += hurt;
                this.turnOrder =2
              }
              else{
                var hurt = (playerdamage-opparmor)
                if(hurt < 0){
                  hurt = 0
                }
                this.oppDamage += hurt;
                this.turnOrder = 1
              }
            }

            //end fight
            var playerhealth = this.player.item[0].health+this.player.item[1].health+this.player.item[2].health+this.player.item[3].health-this.playerDamage
            var opphealth = this.opp.item[0].health+this.opp.item[1].health+this.opp.item[2].health+this.opp.item[3].health-this.oppDamage
            if(playerhealth <= 0 || opphealth <= 0){
              this.phase = 0;
              this.attackTimer = 0;
              this.turnOrder = -1;
            }
          }
        }


      }
      , onDown: function () {
        this.game.state.start('menu');  

      }  
      , fight: function () {
        this.phase = 1
        this.unitSelected = null;
        //this.game.state.start('menu');  

      }        
      , compare: function (stat, partType) {
        var compareVal = 0;
        switch(stat){
          case 0:
            var compareVal = 0;
            for(var i = 0; i < 3; i++){
              if(i != partType){
                
                compareVal += this.player.item[i].priority
              }
              else{
                compareVal += item[this.unitSelected.itemVal].priority
              }
              console.log(compareVal+" "+item[this.unitSelected.itemVal].priority)
            }            
            break;
          case 1:
            for(var i = 0; i < 3; i++){
              if(i != partType){
                
                compareVal+=this.player.item[i].armor
                
              }
              else{
                compareVal+=item[this.unitSelected.itemVal].armor
              }
              
            }            
            break;   
          case 2:
            for(var i = 0; i < 3; i++){
              if(i != partType){
                compareVal+=this.player.item[i].damage
              }
              else{
                compareVal+=item[this.unitSelected.itemVal].damage
              }
              
            }            
            break;
          case 3:
            for(var i = 0; i < 3; i++){
              if(i != partType){
                compareVal+=this.player.item[i].health
              }
              else{
                compareVal+=item[this.unitSelected.itemVal].health
              }
              
            }            
            break;                      
        }

        return compareVal;
      }           
      , purchase: function () {
        if(this.moneyValue>= this.unitSelected.itemCost && !this.unitSelected.bought){
          this.unitSelected.bought = true;
          this.moneyValue -= this.unitSelected.itemCost
          console.log(this.player.item)
          this.player.item[item[this.unitSelected.itemVal].partType].itemVal = this.unitSelected.itemVal
          this.player.item[item[this.unitSelected.itemVal].partType].priority = item[this.unitSelected.itemVal].priority
          this.player.item[item[this.unitSelected.itemVal].partType].armor = item[this.unitSelected.itemVal].armor
          this.player.item[item[this.unitSelected.itemVal].partType].damage = item[this.unitSelected.itemVal].damage
          this.player.item[item[this.unitSelected.itemVal].partType].health = item[this.unitSelected.itemVal].health     

          var priority = this.player.item[0].priority+this.player.item[1].priority+this.player.item[2].priority+this.player.item[3].priority
          var armor = this.player.item[0].armor+this.player.item[1].armor+this.player.item[2].armor+this.player.item[3].armor
          var damage = this.player.item[0].damage+this.player.item[1].damage+this.player.item[2].damage+this.player.item[3].damage
          var health = this.player.item[0].health+this.player.item[1].health+this.player.item[2].health+this.player.item[3].health
  
          var priorityCompare = this.compare(0,item[this.unitSelected.itemVal].partType) - priority
          var armorCompare = this.compare(1,item[this.unitSelected.itemVal].partType) - armor
          var damageCompare = this.compare(2,item[this.unitSelected.itemVal].partType) - damage
          var healthCompare = this.compare(3,item[this.unitSelected.itemVal].partType) - health

     
        }

      }       
      , onClick: function (unit) {
        
        this.unitSelected = unit;
        this.itemSelected = true;
        this.itemDesc.text = "\n--------------------------------\n******* PART DETAILS *******\n--------------------------------\n"+"NAME: "+item[unit.itemVal].name+"\n"+"BRAND: "+item[unit.itemVal].brand+"\n"+"PRICE: "+item[unit.itemVal].price+"\n--------------------------------\n*********** STATS ***********\n--------------------------------\n"+"PRI: +"+item[unit.itemVal].priority+"                        "+"ARM: +"+item[unit.itemVal].armor+"\n"+"DMG: +"+item[unit.itemVal].damage+"                     "+"HP: +"+item[unit.itemVal].health
        
        var priorityCompare = this.compare(0,item[this.unitSelected.itemVal].partType) - priority
        var armorCompare = this.compare(1,item[this.unitSelected.itemVal].partType) - armor
        var damageCompare = this.compare(2,item[this.unitSelected.itemVal].partType) - damage
        var healthCompare = this.compare(3,item[this.unitSelected.itemVal].partType) - health

        if(priorityCompare < 0){
          priorityCompare = 0
        }  
        if(armorCompare < 0){
          armorCompare = 0
        }  
        if(damageCompare < 0){
          damageCompare = 0
        }  
        if(healthCompare < 0){
          healthCompare = 0
        }  
        this.fightButtonText.text = "FIGHT"
        this.buyButtonText.text = "PURCHASE"
        this.playerStats.text = "\n--------------------------------\n******* PLAYER STATS *******\n--------------------------------\n"+"PRI: "+priority+" (+"+priorityCompare+")\n"+"ARM: "+armor+" (+"+armorCompare+")\n"+"DMG: "+damage+" (+"+damageCompare+")\n"+"HP: "+health+" (+"+healthCompare+")"              

      }
          
        
      
  };
  window['simplewar'] = window['simplewar'] || {};
  window['simplewar'].Game = Game;
}());