var Player = function(settings) {

    // Settings
    var playerElement = null;
    var playerHP = 100;             // Default player hit points
    var hitMonster = false;   // Boolean to check if player has collided with monster
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

    // set up collision detection between player and monsters
    function playerWall(interactions) {

        var playerRect = null;
        var monsterStats = [];

          for(var i=0;i<settings.monsterArray.length;i++) {
          playerRect = playerElement.getBoundingClientRect();

          if(parseInt(settings.monsterArray[i].style.left) < playerRect.right){  //collision conditional
            settings.monsterArray[i].style.left = playerRect.right + 'px';
            //playerElement.style.left = parseInt(settings.monsterArray[i].style.left) - playerRect.width + 'px';
            hitMonster = true;
          }

        }
    }


    // Move the player around manually
    function move(interactions){

      if(interactions.left){
        playerElement.style.left = parseInt(playerElement.style.left)-settings.playerSpeed+"px";
      }

      if(interactions.right){
          if(hitMonster === true) {
            interactions.right = false;
          }
          else {
            playerElement.style.left = parseInt(playerElement.style.left)+settings.playerSpeed+"px";
          }

      }

      if(settings.walls){
        wall();
        playerWall(interactions);
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
    }

    init();
}
