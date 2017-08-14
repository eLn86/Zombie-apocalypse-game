var Game = function() {

    // Game settings
    var settings = {};                     // Containes all game settings
    settings.startScreen = true;
    settings.gameStart = false;
    settings.playerSpeed = 8;              // The speed of the player when moving
    settings.playerHP = 100;               // Default player HP
    settings.monsterHP = 100;              // Default monster HP
    settings.monsterSpeed = 0.5;           // The speed of the zombie
    settings.bossHP = 300;                // Default boss HP
    settings.bossSpeed = 0.1;              // Boss Speed
    settings.bulletDamage = 50;            // damage done by each bullet
    settings.fireBullet = false;           // fire the bullet if true
    settings.bulletSpeed = 0.1;            // The speed of the bullet
    settings.powerCount = 0;               // Power count for power bar
    settings.bulletPower = 0;              // The power of the bullet after space bar is released
    settings.walls = true;                 // The game objects cannot go outside the set boundaries of the screen
    settings.automaticallyMove = true;     // The object will move by itself
    settings.godmode = false;              // Debug mode
    settings.monsterID = 1;                // Monster ID
    settings.spaceBarDepressed = false;    //boolean for power bar show and hide conditional
    settings.bulletID = 0;                 // Bullet ID
    settings.monsterArray = document.getElementsByClassName('monster'); //Store monster objects into array
    settings.monsterObjArray = [];
    settings.bulletArray = document.getElementsByClassName('bullet');  //Store bullet objects into array
    settings.bulletMoving = true;         // Don't move the bullet if false
    settings.bossTime = false;            // Change music when boss spawns
    settings.bossCount = 0;               // Spawn boss when true
    settings.timer = 0;                   // Game timer
    settings.killCount = 0;               // Monster kill count
    settings.currentScore = 0;            // Score
    settings.gameOverVictory = false;     // Boolean to control game over win
    settings.gameOverLoss = false;     // Boolean to control game over lose
    settings.winScreen = false;

    // World settings
    var gameObjects = [];                  // All game objects
    var player1 = new Player(settings);    // The player
    var score1 = new Scoreboard(settings); // Scoreboard
    var weapon1 = new Weapon(settings);    // first weapon
    var playerHP = new PlayerHP(settings); // Add player HP
    var powerbar = new Powerbar(settings); // Add power bar above player
    gameObjects[0] = player1;              // Add player to the game objects array
    gameObjects[1] = score1;               // Add scoreboard to the game objects array
    gameObjects[2] = weapon1;              // Add weapon to the game objects array
    gameObjects[3] = playerHP;             // Add player HP to the game objects array
    gameObjects[4] = powerbar;             // Add power bar to the game objects array
    var frame = 0;                         // Frames since the start of the game
    var spawnTimer = Math.random();        // Random spawn time for monster

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
    interactions.spaceUp = false;


    // Setup event listeners
    function setupEvents() {
      document.getElementById('startButton').addEventListener("click", function() {
        var gameContainer = document.getElementsByClassName('gameContainer');
        var startScreen = document.getElementById('startScreen');
        var zombieSound = document.getElementById('zombieSound');
        zombieSound.play();

        setTimeout(function(){
          zombieSound.pause();
          startScreen.style.display = 'none';
          settings.gameStart = true;
          settings.startScreen = false;
          var startMusic = document.getElementById('startMusic');
          startMusic.pause();
          var player = document.getElementById('player');
          var scoreboard = document.getElementById('scoreboard');
          var playerHP = document.getElementById('playerHP');
          var hpBar = document.getElementById('hpBar');
          var weapon = document.getElementById('weapon');
          player.style.opacity = '100';
          scoreboard.style.display = 'flex';
          playerHP.style.display = 'flex';
          hpBar.style.display = 'block';
          weapon.style.display = 'block';
        },1800);
      })

      document.getElementById('playAgainButton').addEventListener("click", function() {
          settings.gameOverVictory = false;
          settings.currentScore = 0;
          settings.playerHP = 100;
          settings.gameStart = true;
          var victoryMusic = document.getElementById('victory');
          victoryMusic.pause();
          var winScreen = document.getElementById('winScreen');
          winScreen.style.display = 'none';
      })

      document.getElementById('goBackToStartButton').addEventListener("click", function() {
          settings.gameOverVictory = false;
          settings.currentScore = 0;
          settings.playerHP = 100;
          var victoryMusic = document.getElementById('victory');
          victoryMusic.pause();
          var winScreen = document.getElementById('winScreen');
          winScreen.style.display = 'none';
          var player = document.getElementById('player');
          var scoreboard = document.getElementById('scoreboard');
          var playerHP = document.getElementById('playerHP');
          var hpBar = document.getElementById('hpBar');
          var weapon = document.getElementById('weapon');
          player.style.opacity = '0';
          scoreboard.style.display = 'none';
          playerHP.style.display = 'none';
          hpBar.style.display = 'none';
          weapon.style.display = 'none';
          var startScreen = document.getElementById('startScreen');
          startScreen.style.display = 'flex';
          settings.startScreen = true;
      })

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
              interactions.spaceUp = true;
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

    function spawnMonster() {
      var monster = new Monster(settings);
      gameObjects.push(monster);
      settings.monsterObjArray.push(monster);
      settings.monsterArray = document.getElementsByClassName('monster');
    }

    function createBullet() {
      gameObjects.push(new Bullet(settings));
      settings.bulletArray = document.getElementsByClassName('bullet');
    }

    function spawnBoss() {
      settings.bossTime = true;
      var boss = new Boss(settings);
      gameObjects.push(boss);
      settings.bossCount++;
    }

    // else {
    //   zombieMusic.autoplay = false;
    //   zombieMusic.pause();
    // }
    // function startMusic() {
    //   zombieMusic.src = "zombies.mp3";
    //   zombieMusic.loop;
    //   zombieMusic.preload = "auto";
    // }

    // The render function. It will be called 60/sec
    this.render = function(){

      if(settings.startScreen) {
        var startMusic = document.getElementById('startMusic');
        startMusic.play();
        startMusic.loop = true;
      }

      else {
        for(var i=0; i < gameObjects.length; i++){
            gameObjects[i].render(interactions);
          }

          setTimeout(function(){
            if((settings.timer % 3) === 0 && settings.bossTime === false && settings.killCount < 5 && settings.startScreen === false && settings.gameStart) {
              spawnMonster();
            }
          }, 3000);
          clearTimeout();

           if(interactions.spaceUp) {
             createBullet();
             interactions.spaceUp = false;
           }

          if(settings.playerHP <= 0) {
            console.log("Game Over, the zombies pwned you!");
          }

          if(settings.killCount < 5 && settings.startScreen === false && settings.gameStart) {
            var zombieMusic = document.getElementById('zombie');
            zombieMusic.play();
          }

          if(settings.killCount === 5) {
            settings.bossTime = true;
          }

          if(settings.bossTime && settings.bossCount === 0) {
            spawnBoss();
          }

          if(settings.bossTime) {
            var zombieMusic = document.getElementById('zombie');
            zombieMusic.pause();
            var bossMusic = document.getElementById('boss');
            bossMusic.play();
          }

          if(settings.gameOverVictory) {
            settings.gameStart = false;
            settings.bossTime = false;
            var bossMusic = document.getElementById('boss');
            bossMusic.pause();
            var victoryMusic = document.getElementById('victory');
            victoryMusic.play();
            victoryMusic.loop = true;
            settings.bossCount = 0;
            settings.killCount = 0;
            frame = 0;
            settings.timer = 0;
            settings.bossHP = 300;
            settings.bulletID = 0;
            var winScreen = document.getElementById('winScreen');
            winScreen.style.display = 'flex';
            var winScore = document.getElementById('winScore');
            winScore.innerHTML = 'Your Score: ' + settings.currentScore;
          }

          if(settings.gameOverVictory === false) {
            frame++;
            settings.timer = frame / 60;
          }
      }



    } // End of this.render

    var self = this; // Add this line
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
              self.render();
            })();

            init();
}

var g = new Game();
