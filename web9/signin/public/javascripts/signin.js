$(function() {
  var str = 'Please input your ';
  // 生成输入提示
  $('input:not(.button)').each(function(i) {
    if ($(this).attr('type') == 'password') {
      $(this).attr('type', 'text');
    }
    var temp = str + $(this).attr('id');
    $(this).val(temp);
    $(this).addClass("tip");
  });
  // 点击输入框，输入提示消除
  $('input:not(.button)').focus(function() {
    if ($(this).val().indexOf("Please") != -1) {
      if ($(this).val().indexOf('password') != -1) {
        $(this).attr('type', 'password');
      }
      $(this).val("");
      $(this).removeClass("tip");
    }
  });

  // 若输入框中内容为空，重新生成输入提示
  $('input:not(.button)').blur(function() {
    if ($(this).val() == '') {
      if ($(this).attr('type') == 'password') {
        $(this).attr('type', 'text');
      }
      var temp = str + $(this).attr('id');
      $(this).val(temp);
      $(this).addClass("tip");
    }
  });

  // 显示密码
  $(".eye").mousedown(function(){  
    if ($(this).parent().find('input').attr('type') == 'password')
      $(this).parent().find('input').attr("type", "text");  
  });  
  $(".eye").mouseup(function(){
    if ($(this).parent().find('input').attr('type') == 'text' && $(this).parent().find('input').val().indexOf('Please') == -1)  
      $(this).parent().find('input').attr("type", "password");  
  });

  // 重写reset方法
  $('input.button.reset').click(function() {
    $('input:not(.button)').each(function(i) {
      if ($(this).attr('type') == 'password') {
        $(this).attr('type', 'text');
      }
      var temp = str + $(this).attr('id');
      $(this).val(temp);
      $(this).addClass("tip");
      $(this).parent().find('.errormessage').text('').hide();
    });
  });
});