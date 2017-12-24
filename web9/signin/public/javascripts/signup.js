$(function() {
  var str = "Please input your ";

  // 生成输入提示
  $('input:not(.button)').each(function(i) {
    // 若用户注册失败，保留信息，无需生成提示
    if ($(this).val() == '') {
      if ($(this).attr('type') == 'password') {
        $(this).attr('type', 'text');
      }
      var temp = str + $(this).attr('id');
      $(this).val(temp);
      $(this).addClass("tip");
    }
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

  // 客户端检验（实时反馈）
  $('input:not(.button)').blur(function() {
    if ($(this).val() == '' || validator.isFieldValid(this.id, $(this).val())) {
      $(this).parent().find('.errormessage').text('').hide();
      if ($(this).val() == '') {
        if ($(this).attr('type') == 'password') {
          $(this).attr('type', 'text');
        }
        var temp = str + $(this).attr('id');
        $(this).val(temp);
        $(this).addClass("tip");
      }
    }
    else {
      // show wrong message
      $(this).parent().find('.errormessage').text(validator.form[this.id].errorTips).show();
    }
  });

  // 表单提交检验
  $('input.submit').click(function() {
    // judge whether the whole form is valid
    $('input:not(.button)').blur();
    if (!validator.isFormValid())
      return false;
  });

  //重写reset方法
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
  
  // 密码明文显示
  $(".eye").mousedown(function(){  
    if ($(this).parent().find('input').attr('type') == 'password')
      $(this).parent().find('input').attr("type", "text");  
  });  
  $(".eye").mouseup(function(){
    if ($(this).parent().find('input').attr('type') == 'text' && $(this).parent().find('input').val().indexOf('Please') == -1)  
      $(this).parent().find('input').attr("type", "password");  
  });  
});