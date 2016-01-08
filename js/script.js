(function(){
  var canvas  = document.getElementById('sky'),
      context = canvas.getContext('2d'),
      windowWidth = window.innerWidth,
      windowHeight = window.innerHeight,
      requestAnimationFrame = window.requestAnimationFrame,
      starsNumber = 200,
      stars = new Array()
      ;

      // Make canvas element fullscreen
      canvas.width = windowWidth;
      canvas.height = windowHeight;


      // Star Object
      function Star(xPos,yPos,radius,opacity,time) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
        this.opacity = opacity;
        this.time = time;
      }


      Star.prototype.update = function() {
        context.beginPath();
        context.fillStyle ="#FFF";
        this.radius = Math.random()*0.8+0.5;
        context.arc(this.xPos, this.yPos, this.radius,0, 2 * Math.PI, false);
        // context.shadowColor = "hsla(0,100%,100%,"+Math.random()+")";
        // context.shadowBlur = Math.floor(Math.random() * 10 + 5);
        context.fill();
        context.closePath;
      }

      // Meteor Object
      function Meteor() {
        this.reset();
      }

      Meteor.prototype.reset = function(){
        this.x = Math.random()*windowWidth;
        this.y = 0;
        this.len = (Math.random()*80)+10;
        this.speed = (Math.random()*10)+6;
        this.size = (Math.random()*1)+0.1;
        // this is used so the shooting stars arent constant
        this.waitTime =  new Date().getTime() + (Math.random()*5000)+1000;
        this.active = false;
      }

      Meteor.prototype.update = function(){
        if(this.active){
          this.x-=this.speed;
          this.y+=this.speed;
          if(this.x<0 || this.y >= windowHeight){
            this.reset();
          }else{
            context.lineWidth = this.size;
            context.beginPath();
            context.fillStyle = '#FFF';
            context.strokeStyle = '#FFF';
            context.moveTo(this.x,this.y);
            context.lineTo(this.x+this.len, this.y-this.len);
            context.stroke();
          }
        }else{
          if(this.waitTime < new Date().getTime()){
            this.active = true;
          }
        }
      }

      // Initializing stars and meteor
      stars.push(new Meteor());

      function initStars () {
        for (var i = 0; i < starsNumber; i++) {

          var xPos = Math.floor(Math.random() * windowWidth);
          var yPos = Math.floor(Math.random() * windowHeight);
          var radius = Math.floor(Math.random() * 1.5 + 0.2);
          var star = new Star(xPos,yPos,radius,1,0);
          stars.push(star);
        }

        drawAndUpdate();
      }

      initStars();

      // Updating and Drawing the canvas
      function drawAndUpdate () {

        context.clearRect(0, 0, windowWidth, windowHeight);

        for (var i = 0; i < stars.length; i++) {
          var myStar = stars[i];
          myStar.update();
        }

        requestAnimationFrame(drawAndUpdate);
      }

      // Redraw when the user is playing with browser size!
      window.onresize = redraw;

      function redraw() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
        stars = [];
        stars.push(new Meteor());
        initStars();
      }



      // Music Player
      var song = document.getElementById("song"),
          playButton = document.querySelector('.control-play'),
          pauseButton = document.querySelector('.control-pause'),
          player = document.querySelector('.music-player-container'),
          seekbar = document.querySelector('.seekbar'),
          song = document.querySelector('#song');

      // Bring on the player
      player.classList.add('biadg');


      playButton.addEventListener('click', function(e) {
        song.play();
      	player.classList.add('is-playing');
        player.classList.remove('pause');
      }, false);

      pauseButton.addEventListener('click', function(e) {
        song.pause();
      	player.classList.add('pause');
      }, false);

      song.addEventListener('ended', function(e) {
        this.pause();
        player.classList.remove('is-playing');
      }, false);

      // Handle the seekbar
      song.addEventListener('timeupdate', function() {
        seekbar.setAttribute("value", this.currentTime / this.duration);
      });

      // Full-Screen mode

      var moon = document.querySelector('.moon');

      function toggleFullScreen() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
         (!document.mozFullScreen && !document.webkitIsFullScreen)) {
          if (document.documentElement.requestFullScreen) {
            document.documentElement.requestFullScreen();
          } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullScreen) {
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
          }
        } else {
          if (document.cancelFullScreen) {
            document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
        }
      }

      moon.addEventListener('click', function(e) {
        toggleFullScreen();
      }, false);

})();
