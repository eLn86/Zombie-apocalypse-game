var Boss = function(settings) {

  // Settings
  var bossElement = null;

  // Collision detection between object and window boundaries
  function wall() {

    var bossRect = bossElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(bossRect.left < 0){
        bossElement.style.left = '0px';
    }
  }
  //Move the monster from right to left automatically
  function move() {
    if(settings.automaticallyMove) {
          bossElement.style.left = parseInt(bossElement.style.left) - 0.1 + "px";
    }
    if(settings.walls) {
    wall();
    }
}

  function createBoss() {
    // Create the boss asset
    bossElement = document.getElementById("iglor");
    bossElement.style.position = "absolute";
    bossElement.style.top = '20px';
    bossElement.style.left = '1200px';
    bossElement.style.height = '500px';
    bossElement.style.width = '200px';
    bossElement.style.display = "block";
    bossElement.style.content = "url('./wireframing/boss.png')";
  }

  function init() {
    createBoss();
  }

  this.render = function(){
      move();

  }

init();
}
