var Monster = function(settings) {

  // Settings
  var monsterElement = null;
  var monsterHP = 100;            //Default monster hit points
  this.monsterID = settings.monsterID;   //get the id of each monster after created in game.js

  // Collision detection between object and window boundaries
  function wall() {

    var monsterRect = monsterElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(monsterRect.bottom > h){
      monsterElement.style.top = (h-monsterRect.height) + 'px';
    }

    if(monsterRect.top < 0){
      monsterElement.style.top = '0px';
    }

    if(monsterRect.left < 0){
        monsterElement.style.left = '0px';
    }

    if(monsterRect.right > w){
        monsterElement.style.left = ( w - monsterRect.width) + 'px' ;
    }

  }

  //Move the monster from right to left automatically
  function move() {
    if(settings.automaticallyMove) {
        monsterElement.style.left = parseInt(monsterElement.style.left) - settings.monsterSpeed+"px";
    }
    if(settings.walls) {
    wall();
    }
}

  function createMonster() {
    // Create the object asset
    if ($('monster #monster'+this.monsterID)) {
      settings.monsterID++;
      this.monsterID=settings.monsterID;
    }

    $('body').append("<div id='monster" + this.monsterID + "' class='monster'></div>");
    //style='top:300px;left:1200px;height:100px'
    monsterElement = document.getElementById(("monster"+this.monsterID).toString());
    monsterElement.style.top = '300px'
    monsterElement.style.left = '1200px';
    monsterElement.style.height = '100px';
  }

  function init() {
      createMonster();
  }

  this.render = function(interactions){
    move();
  }

init();
}
