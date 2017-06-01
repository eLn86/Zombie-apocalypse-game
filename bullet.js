var Bullet = function(settings) {

  // Settings
  var bulletElement = null;
  var playerElement = null;
  var bulletDamage = 50;        //Default bullet damage
  var bulletidParent = null;
  this.id = settings.bulletID;
  // variables for weapon aim arc
  var angle = Math.PI/2;

  // Collision detection between bullet and ground / monsters / player / window boundaries
  function wall() {
    if(settings.bulletMoving) {
      bulletElement = document.getElementById('bullet'+this.id);
      var bulletRect = bulletElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

    if(bulletRect.right > w){
      bulletElement.style.left = (w-bulletRect.width) + 'px';
      $('#bullet'+this.id).remove();
      settings.bulletMoving = false;
      settings.bulletFired = false;
      //settings.bulletID = 0;
      //this.id=settings.bulletID;
    }
  }
}

  function move(interactions) {

    // if(interactions.left){
    //   bulletElement.style.left = parseInt(bulletElement.style.left)-settings.playerSpeed+"px";
    // }
    //
    // if(interactions.right){
    //   bulletElement.style.left = parseInt(bulletElement.style.left)+settings.playerSpeed+"px";
    // }

    // if(interactions.up){
    //   //move the crosshair up along the x and y axis in an arc
    //   var playerElement = document.getElementById('player');
    //   var playerObj = playerElement.getBoundingClientRect();
    //   var radius = (playerObj.width/2) + 60;
    //   angle += 0.04;
    //   var top = (radius*Math.sin(angle));
    //   var left = (radius*Math.cos(angle));
    //   bulletElement.style.left = (playerObj.left + (playerObj.width/2)) + left + 'px';
    //   bulletElement.style.top = (playerObj.top + (playerObj.height/2)) - top + 'px';
    //
    //   if(angle > Math.PI/2) {
    //     bulletElement.style.left = playerObj.left + 50 + 'px';
    //     bulletElement.style.top = playerObj.top - 60 + 'px';
    //     angle = Math.PI/2;
    //   }
    // }
    //
    // if(interactions.down){
    //   //move the crosshair down along the x and y axis in an arc
    //   var playerElement = document.getElementById('player');
    //   var playerObj = playerElement.getBoundingClientRect();
    //
    //   var radius = (playerObj.width/2) + 60;
    //   angle -= 0.04;
    //   if(angle < 0.2) {
    //     bulletElement.style.left = playerObj.width/2 + radius + 'px';
    //     bulletElement.style.top = playerObj.top + (playerObj.height/2) + 'px';
    //     angle = 0.2;
    //   }
    //
    //   var top = (radius*Math.sin(angle));
    //   var left = (radius*Math.cos(angle));
    //   bulletElement.style.left = (playerObj.left + (playerObj.width/2)) + left + 'px';
    //   bulletElement.style.top = (playerObj.top + (playerObj.height/2)) - top + 'px';
    // }
    // if(settings.firstbulletFired) {
    //   makeBullet();
    // }
      bulletElement = document.getElementById(("bullet"+this.id).toString());
    if (bulletElement) {
      console.log(bulletElement.id)
      if(settings.fireBullet) {
      fireBullet();
      console.log("2. firebullet this.id="+this.id);
      }

      if(settings.bulletFired && settings.bulletMoving) {
      moveBullet();
      console.log("3. movebullet this.id="+this.id);
      }

      if(settings.walls) {
      wall();
      }
    }

}

      function makeBullet() {
      // Create a bullet
      console.log("1. makebullet this.id="+this.id);
      if ($('bullet #bullet'+this.id)) {
          settings.bulletID++;
          this.id=settings.bulletID;
      }

      $('body').append("<div id='bullet" + this.id + "' class='bullet'></div>");
      bulletElement = document.getElementById(("bullet"+this.id).toString());
      playerElement = document.getElementById('player');
      var playerRect = playerElement.getBoundingClientRect();
      var bulletRect = bulletElement.getBoundingClientRect();
      bulletElement.style.width = "20px";
      bulletElement.style.height = "20px";
      bulletElement.style.backgroundColor = "black";
      bulletElement.style.top = (playerRect.top - 60) + 'px';
      bulletElement.style.left = (playerRect.left + (playerRect.width/2) - (bulletRect.width/2)) + 'px';
      bulletElement.style.display = "inline-block";
      console.log(bulletElement.style.left);

    }

      //function which fires the bullet from its rendered position
      function fireBullet() {
      this.id = settings.bulletID;
      weaponElement = document.getElementById('weapon');
      bulletElement = document.getElementById(("bullet"+(this.id)).toString());
      var weaponRect = weaponElement.getBoundingClientRect();
      bulletElement.style.top = weaponRect.top + 'px';
      bulletElement.style.left = weaponRect.left + 'px';
      bulletElement.style.display = "inline-block";

      settings.bulletFired = true;
      settings.bulletMoving = true;
      settings.firstbulletFired = true;
        settings.fireBullet = false;
      // this.id++;

    }

      //function which moves the bullet after it is fired
      function moveBullet() {
      //bulletElement = document.getElementById(("bullet"+this.id).toString());
      bulletElement.style.left = parseInt(bulletElement.style.left) + 8 + 'px';
    }

      function destroyBullet() {

      }

      function init() {
      makeBullet();
      }


      this.render = function(interactions){
    //     if(settings.fireBullet && settings.bulletFired === false && settings.bulletMoving === false) {
    //     makeBullet();
    // }
    move(interactions);

}

init();
  }
