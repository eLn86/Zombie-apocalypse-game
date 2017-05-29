var Game = function() {

    // Game settings
    var settings = {};                     // Containes all game settings
    settings.playerSpeed = 8;              // The speed of the player when moving
    settings.monsterSpeed = 0.5;             // The speed of the zombie
    settings.aimUpDown = 4;                // The speed of which weapon aim moves up or down
    settings.walls = true;                 // The game objects cannot go outside the set boundaries of the screen
    settings.automatic = true;             // The object will move by itself
    settings.godmode = false;              // Debug mode


    // World settings
    var gameObjects = [];                  // All game objects
    var player1 = new Player(settings);    // The player
    var monster1 = new Monster(settings);  // First monster
    var score1 = new Scoreboard(settings); // Scoreboard
    var weapon1 = new Weapon(settings);    // first weapon
    gameObjects[0] = player1;              // Add player to the game objects array
    gameObjects[1] = score1;               // Add scoreboard to the game objects array
    gameObjects[2] = weapon1;             // Add first monster to the game objects array
    gameObjects[3] = monster1;              // Add weapon to the game objects array
    var frame = 0;                         // Frames since the start of the game
    var timer = 0;                         // Seconds passed since the start of game

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

      frame++;
      timer = frame/60;
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
