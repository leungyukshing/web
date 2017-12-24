(function () {
  var flag = false;
  var end = true;
  var win_show = false;
  var lose_show = false;
  var cheat_show = false;
  var cheatBegin = false;
  var cheatEnd = false;
  window.onload = function() {
    // add listener to start and end
    var start = document.getElementById("start");
    start.addEventListener("mouseover", handleStart);
    var end = document.getElementById("end");
    end.addEventListener("mouseover", handleWin);

    // add listener to cheat detectors
    var left = document.getElementById("leftwall");
    left.addEventListener("mouseover", handleCheatBegin);
    var right = document.getElementById("rightwall");
    right.addEventListener("mouseover", handleCheatEnd);

    //add listeners to walls
    var dead = document.getElementsByClassName("deadzone");
    for (var i = 0; i < dead.length; i++) {
      dead[i].addEventListener("mouseover", handleDeath);
      dead[i].addEventListener("mouseout", handleLeave);
    }
  };

  function handleStart(event) {
    if (flag == true)
      return;

    flag = true;
    end = false;
    cheatBegin = false;
    cheatEnd = false;

    var frame = document.getElementById("frame");
    frame.id = "frame_start";
    
    if (win_show == true) {
      var display = document.getElementById("win_display");
      display.id = "win";
      win_show = false;
    }
    else if (lose_show == true) {
      var display = document.getElementById("lose_display");
      display.id = "lose";
      lose_show = false;
    }
    else if (cheat_show == true) {
      var display = document.getElementById("cheat_display");
      display.id = "cheat";
      cheat_show = false;
    }
  }

  function handleDeath(event) {
    if (flag == false || end == true) {
      return;
    }

    var frame = document.getElementById("frame_start");
    frame.id = "frame";

    event.target.className = "deadzone_red";
    if (lose_show == false) {
      var display = document.getElementById("lose");
      display.id = "lose_display";
      lose_show = true;
    }
    
    flag = false;
  }

  function handleLeave(event) {
    if (flag == true)
      return;

    event.target.className = "deadzone";
    end = true;
  }

  function handleWin(event) {
    if (cheatEnd == true) {
      var display = document.getElementById("cheat");
      display.id = "cheat_display";
      cheat_show = true;
    }
    else if (flag == false)
      return;

    else if (win_show == false) {
      var display = document.getElementById("win");
      display.id = "win_display";
      win_show = true;
    }
    var frame = document.getElementById("frame_start");
    frame.id = "frame";
    
    end = true;
    flag = false;
  }

  function handleCheatBegin(event) {
    if (flag == false)
      return;
    cheatBegin = true;
  }

  function handleCheatEnd(event) {
    /*if (flag == false || cheatBegin == false)
      return;*/
    cheatEnd = true;
  }
})();