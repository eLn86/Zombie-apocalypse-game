var Player = function(settings) {

    // Settings
    var playerElement = null;
    var bullets = [];

    // variables for weapon power meter
    var powerCount = 0;             //counter to measure power of projectile
    var x = 0.5;                    //incremental for power
    var ceiling = 100;              //Max power value
    var increase = true;            //Check if power is increasing


    function wall() {

      var playerRect = playerElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

      if(playerRect.bottom > h){
        playerElement.style.top = (h-playerRect.height) + 'px';
      }

      if(playerRect.top < 0){
        playerElement.style.top = '0px';
      }

      if(playerRect.left < 0){
          playerElement.style.left = '0px';
      }

      if(playerRect.right > w){
          playerElement.style.left = ( w - playerRect.width) + 'px' ;
      }
    }


    // Move the player around manually
    function move(interactions){

      if(interactions.left){
        playerElement.style.left = parseInt(playerElement.style.left)-8+"px";
      }

      if(interactions.right){
        playerElement.style.left = parseInt(playerElement.style.left)+8+"px";
      }

      if(interactions.space){

      //increase the power from 0 to 100 and decrease it to 100 to 0 repeatedly
      if (increase == true && powerCount <= ceiling) {
          powerCount += x;
          if (powerCount == ceiling)
          {increase = false;}
        }

      else {
          increase = false;
          powerCount -= x;

          if (powerCount == 0)
          {increase = true;}
        }
        console.log(powerCount);
  }



      if(interactions.space === false) {

          powerCount = 0;

      }

      if(settings.walls){
        wall();
      }
    }

    function create() {
        // Create the object asset
    }

    function init(){
      //
       create();
      playerElement = document.getElementById('player');
      playerElement.style.top = '300px';
      playerElement.style.left = '0px';
      playerElement.style.height = '100px';
    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}
