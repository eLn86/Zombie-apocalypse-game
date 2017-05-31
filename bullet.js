var Bullet = function(settings) {

  // Settings
  var bulletElement = null;
  var playerElement = null;
  var bulletDamage = 50;         //Default bullet damage

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

  function move() {

    if(settings.automatic && settings.fireBullet) {
        bulletElement.style.left = parseInt(bulletElement.style.left)+settings.bulletSpeed+"px";
    }
    if(settings.walls) {
    wall();
    }
}

  function createBullet() {
    // Create the object asset
    if ($('bullet #'+this.id)) {
      settings.id++;
      this.id=settings.id;
    }

    $('body').append("<div id='" + this.id + "' class='bullet'></div>");
    //style='top:300px;left:1200px;height:100px'
    bulletElement = document.getElementById((this.id).toString());
    playerElement = document.getElementById('player');
    var playerRect = playerElement.getBoundingClientRect();
    bulletElement.style.top = (playerRect.top + playerRect.height/2 - parseInt(bulletElement.style.height)/2) + 'px';
    bulletElement.style.left = (playerRect.left + playerRect.width/2 - parseInt(bulletElement.style.width)/2) + 'px';
    bulletElement.style.width = "50px";
    bulletElement.style.height = "50px";
  }

  function init() {
      createBullet();
  }

  this.render = function(interactions){
    move();
  }

init();
}
