(function () {
  var map = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  var state = 0;
  var sec = 0;
  var min = 0;
  var hour = 0;
  var time;
  var first = true;
  var str_time;
  var step = 0;

  window.onload = function() {
    generatePic();

    $("#end").click(end);
    $("#start").click(start);
    str_time = "Time: 00:00:00";
    $("#timer").text(str_time);
    str_step = "Step: " + step;
    $("#counter").text(str_step);

    //record
    localStorage.setItem("bestTime", Number.POSITIVE_INFINITY);
    localStorage.setItem("bestStep", Number.POSITIVE_INFINITY);
  }

  function generatePic() {
    var pic = document.getElementById("frame");
    for (var i = 0; i < 16; i++) {
      var block = document.createElement("div");
      block.className = "pos" + i;
      block.id = "pos" + i;
      block.addEventListener("click", move);
      pic.appendChild(block);
    }
  }

  function move(event) {
    if (state == 0)
      return;

    var blank = document.getElementById("pos15");
    var blank_offsetTop = blank.offsetTop;
    var blank_offsetLeft = blank.offsetLeft;
    var this_offsetTop = this.offsetTop;
    var this_offsetLeft = this.offsetLeft;

    // situations allowed to move:
    // 1.左右相邻
    // 2.上下相邻
    if (Math.abs(blank_offsetTop - this_offsetTop) == 88 && blank_offsetLeft == this_offsetLeft
      || Math.abs(blank_offsetLeft - this_offsetLeft) == 83 && blank_offsetTop == this_offsetTop) {
      var temp = blank.className;
      blank.className = this.className;
      this.className = temp;
      step++;
      str_step = "Step: " + step;
      $("#counter").text(str_step);
      check();
    }
  }
  
  function start() {
    if (state == 0) {
      step = 0;
      str_step = "Step: " + step;
      $("#counter").text(str_step);

      time = timer();
      state = 1;

      function randomSort(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
      }

      //generate a new map but need verification
      function verify() {
        var less = 0;
        for (var a = 0; a < 16; a++) {
          for (var b = a + 1; b < 16; b++) {
            if (map[b] < map[a])
              less++;
          }
        }
        if (map[15] == 1 || map[15] == 3 || map[15] == 4 || map[15] == 6 || map[15] == 9 || map[15] == 11 || map[15] == 12 || map[15] == 14)
          return (less + 1) % 2 == 0;
        else
          return less % 2 == 0;
      }

      do {
        map.sort(randomSort);
      } while (verify() == false);

    
      var puzzle = document.getElementById("frame").childNodes;
      for (var k = 0; k < 16; k++) {
        puzzle[k].className = "pos" + map[k];
      }
    }
  }

  function end() {
    /*// make sure the blank is in No.15 position in order to verify
    for (var i = 0; i < 16; i++) {
      document.getElementById("pos" + i).className = "pos" + i;
    }

    function randomSort(a, b) {
      return Math.random() > 0.5 ? -1 : 1;
    }

    //generate a new map but need verification
    function verify() {
      var less = 0;
      for (var a = 0; a < 16; a++) {
        for (var b = a + 1; b < 16; b++) {
          if (map[b] < map[a])
            less++;
        }
      }
      return less % 2 == 0;
    }

    do {
      map.sort(randomSort);
    } while (verify() == false);

    
    var puzzle = document.getElementById("frame").childNodes;
    for (var k = 0; k < 16; k++) {
      puzzle[k].className = "pos" + map[k];
    }
    //handle tips
    $("#win_show").attr('id', 'win');
*/
    //handle timer
    if (state == 0)
      return;

    clearInterval(time);
    sec = 0;
    min = 0;
    hour = 0;
    state = 0;
    alert("Don't give up! Please try again!");
  }

  //check whether the picture is complete
  function check() {
    for (var i = 0; i < 16; i++) {
      var section = document.getElementById("pos" + i);
      if (section.className != "pos" + i )
        return;
    }
    
    //finish the puzzle and win
    $("#win").attr('id', 'win_show');
    state = 0;

    clearInterval(time);
    record();
    sec = 0;
    min = 0;
    hour = 0;
    state = 0;
  }

  //Advanced functions
  var sec = 0;
  var min = 0;
  var hour = 0;
  function timer() {
    return setInterval(function () {
    
    // strings to show
    var str_sec = sec;
    var str_min = min;
    var str_hour = hour;

    //formatting
    if (sec < 10) {
      str_sec = "0" + sec;
    }
    if (min < 10) {
      str_min = "0" + min;
    }
    if (hour < 10) {
      str_hour = "0" + hour;
    }

    str_time = "Time: " + str_hour + ":" + str_min + ":" + str_sec;
    $("#timer").text(str_time);
    sec++;
    if (sec > 59) {
      sec = 0;
      min++;
    }
    if (min > 59) {
      min = 0;
      hour++;
    }

    }, 1000);
  }
  
  function record() {
    var preTime = window.localStorage.getItem("bestTime");
    var preStep = window.localStorage.getItem("bestStep");

    var this_time = hour * 3600 + min * 60 + sec;
    if (this_time < preTime) {
      window.localStorage.setItem("bestTime", this_time);
      alert("Congratulation! You are the fastest one to finish the puzzle!");
    }
    if (step < preStep) {
      window.localStorage.setItem("bestStep", step);
      alert("Congratulation! You are the man who finish the puzzle with least steps!");
    }
  }
}) ();