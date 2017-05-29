var Scoreboard = function(settings) {
  var scoreElement = null;

  
  function createScoreboard() {
    // Create the object asset
    scoreElement = document.getElementById('power');
    scoreElement.style.top = '100px';
    scoreElement.style.left = '600px';
    scoreElement.style.height = '100px';
  }

  function init(){
    createScoreboard();
  }

  this.render = function(interactions){

  }

  init();
}
