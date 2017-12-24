var random_number;
$(function() {
  $('#at-plus-container').hover(initialize, clear);
});

function initialize() {
  resetButtons();
  addClickEvent();
}

function clear() {
  resetButtons()
  removeClickEvent();

  /*如果存在异步请求未完成，则中断*/
  if (random_number != null)
    random_number.abort();
}

function addClickEvent() {
  $("#control-ring").click(handleClickEvent);
  $("#info-bar").click(handleSumEvent);
}


function resetButtons() {
  $('li').each(function() {
    $(this).find('span').text('').hide();
    $(this).attr('class', 'button abled');
  });
  $('#result').text('').hide();
  $('#info-bar').attr('class', 'button disabled');
}
function removeClickEvent() {
  $("#control-ring").off('click', handleClickEvent);
  $("#info-bar").off('click', handleSumEvent);
}

function handleClickEvent(event) {
  // show red bubble and disable other buttons 
  // get random number from server
  // show the number in red bubble
  // disable itself
  // ablize other buttons
  if ($(event.target).attr('class') == 'random')
    return;
  if ($(event.target).find('span').text() == '') {
    $('li').each(function() {
      if ($(this).find('span').text() == '') {
        $(this).attr('class', 'button disabled');
      }
    $(event.target).attr('class', 'button abled');
    });
    getNumber.call(event.target);
  }
}

function getNumber() {
  var para = $(this).find('span');
  // stop other buttons to click
  $('#control-ring').off('click', handleClickEvent);

  para.text("...").show();
  random_number = $.ajax({url: '/rand', context: para, success: function() {
    $('#control-ring').find('li').each(function() {
      if ($(this).find('span').text() == '') {
        $(this).attr('class', 'button abled');
      }
    });
    
    console.log("The number is " + random_number.responseText);
    $(this).text(random_number.responseText);
    $(this).parent().attr('class', 'button disabled');
    $('#control-ring').click(handleClickEvent);

    if (isAllGetRandomNumber()) {
      $("#info-bar").attr('class', 'button abled');
      console.log("Ready to calculate!");
    }
  }});
}

function handleSumEvent(event) {
  // change css and show result
  if (isAllGetRandomNumber() && $('#result').text() == '') {
    var sum = 0;
    $('#control-ring').find('li').each(function() {
      sum += parseInt($(this).find('span').text());
    });
    console.log("The sum is: " + sum);
    $('#result').text(sum).show();
    // disable itself
    $(event.target).attr('class', 'button disabled');
  }
}

function isAllGetRandomNumber() {
  var isOk = true;
  $('#control-ring').find('li').each(function() {
      if ($(this).find('span').text() == '') {
        isOk = false;
      }
  });
  return isOk;
}