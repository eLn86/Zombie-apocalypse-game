var Weapon = function(settings) {

  // Settings
  var weaponElement = null;
  var playerElement = null;

  // variables for weapon power meter
  var powerCount = 0;             //counter to measure power of projectile
  var x = 0.5;                    //incremental for power
  var ceiling = 100;              //Max power value
  var increase = true;            //Check if power is increasing

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

    if(weaponRect.left < 50){
        weaponElement.style.left = '50px';
    }

    if(weaponRect.right > w){
        weaponElement.style.left = ( w - weaponRect.width) + 'px' ;
    }
  }

  // function weaponBoundary() {
  //
  //   var weaponObj = null;
  //   var playerObj = null;
  //   weaponObj = weaponElement.getBoundingClientRect();
  //   playerObj = playerElement.getBoundingClientRect();
  //
  //   //collision detection for top of weapon
  //   if(weaponObj.top < (playerObj.top - 60)) {
  //     weaponElement.style.top = (playerObj.top - 60) + 'px';
  //   }
  //
  //   //collision detection for left of weapon
  //   if(weaponObj.left < (playerObj.left + 50)) {
  //     weaponElement.style.left = (playerObj.left + 50) + 'px';
  //   }
  //
  //   //collision detection for bottom of weapon
  //   if((weaponObj.top-weaponObj.height) > (playerObj.top - (playerObj.height/4))) {
  //     weaponElement.style.top = (playerObj.top - (playerObj.height/4)) + weaponObj.height + 'px';
  //   }
  //
  //    //collision detection for right of weapon
  //    if((weaponObj.left + weaponObj.width) > ((playerObj.left + playerObj.width) + 50)) {
  //      weaponElement.style.left = ((playerObj.left + playerObj.width) + 50) + 'px';
  //    }
  //
  // }

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
  //
  //   if(interactions.space){
  //   //increase the power from 0 to 100 and decrease it to 100 to 0 repeatedly
  //   if (increase == true && powerCount <= ceiling) {
  //       powerCount += x;
  //       if (powerCount == ceiling)
  //       {increase = false;}
  //     }
  //
  //   else {
  //       increase = false;
  //       powerCount -= x;
  //
  //       if (powerCount == 0)
  //       {increase = true;}
  //     }
  //   }

  //   //When spacebar is released, get the power value at which to fire bullets
  //   if(interactions.space === false) {
  //       settings.bulletPower = powerCount;
  //       powerCount = 0;
  //   }
  // }

  function createWeapon() {
      // Create the object asset
      playerElement = document.getElementById('player');
      weaponElement = document.getElementById('weapon');
      weaponElement.style.top = (parseInt(playerElement.style.top) - 60) + 'px';
      weaponElement.style.left = (parseInt(playerElement.style.left) + 50) + 'px';;
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
