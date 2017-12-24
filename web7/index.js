$(function() {
  var str = ["Please input your name", "Please input your student ID", "Please input your phone number", "Please input your email address"]

  // 判断是否需要保留输入框内容
  if($('#uniquemessage').size() > 0) {
    console.log("unique Error! Don't clear info!");
    console.log($('#mark #usernamemark').text());
    console.log($('#mark #studentidmark').text());
    console.log($('#mark #phonemark').text());
    console.log($('#mark #emailmark').text());

    var info = [];
    info.push($('#mark #usernamemark').text());
    info.push($('#mark #studentidmark').text());
    info.push($('#mark #phonemark').text());
    info.push($('#mark #emailmark').text());
    console.log(info);

    $('input:not(.button)').each(function(i) {
      $(this).val(info[i]);
    });
  }
  else {
    $('input:not(.button)').each(function(i) {
      $(this).val(str[i]);
      $(this).addClass("tip");
    });
  }

  /*当用户离开输入字段时对其进行验证并显示错误信息：*/
  $('input:not(.button)').blur(function() {
    if (validator.isFieldValid(this.id, $(this).val())) {
      $(this).parent().find('.errormessege').text('').hide();
    }
    else {
      $(this).parent().find('.errormessege').text(validator.form[this.id].errorTips).show();
    }
  });

  $('input.button.submit').click(function() {
    $('input:not(.button)').blur();
    // 表单有错，不提交
    if (!validator.isFormValid()) {
      console.log("the form is not submited");
      return false;
    }
  });

  $('input.button.reset').click(function() {
    $('input:not(.button)').each(function(i) {
      $(this).val(str[i]);
      $(this).addClass("tip");
      $(this).parent().find('.errormessege').text('').hide();
    });
    if ($('#uniquemessage').size() > 0)
      $("div#uniquemessage").remove();
  });

  $('input:not(.button)').focus(function() {
    if ($(this).val().indexOf("Please") != -1) {
      $(this).val("");
      $(this).removeClass("tip");
    }
  });

});