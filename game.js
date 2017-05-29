var Game = function() {

    // Game settings
    var settings = {};                     // Containes all game settings
    settings.playerSpeed = 8;              // The speed of the player when moving
    settings.zombieSpeed = 8;              // The speed of the zombie
    settings.walls = true;                 // The ball can not go outside the screen
    settings.automatic = false;            // The ball will move by itself
    settings.godmode = false;              // Debug mode

    // World settings
    var gameObjects = [];                  // All game objects
    var player1 = new Player(settings);    // The player
    gameObjects[0] = player1;                   //
    var frame = 0;                         // Frames since the start of the game

    // Interactions
    var interactions = {};
    interactions.up = false;              // Up arrow key pressed
    interactions.down = false;            // Down arrow key pressed
    interactions.left = false;            // Left arrow key pressed
    interactions.right = false;           // Right arrow ket pressed
    interactions.space = false;           // Speace key pressed
    interactions.w = false;               // 'W' key pressed
    interactions.s = false;               // 'S' key pressed
    interactions.a = false;               // 'A' key pressed
    interactions.d = false;               // 'D' key pressed
    interactions.space = false;           // Space Bar key pressed


    // Setup event listeners
    function setupEvents() {
      document.addEventListener('keyup', function(event){
        var keyName = event.key;

        switch(keyName) {
          case "ArrowRight":
              interactions.right = false;
              break;
          case "ArrowLeft":
              interactions.left = false;
              break;
          case "ArrowUp":
              interactions.up = false;
              break;
          case "ArrowDown":
              interactions.down = false;
              break;
          case "W":
              interactions.w = false;
              break;
          case "S":
              interactions.s = false;
              break;
          case "A":
              interactions.a = false;
              break;
          case "D":
              interactions.d = false;
              break;
          case " ":
              interactions.space = false;
              break;
          default:
              break;
        }

      });

      document.addEventListener('keydown', function(event){
        var keyName = event.key;

        switch(keyName) {
          case "ArrowRight":
              interactions.right = true;
              break;
          case "ArrowLeft":
              interactions.left = true;
              break;
          case "ArrowUp":
              interactions.up = true;
              break;
          case "ArrowDown":
              interactions.down = true;
              break;
          case "W":
              interactions.w = true;
              break;
          case "S":
              interactions.s = true;
              break;
          case "A":
              interactions.a = true;
              break;
          case "D":
              interactions.d = true;
              break;
          case " ":
              interactions.space = true;
              break;
          default:
              break;
        }
      });
    }

    // Startup the game
    function init(){
      setupEvents();
    }

    // The render function. It will be called 60/sec
    function render(){

      for(var i=0; i < gameObjects.length; i++){
        gameObjects[i].render(interactions);
      }
    }

    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              function(callback){
                window.setTimeout(callback, 1000 / 60);
              };
            })();

            (function animloop(){
              requestAnimFrame(animloop);
              render();
            })();

            init();
}

var g = new Game();
