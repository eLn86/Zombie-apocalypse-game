var cannonBall = function(x,y) {

  var cannonBallElement = null;
  var speed = settings.speed;

  function move(){
    var cannonBallElementRect = cannonBallElement.getBoundingClientRect();
    cannonBallElement.style.left = cannonBallElementRect.left + speed + 'px';
  }

  this.render(){
    move();
  }

  function create(){
      cannonBallElement = document.createElement('DIV');
      cannonBallElement.classList.add('cannonBall');
      var body = document.getElementsByClassName('body')[0];
      body.append(cannonBallElement);
      cannonBallElement.style.top  = y + 'px';
      cannonBallElement.style.left = x + 'px';
  }

  function init(){
    create();
  }
  init();
}
