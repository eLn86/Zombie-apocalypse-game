var Powerbar = function(settings) {

  // Settings
  var pbElement = null;
  var playerElement = null;
  var ceiling = 200;              //Max power value
  var increase = true;            //Check if power is increasing
  var x = 2;                    //incremental for power

  function wall() {

    var pbRect = pbElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(pbRect.bottom > h){
      pbElement.style.top = (h-pbRect.height) + 'px';
    }

    if(pbRect.top < 0){
      pbElement.style.top = '0px';
    }

    if(pbRect.left < 0){
        pbElement.style.left = '0px';
    }

    if(pbRect.right > w){
        pbElement.style.left = ( w - pbRect.width) + 'px' ;
    }
  }

  // Move the power bar together with the player manually
  function move(interactions){

    if(interactions.left){
      pbElement.style.left = parseInt(pbElement.style.left)-settings.playerSpeed+"px";
    }

    if(interactions.right){
      pbElement.style.left = parseInt(pbElement.style.left)+settings.playerSpeed+"px";
    }

    if(interactions.space){
      pbElement.style.display = "block";

      if (increase == true && (settings.powerCount <= ceiling)) {
          settings.powerCount += x;
          pbElement.style.width = settings.powerCount + 'px';
          if (settings.powerCount == ceiling)
          {increase = false;}
        }

      else {
          increase = false;
          settings.powerCount -= x;
          pbElement.style.width = settings.powerCount + 'px';
          if (settings.powerCount == 0) {
            increase = true;
          }
        }

    }

    if(interactions.space === false){
      increase = true;
      pbElement.style.display = "none";
      settings.bulletPower = settings.powerCount / 2;
      settings.powerCount = 0;
      pbElement.style.width = settings.powerCount + 'px';
      settings.fireBullet = true;

    }

    if(settings.walls){
      wall();
    }
  }

  function createPowerBar() {
      // Create the object asset
    pbElement = document.getElementById('powerBar');
    playerElement = document.getElementById('player');
    var playerRect = playerElement.getBoundingClientRect();
    pbElement.style.top = (playerRect.top - 150) + 'px';
    pbElement.style.left = playerRect.left + 'px';
    pbElement.style.width = "0px";
    pbElement.style.height = "30px";
  }

  function init(){
      createPowerBar();
  }

  this.render = function(interactions){
    move(interactions);
  }

  init();

}
