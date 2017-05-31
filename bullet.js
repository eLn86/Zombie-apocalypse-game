var Bullet = function(settings) {

  // Settings
  var bulletElement = null;
  var bulletDamage = 50;         //Default bullet damage

  // Collision detection between bullet and ground / monsters / player / window boundaries
  function bulletCollide() {

    var bulletRect = bulletElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(monsterRect.bottom > h){
      bulletElement.style.top = (h-bulletRect.height) + 'px';
    }

    if(monsterRect.top < 0){
      bulletElement.style.top = '0px';
    }

    if(monsterRect.left < 0){
        bulletElement.style.left = '0px';
    }

    if(monsterRect.right > w){
        bulletElement.style.left = ( w - bulletRect.width) + 'px' ;
    }

  }

  function move() {
    if(settings.automatic && settings.fireBullet) {
        bulletElement.style.left = parseInt(bulletElement.style.left)+settings.bulletPower+"px";
    }
    if(settings.walls) {
    wall();
    }
}

  function createBullet() {
    // Create the object asset
    if ($('monster #'+this.id)) {
      settings.id++;
      this.id=settings.id;
    }

    $('body').append("<div id='" + this.id + "' class='monster'></div>");
    //style='top:300px;left:1200px;height:100px'
    monsterElement = document.getElementById((this.id).toString());

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
