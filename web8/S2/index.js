var number;
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

  if (number != null)
    number.abort();
}

function resetButtons() {
  $('li').each(function() {
    $(this).find('span').text('').hide();
    $(this).attr('class', 'button abled');
  });
  $('.apb').attr('class','apb');
  $('#info-bar').attr('class', 'button disabled');
  $('#result').text('').hide();
}

function robot(callback) {
  $('.apb').unbind('click');
  $('.apb').attr('class','no apb');
  //手动调用第一个callback
  callback[0]();
}

// 生成每一个button的callback
function Callback() {
  var callback = [];
  var all_buttons = $('li');
  for (var i = 0; i < all_buttons.length; i++) {
    callback[i] = function(i) {
      return function() {
        var text = $(all_buttons[i]).find('span');
        $('li').each(function() {
          $(this).attr('class', 'button disabled');
        });
        $(all_buttons[i]).attr('class', 'button abled');

        text.text('...').show();
        number = $.ajax({url: '/rand', context: text, success: function() {
          if (number != null) {
            $(this).text(number.responseText);
            $(this).parent().attr('class', 'button disabled');
            callback[i + 1]();
          }
        }});
      };
    }(i);
  }
  callback[5] = function() {
    $('#info-bar').attr('class', 'button abled');
    getSum();
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
