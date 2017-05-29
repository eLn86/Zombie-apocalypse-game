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

  function move(interactions){

    if(settings.walls){
      wall();
    }
  }

  function createScoreboard() {
    // Create the object asset
    scoreElement = document.getElementById('power');
    scoreElement.style.top = '0px';
    scoreElement.style.left = '600px';
    scoreElement.style.height = '100px';
  }

  function init(){
    createScoreboard();
  }

  this.render = function(interactions){
    move(interactions);
  }

  init();
}
