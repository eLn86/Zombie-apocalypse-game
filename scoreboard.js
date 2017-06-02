var Scoreboard = function(settings) {
  var scoreElement = null;

  function wall() {

    var scoreRect = scoreElement.getBoundingClientRect();
    var w = parseInt(window.innerWidth);
    var h = parseInt(window.innerHeight);

    if(scoreRect.bottom > h){
      scoreElement.style.top = (h-scoreRect.height) + 'px';
    }

    if(scoreRect.top < 0){
      scoreElement.style.top = '0px';
    }

    if(scoreRect.left < 0){
        scoreElement.style.left = '0px';
    }

    if(scoreRect.right > w){
        scoreElement.style.left = ( w - scoreRect.width) + 'px' ;
    }
  }

  //don't move the scoreboard but if window is scaled, it moves accordingly
  function move(interactions){

    if(settings.walls){
      wall();
    }
  }

  function createScoreboard() {
    // Create the object asset
    scoreElement = document.getElementById('scoreboard');
    scoreElement.style.height = '100px';
    scoreElement.style.height = '50px';
    scoreElement.innerHTML = settings.currentScore;
  }

  function updateScore() {
  scoreElement.innerHTML = settings.currentScore;
  }

  function init(){
    createScoreboard();
  }

  this.render = function(interactions){
    move(interactions);
    updateScore();
  }

  init();
}
