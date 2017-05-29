var Monster = function(settings) {

  // Settings
  var monsterElement = null;
  var monsterHP = 100;            //Default monster hit points

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
  function move(interactions) {
    if(settings.automatic) {
      monsterElement.style.left = parseInt(monsterElement.style.left)-1+"px";
    }

    if(settings.walls) {
    wall();
    }

}


  function createMonster() {
    // Create the object asset
    monsterElement = document.getElementById('monster');
    monsterElement.style.top = '300px';
    monsterElement.style.left = '1200px';
    monsterElement.style.height = '100px';
  }

  function init() {
  //
  createMonster();

  }

  this.render = function(interactions){
  move(interactions);
  }

init();
}
