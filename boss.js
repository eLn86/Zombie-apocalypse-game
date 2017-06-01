var Boss = function(settings) {

  // Settings
  var bossElement = null;


  // Collision detection between object and window boundaries
  function wall() {

    var bossRect = bossElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(bossRect.bottom > h){
      bossElement.style.top = (h-bossRect.height) + 'px';
    }

    if(boss.top < 0){
      bossElement.style.top = '0px';
    }

    if(bossRect.left < 0){
        bossElement.style.left = '0px';
    }

  }

  //Move the monster from right to left automatically
  function move() {
    if(settings.automaticallyMove) {
        bossElement.style.left = parseInt(bossElement.style.left) - settings.bossSpeed+"px";
    }
    if(settings.walls) {
    wall();
    }
}

  function createBoss() {
    // Create the boss asset
    bossElement = document.createElement('div');
    bossElement.classList.add("boss");
    bossElement.setAttribute("id","iglor");
    var body = document.body;
    body.append(bossElement);
    bossElement = document.getElementById("iglor");
    bossElement.style.top = '300px';
    bossElement.style.left = '1000px';
    bossElement.style.height = '200px';
    bossElement.style.height = '100px';
    bossElement.style.backgroundImage = "url('boss.png')";
  }

  function init() {
      createBoss();
  }

  this.render = function(interactions){
    move();
  }

init();
}
