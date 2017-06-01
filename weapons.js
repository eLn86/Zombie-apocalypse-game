var Weapon = function(settings) {

  // Settings
  var weaponElement = null;
  var playerElement = null;

  // variables for weapon aim arc
  var angle = Math.PI/2;


  function wall() {

    var weaponRect = weaponElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(weaponRect.bottom > h){
      weaponElement.style.top = (h-weaponRect.height) + 'px';
    }

    if(weaponRect.top < 0){
      weaponElement.style.top = '0px';
    }

    if(weaponRect.left < 0){
        weaponElement.style.left = '0px';
    }

    if(weaponRect.right > w){
        weaponElement.style.left = (w - weaponRect.width) + 'px' ;
    }
  }

  // Move the weapon together with the player manually
  function move(interactions){

    if(interactions.left){
      weaponElement.style.left = parseInt(weaponElement.style.left)-settings.playerSpeed+"px";
    }

    if(interactions.right){
      weaponElement.style.left = parseInt(weaponElement.style.left)+settings.playerSpeed+"px";
    }

    if(interactions.up){
      //move the crosshair up along the x and y axis in an arc
      var playerElement = document.getElementById('player');
      var playerObj = playerElement.getBoundingClientRect();
      var weapElement = document.getElementById('weapon');
      var radius = (playerObj.width/2) + 60;
      angle += 0.04;
      var top = (radius*Math.sin(angle));
      var left = (radius*Math.cos(angle));
      weapElement.style.left = (playerObj.left + (playerObj.width/2)) + left + 'px';
      weapElement.style.top = (playerObj.top + (playerObj.height/2)) - top + 'px';

      if(angle > Math.PI/2) {
        weapElement.style.left = playerObj.left + 50 + 'px';
        weapElement.style.top = playerObj.top - 60 + 'px';
        angle = Math.PI/2;
      }
    }

    if(interactions.down){
      //move the crosshair down along the x and y axis in an arc
      var playerElement = document.getElementById('player');
      var playerObj = playerElement.getBoundingClientRect();
      var weapElement = document.getElementById('weapon');
      var radius = (playerObj.width/2) + 60;
      angle -= 0.04;
      if(angle < 0.2) {
        weapElement.style.left = playerObj.width/2 + radius + 'px';
        weapElement.style.top = playerObj.top + (playerObj.height/2) + 'px';
        angle = 0.2;
      }

      var top = (radius*Math.sin(angle));
      var left = (radius*Math.cos(angle));
      weapElement.style.left = (playerObj.left + (playerObj.width/2)) + left + 'px';
      weapElement.style.top = (playerObj.top + (playerObj.height/2)) - top + 'px';
    }

    if(settings.walls){
      wall();
      //weaponBoundary();
    }
  }

  // Fire weapon manually via pressing space bar
  // function fireWeapon(interactions){

  // }

  function createWeapon() {
      // Create the object asset
      playerElement = document.getElementById('player');
      weaponElement = document.getElementById('weapon');
      var playerRect = playerElement.getBoundingClientRect();
      var weapRect = weaponElement.getBoundingClientRect();
      weaponElement.style.top = (playerRect.top - 60) + 'px';
      weaponElement.style.left = (playerRect.left + (playerRect.width/2) - (weapRect.width/2)) + 'px';
      weaponElement.style.height = '40px';
      weaponElement.style.width = '40px';
  }

  function init(){
    createWeapon();
  }

  this.render = function(interactions){
    move(interactions);
    // fireWeapon(interactions);
  }

  init();

}
