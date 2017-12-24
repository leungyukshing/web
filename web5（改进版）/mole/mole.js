(function () {
  var score = 0;
  var state = false;
  var time = 31;

  window.onload = function() {
    //generate to game map
    var wrapper = document.getElementById("map");
    for (var i = 0; i < 60; i++) {
      var radio = document.createElement("input");
      radio.setAttribute("type", "radio");
      radio.className = "btn";
      radio.addEventListener("mousedown", checkhitted);
      radio.addEventListener("click", hit);
      wrapper.appendChild(radio);
    }

    mole = document.getElementsByClassName("btn");
    // generate state bar
    var stateBar = document.getElementById("statebar");
    stateBar.innerText = "Game Over";

    // set score and time
    var time = document.getElementById("showtime");
    time.innerText = "0";
    var score = document.getElementById("showscore");
    score.innerText = "0";

    document.getElementById("control").addEventListener("click", control);

    // record
    localStorage.setItem("bestScore", 0);
  };

  function timer() {
    if (time != 0) {
      time--;
      var show = document.getElementById("showtime");
      show.innerText = time;
      id = setTimeout(timer, 1000);
      //setTimeout(randomGenerator, 2000);
      
    }

    else if (time == 0) {
      state = 0;
      clearTimeout(id);
      var sta = document.getElementById("statebar");
      sta.innerText = "Game Over";
      alert("Game Over.\nYour score is: " + score);
      mole[index].checked = false;
      record();
      score = 0;
    }
  }

  function randomGenerator() {
    if (state == 1) {
      index = Math.floor(Math.random() * 60);
      mole[index].checked = true;
    }
  }

  function checkhitted(event) {
    // to check whether the radio is a mole
    before = this.checked;
  }

  function hit(event) {
    if (state == 1) {
      // hit the right mole
      if (before == true) {
        score++;
        this.checked = false;
        randomGenerator();
      }
      // hit the wrong mole
      else {
        score--;
        this.checked = false;
      }
      // show the score after a hit by player
      document.getElementById("showscore").innerText = score;
    }
    // If game is not started, player is not allow to hit any mole
    else {
      this.checked = false;
    }
  }

  function control() {
    // press the button and start the game
    if (state == 0) {
      state = 1;
      time = 31;
      randomGenerator();
      document.getElementById("statebar").innerText = "Playing";
      document.getElementById("showtime").innerText = time;
      document.getElementById("showscore").innerText = score;
      timer();
    }
    // press the button and terminate the game
    else {
      state = 0;
      alert("Game Over.\n Your score is: " + score);
      document.getElementById("statebar").innerText = "Game Over";
      clearTimeout(id);
      mole[index].checked = false;
      
      record();
      
      score = 0;
      time = 0;
    }
  }

  function record() {
    var preScore = window.localStorage.getItem("bestScore");
    
    if (score > preScore) {
      window.localStorage.setItem("bestScore", score);
      alert("Congratulation! Now you are the new record holder with " + score + " points.")
    }
    else {
      alert("Keep it up! The present record is " + preScore);
    }
  }

})();