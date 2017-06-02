var Bullet = function(settings) {

  // Settings
  var bulletElement = null;
  var playerElement = null;
  var bossElement = null;
  var hpElement = null;
  var currentHpElement = null;
  var bulletHitMonster = false;
  var bulletHitBoss = false;
  // var currentlyMoving = false;
  this.id = settings.bulletID;

  // Collision detection between bullet and ground / monsters / player / window boundaries
  function wall() {

      bulletElement = document.getElementById('bullet'+this.id);
      var bulletRect = bulletElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

    if(bulletRect.right > w) {
      destroyBullet(this.id);
      settings.bulletMoving = false;
    }

    else if((settings.bulletPower*settings.bulletSpeed)<1) {
      destroyBullet(this.id);
      settings.bulletMoving = false;
      settings.playerHP -= (settings.bulletDamage/10);
      hpElement = document.getElementById('playerHP');
      hpElement.innerHTML = Math.floor(settings.playerHP);
      currentHpElement = document.getElementById('currentHp');
      currentHpElement.style.width = (settings.playerHP*2) + 'px';
    }

}

    // set up collision detection between bullets and monsters
    function bulletWall() {

      for(var i=0;i<settings.monsterObjArray.length;i++) {
        var bulletRect = null;
        bossElement = document.getElementById('iglor');
        //loop through bullet array and get the bullets and perform collision detection check
        for(var j=0;j<settings.bulletArray.length;j++) {
          settings.bulletArray = document.getElementsByClassName('bullet');
          bulletRect = settings.bulletArray[j].getBoundingClientRect();
          // Collision detection between bullet and monster
          if(parseInt(settings.monsterArray[i].style.left) <= bulletRect.right){  //collision conditional
            $(settings.bulletArray[j]).remove();
            settings.bulletMoving = false;
            bulletHitMonster = true;
          }
          if(parseInt(bossElement.style.left) <= bulletRect.right) {
            $(settings.bulletArray[j]).remove();
            settings.bulletMoving = false;
            bulletHitBoss = true;
          }
        }

          //loop through monster array and when bullets have collided and reduce monster HP
          if(bulletHitMonster){
            settings.monsterObjArray[i].monsterHP -= settings.bulletDamage;
            bulletHitMonster = false;
            if(settings.monsterObjArray[i].monsterHP <= 0) {
              settings.monsterObjArray.splice(i,1);
              $(settings.monsterArray[i]).remove();
              settings.killCount++;
            }
          }
          if(bulletHitBoss) {
            settings.bossHP -= settings.bulletDamage;
            bulletHitBoss = false;
            if(settings.bossHP <= 0) {
              $('#iglor').remove();
          }
        }
      }
    }

  function move(interactions) {

      if (settings.bulletMoving) {
        fireBullet();
        wall();
        bulletWall();
      }
}

      function makeBullet() {
      // Create a bullet and append it to the html body

          this.id = settings.bulletID;
          this.id++;
          settings.bulletID = this.id;


      $('body').append("<div id='bullet" + this.id + "' class='bullet'></div>");
      bulletElement = document.getElementById(("bullet"+this.id).toString());
      weaponElement = document.getElementById('weapon');
      var weaponRect = weaponElement.getBoundingClientRect();
      var bulletRect = bulletElement.getBoundingClientRect();
      bulletElement.style.width = "20px";
      bulletElement.style.height = "20px";
      bulletElement.style.backgroundColor = "black";
      bulletElement.style.left = ((weaponRect.left + weaponRect.width/2) - bulletRect.width/2) + 'px';
      bulletElement.style.top = (weaponRect.top + bulletRect.height/2)  + 'px';
      bulletElement.style.display = "inline-block";
      settings.bulletMoving = true;
    }

      //function which fires the bullet from its rendered position
      function fireBullet() {
      this.id = settings.bulletID;
      bulletElement = document.getElementById(("bullet"+(this.id)).toString());
      // var weaponRect = weaponElement.getBoundingClientRect();
      bulletElement.style.left = (parseInt(bulletElement.style.left) + (settings.bulletPower * settings.bulletSpeed)) + 'px';

      console.log((parseInt(bulletElement.style.left) + (settings.bulletPower * settings.bulletSpeed)));

    }

      function destroyBullet(bulletID) {
        $('#bullet'+bulletID).remove();
      }

      function init() {
      makeBullet();
      }


      this.render = function(interactions){
    move(interactions);
}

init();
  }
