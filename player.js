var Player = function(settings) {

    // Settings
    var playerElement = null;
    var playerHP = 100;             //Default player hit points

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

    // set up bounding box for player for the sake of collision detection
    function playerWall() {

//      setTimeout(function(){
        var playerRect = null;
        var monsterRect = document.getElementsByClassName("monster");
        var monsterStats = [];

          for(var i=0;i<monsterRect.length;i++) {
          playerRect = playerElement.getBoundingClientRect();
          monsterStats[0] = monsterRect[0].getBoundingClientRect();
          if(monsterStats[0].left === (playerRect.left + playerRect.width)){
             monsterStats[0].style.left = playerRect.style.right + "px";
          }
        }
//      }, 2000);


    }


    // Move the player around manually
    function move(interactions){

      if(interactions.left){
        playerElement.style.left = parseInt(playerElement.style.left)-settings.playerSpeed+"px";
      }

      if(interactions.right){
        playerElement.style.left = parseInt(playerElement.style.left)+settings.playerSpeed+"px";
      }

      if(settings.walls){
        wall();
        playerWall();
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
