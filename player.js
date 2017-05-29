var Player = function(settings) {

    // Settings
    var playerElement = null;
    var playerHP = 100;             //Default player hit points

    // variables for weapon power meter
    var powerCount = 0;             //counter to measure power of projectile
    var x = 0.5;                    //incremental for power
    var ceiling = 100;              //Max power value
    var increase = true;            //Check if power is increasing

    // Collision detection between object and window boundaries
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

    // set up boundaries for player for the sake of collision detection
    function playerWall() {

      var playerRect = playerElement.getBoundingClientRect();
      
    }


    // Move the player around manually
    function move(interactions){

      if(interactions.left){
        playerElement.style.left = parseInt(playerElement.style.left)-8+"px";
      }

      if(interactions.right){
        playerElement.style.left = parseInt(playerElement.style.left)+8+"px";
      }

      if(settings.walls){
        wall();
      }
    }


    // Fire weapon manually via pressing space bar
    function fireWeapon(interactions){
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

      //When spacebar is released, reset the powerCount to 0
      if(interactions.space === false) {

          powerCount = 0;

      }
    }

    function createPlayer() {
        // Create the object asset
        playerElement = document.getElementById('player');
        playerElement.style.top = '300px';
        playerElement.style.left = '0px';
        playerElement.style.height = '100px';
    }

    function init(){
      createPlayer();
    }

    this.render = function(interactions){
      move(interactions);
      fireWeapon(interactions);
    }

    init();
}
