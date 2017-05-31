var Bullet = function(settings) {

  // Settings
  var bulletElement = null;
  var playerElement = null;
  var bulletDamage = 50;         //Default bullet damage
  var releaseBullet = false;     //check if space bar has been depressed and released

  // variables for weapon aim arc
  var angle = Math.PI/2;

  // Collision detection between bullet and ground / monsters / player / window boundaries
  function wall() {

    var bulletRect = bulletElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(bulletRect.bottom > h){
      bulletElement.style.top = (h-bulletRect.height) + 'px';
    }

    if(bulletRect.top < 0){
      bulletElement.style.top = '0px';
    }

    if(bulletRect.left < 0){
        bulletElement.style.left = '0px';
    }

    if(bulletRect.right > w){
        bulletElement.style.left = ( w - bulletRect.width) + 'px' ;
    }

  }

  function move(interactions) {

    if(interactions.left){
      bulletElement.style.left = parseInt(bulletElement.style.left)-settings.playerSpeed+"px";
    }

    if(interactions.right){
      bulletElement.style.left = parseInt(bulletElement.style.left)+settings.playerSpeed+"px";
    }

    if(interactions.up){
      //move the crosshair up along the x and y axis in an arc
      var playerElement = document.getElementById('player');
      var playerObj = playerElement.getBoundingClientRect();
      var radius = (playerObj.width/2) + 60;
      angle += 0.04;
      var top = (radius*Math.sin(angle));
      var left = (radius*Math.cos(angle));
      bulletElement.style.left = (playerObj.left + (playerObj.width/2)) + left + 'px';
      bulletElement.style.top = (playerObj.top + (playerObj.height/2)) - top + 'px';

      if(angle > Math.PI/2) {
        bulletElement.style.left = playerObj.left + 50 + 'px';
        bulletElement.style.top = playerObj.top - 60 + 'px';
        angle = Math.PI/2;
      }
    }

    if(interactions.down){
      //move the crosshair down along the x and y axis in an arc
      var playerElement = document.getElementById('player');
      var playerObj = playerElement.getBoundingClientRect();

      var radius = (playerObj.width/2) + 60;
      angle -= 0.04;
      if(angle < 0.2) {
        bulletElement.style.left = playerObj.width/2 + radius + 'px';
        bulletElement.style.top = playerObj.top + (playerObj.height/2) + 'px';
        angle = 0.2;
      }

      var top = (radius*Math.sin(angle));
      var left = (radius*Math.cos(angle));
      bulletElement.style.left = (playerObj.left + (playerObj.width/2)) + left + 'px';
      bulletElement.style.top = (playerObj.top + (playerObj.height/2)) - top + 'px';
    }

    if(settings.fireBullet) {
    fireBullet();
    }

    if(settings.walls) {
    wall();
    }
}

  function createBullet() {
    // Create the object asset
    playerElement = document.getElementById('player');
    bulletElement = document.getElementById('bullet');
    var playerRect = playerElement.getBoundingClientRect();
    var bulletRect = bulletElement.getBoundingClientRect();
    bulletElement.style.width = "20px";
    bulletElement.style.height = "20px";
    bulletElement.style.top = (playerRect.top - 60) + 'px';
    bulletElement.style.left = (playerRect.left + (playerRect.width/2) - (bulletRect.width/2)) + 'px';
    bulletElement.style.display = "none";
  }

  //function which fires the bullet from its rendered position
  function fireBullet() {
      releaseBullet = true;
      bulletElement = document.getElementById('bullet');
      bulletElement.style.display = "block";
      bulletElement.style.left = bulletElement.style.left + settings.bulletSpeed + "px";
      settings.fireBullet = false;
    }



  function init() {
      createBullet();
    }


  this.render = function(interactions){
    move(interactions);
  }

init();
}
