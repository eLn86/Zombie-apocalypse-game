var PlayerHP = function (settings) {
    var hpElement = null;


    function wall() {

      var hpRect = hpElement.getBoundingClientRect();
      var w = parseInt(window.innerWidth);
      var h = parseInt(window.innerHeight);

      if(hpRect.bottom > h){
        hpElement.style.top = (h-hpRect.height) + 'px';
      }

      if(hpRect.top < 0){
        hpElement.style.top = '0px';
      }

      if(hpRect.left < 0){
        hpElement.style.left = '0px';
      }

      if(hpRect.right > w){
        hpElement.style.left = ( w - hpRect.width) + 'px' ;
      }
    }

    //don't move the HP Board but if window is scaled, it moves accordingly
    function move(interactions){

      if(settings.walls){
        wall();
      }
    }

    function createHPBoard() {
      // Create the object asset
      hpElement = document.getElementById('playerHP');
      hpElement.style.width = '100px';
      hpElement.style.height = '50px';
      hpElement.innerHTML = "HP: " + settings.playerHP;
    }

    function init(){
      createHPBoard();
    }

    this.render = function(interactions){
      move(interactions);
    }

    init();

}
