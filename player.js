var Player = function(settings) {

    // Settings
    var hpElement = null;
    var currentHpElement = null;
    var playerElement = null;
    var hitMonster = false;             // Boolean to check if player has collided with monster

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
    function playerWall() {

        var playerRect = null;
        var monsterStats = [];

          for(var i=0;i<settings.monsterArray.length;i++) {
          playerRect = playerElement.getBoundingClientRect();
          // Collision detection between player and monster
          if(parseInt(settings.monsterArray[i].style.left) <= playerRect.right){  //collision conditional
            settings.monsterArray[i].style.left = playerRect.right + 'px';
            hitMonster = true;
            settings.playerHP -= 0.05;
            hpElement = document.getElementById('playerHP');
            hpElement.innerHTML = Math.floor(settings.playerHP);
            currentHpElement = document.getElementById('currentHp');
            currentHpElement.style.width = (settings.playerHP*2) + 'px';
          }
        }
    }


    // Move the player around manually
    function move(interactions){

      if(interactions.left){
        playerElement.style.left = parseInt(playerElement.style.left)-settings.playerSpeed+"px";
        hitMonster = false;
      }

      if(interactions.right){

        if(hitMonster) {
          interactions.right = false;
        }
        else{
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

    function createPlayerHp() {
        //create hp
        hpElement = document.getElementById('currentHp');
        hpElement.style.width = '200px';
    }

    function init(){
      createPlayer();
      createPlayerHp();
    }

    this.render = function(interactions){
      move(interactions);
    }

    init();
}
