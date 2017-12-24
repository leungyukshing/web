var number = [];
$(function() {
  $('#at-plus-container').hover(initialize, clear);
});

function initialize() {
  resetButtons();

  var callback = Callback();
  // 为@+添加点击事件
  $('.apb').click(robot.bind(null, callback));
}

function clear() {
  resetButtons();
  $('.apb').unbind('click');

  for (var i = 0; i < number.length; i++) {
    if (number[i] != null)
      number[i].abort();
  }
}

function resetButtons() {
  $('li').each(function() {
    $(this).find('span').text('').hide();
    $(this).attr('class', 'button abled');
  });
  $('#info-bar').attr('class', 'button disabled');
  $('.apb').attr('class','apb');
  $('#result').text('').hide();
}

function robot(callback) {
  $('.apb').unbind('click');
  $('.apb').attr('class','no apb');
  //手动调用所有callback
  for (var i = 0; i < callback.length; i++) {
    callback[i]();
  }
}

// 生成每一个button的callback
function Callback() {
  var callback = [];
  var all_buttons = $('li');
  for (var i = 0; i < all_buttons.length; i++) {
    callback[i] = function(i) {
      return function() {
        var text = $(all_buttons[i]).find('span');
        text.text('...').show();
        // 确保同时点击的效果
        var tmp = Random();
        number[i] = $.ajax({url: tmp + '/rand', context: text, success: function() {
          if (number[i] != null) {
            $(this).text(number[i].responseText);
            $(this).parent().attr('class', 'button disabled');
            if (isAllGetRandomNumber()) {
              getSum();
            }
          }
        }});
      };
    }(i);
  }
  return callback;
}

function getSum() {
  var sum = 0;
  $('li').each(function() {
    sum += parseInt($(this).find('span').text());
  });
  console.log("The sum is " + sum);
  $('#result').text(sum).show();
  $('#info-bar').attr('class', 'button disabled');
}

function isAllGetRandomNumber() {
  var isOk = true;
  $('#control-ring').find('li').each(function() {
      if ($(this).find('span').text() == '' || $(this).find('span').text() == '...') {
        console.log("failed");
        isOk = false;
      }
  });
  return isOk;
}

function Random() {
  return Math.round(Math.random() * 100);
}