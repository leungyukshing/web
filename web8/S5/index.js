$(function() {
  var ajaxstate = getAjaxstate();
  addButtonClickListener.call(null, ajaxstate);
  $('#at-plus-container').hover(initialize.bind(null, ajaxstate), clear.bind(null, ajaxstate));
});

function initialize(ajaxstate) {
  resetCss();

  // 为@+添加点击事件
  $('.apb').click(robot.bind(null, ajaxstate));
}

function clear(ajaxstate) {
  resetCss();
  
  $('.apb').unbind('click');
  //对每个button取消done事件
  $('li').each(function() {
    $(this).unbind('done');
  });
  
  /*处理异步中断*/
  var number = ajaxstate();
  if (number != null)
    number.abort();
}

function resetCss() {
  $('li').find('span').each(function() {
    $(this).text('').hide();
    $(this).parent().attr('class', 'button abled');
  });
  $('#result').text('').hide();
  $('#message').text('').hide();
  $('#showorder').text('').hide();
  $('#info-bar').attr('class', 'button disalbed');
  $('.apb').attr('class','apb');
}

function robot(ajaxstate) {
  $('.apb').unbind('click');
  $('.apb').attr('class','no apb');
  getRandomButton.call(null, ajaxstate);
}

function getRandomButton(ajaxstate) {
  var buttons = $('li');
  buttons.sort(randomsort);

  // show the order
  showOrder(buttons);

  var callback = getSum(); // callback 就是求当前和！！
  var i;
  for (i = 0; i < buttons.length - 1; i++) {
    // 对每一个button增加多个eventHandler
    /*对done事件绑定下一个button的处理函数，传入参数为callback和ajaxstate*/
    /*callback是为了回掉，ajaxstate是为了确保上一个button已拿回数据*/
    $(buttons[i]).on('done', $(buttons[i + 1]).prop('handler').bind(null, callback, ajaxstate));
  }
  /*最后一个button的下一个调用bubbleHandler*/
  $(buttons[i]).on('done', bubbleHandler.bind(null, callback, ajaxstate));
  //开始调用
  $(buttons[0]).prop('handler').call(null, callback, ajaxstate);
}

function showOrder(buttons) {
  var tmp = [];
  for (var i = 0; i < buttons.length; i++) {
    tmp[i] = $(buttons[i]).attr('id'); 
  }
  $("#showorder").text(tmp).show();
}

function randomsort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}

function getSum() {
  var sum = 0; // 相当于全局变量

  return function(num) {
    if (typeof num != 'undefined')
      sum += parseInt(num);
    else
      return sum;
  }
}

function getAjaxstate() {
  var currentAjaxstate = null; // 相当于全局变量

  return function(num) {
    if (typeof num != 'undefined')
      currentAjaxstate = num;
    else
      return currentAjaxstate;
  }
}

function addButtonClickListener() {
  $('#A').prop('handler', function() { return aHandler; });
  $('#B').prop('handler', function() { return bHandler; });
  $('#C').prop('handler', function() { return cHandler; });
  $('#D').prop('handler', function() { return dHandler; });
  $('#E').prop('handler', function() { return eHandler; });  
}

function error(message, currentSum) {
  this.message = message;
  this.currentSum = currentSum;
}

function aHandler(callback, ajaxstate) {
  var text = $('#A').find('span');
  try {
    text.text('...').show();
    text.parent().attr('class', 'button disalbed');
    var number = $.ajax({url: '/rand', context: text, success: function() {
      //上一个成功处理
      if (ajaxstate() != null) {
        console.log("The number is " + number.responseText);
        $(this).text(number.responseText);
        callback(number.responseText); // 求和
        $('#A').trigger('done'); // 触发done
      }
    }});
    // 传入参数更新
    console.log("save the present number" + number);
    ajaxstate(number);

    // 处理出错
    if (Math.random() > 0.7) {
      console.log("error happens in A");
      throw new error('这不是个天大的秘密', callback());
    }
    else {
      $('#message').text('这是个天大的秘密').show();
    }
  }
  catch (err) {
    $('#message').text(err.message).show();
  }
}

function bHandler(callback, ajaxstate) {
  var text = $('#B').find('span');
  try {
    text.text('...').show();
    text.parent().attr('class', 'button disalbed');
    var number = $.ajax({url: '/rand', context: text, success: function() {
      //上一个成功处理
      if (ajaxstate() != null) {
        console.log("The number is " + number.responseText);
        $(this).text(number.responseText);
        callback(number.responseText); // 求和
        $('#B').trigger('done'); // 触发done
      }
    }});
    // 传入参数更新
    console.log("save the present number" + number);
    ajaxstate(number);

    // 处理出错
    if (Math.random() > 0.7) {
      console.log("error happens in B");
      throw new error('我知道', callback());
    }
    else {
      $('#message').text('我不知道').show();
    }
  }
  catch (err) {
    $('#message').text(err.message).show();
  }
}

function cHandler(callback, ajaxstate) {
  var text = $('#C').find('span');
  try {
    text.text('...').show();
    text.parent().attr('class', 'button disalbed');
    var number = $.ajax({url: '/rand', context: text, success: function() {
      //上一个成功处理
      if (ajaxstate() != null) {
        console.log("The number is " + number.responseText);
        $(this).text(number.responseText);
        callback(number.responseText); // 求和
        $('#C').trigger('done'); // 触发done
      }
    }});
    // 传入参数更新
    console.log("save the present number" + number);
    ajaxstate(number);

    // 处理出错
    if (Math.random() > 0.7) {
      console.log("error happens in C");
      throw new error('你知道', callback());
    }
    else {
      $('#message').text('你不知道').show();
    }
  }
  catch (err) {
    $('#message').text(err.message).show();
  }
}

function dHandler(callback, ajaxstate) {
  var text = $('#D').find('span');
  try {
    text.text('...').show();
    text.parent().attr('class', 'button disalbed');
    var number = $.ajax({url: '/rand', context: text, success: function() {
      //上一个成功处理
      if (ajaxstate() != null) {
        console.log("The number is " + number.responseText);
        $(this).text(number.responseText);
        callback(number.responseText); // 求和
        $('#D').trigger('done'); // 触发done
      }
    }});
    // 传入参数更新
    console.log("save the present number" + number);
    ajaxstate(number);

    // 处理出错
    if (Math.random() > 0.7) {
      console.log("error happens in D");
      throw new error('他知道', callback());
    }
    else {
      $('#message').text('他不知道').show();
    }
  }
  catch (err) {
    $('#message').text(err.message).show();
  }
}

function eHandler(callback, ajaxstate) {
  var text = $('#E').find('span');
  try {
    text.text('...').show();
    text.parent().attr('class', 'button disalbed');
    var number = $.ajax({url: '/rand', context: text, success: function() {
      //上一个成功处理
      if (ajaxstate() != null) {
        console.log("The number is " + number.responseText);
        $(this).text(number.responseText);
        callback(number.responseText); // 求和
        $('#E').trigger('done'); // 触发done
      }
    }});
    // 传入参数更新
    console.log("save the present number" + number);
    ajaxstate(number);

    // 处理出错
    if (Math.random() > 0.7) {
      console.log("error happens in E");
      throw new error('才不怪', callback());
    }
    else {
      $('#message').text('才怪').show();
    }
  }
  catch (err) {
    $('#message').text(err.message).show();
  }
}

function bubbleHandler(callback) {
  try {
    var presentSum = callback();
    $('#result').text(presentSum).show();

    // 处理出错
    if (Math.random() > 0.7) {
      console.log("error happens in bigbubble");
      throw new error('楼主异步调用战斗力感人，目测超过', callback());
    }
    else {
      $('#message').text('楼主异步调用战斗力感人，目测不超过' + presentSum).show();
    }
  }
  catch (err) {
    $('#message').text(err.message + err.currentSum).show();
  }
}