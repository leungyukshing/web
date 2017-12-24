/*将validator封装成模块*/
var validator = {
  form: {
    username: {
      status: false,
      errorTips: "6~18位英文字母、数字或下划线，必须以英文字母开头"
    },
    studentid: {
      status: false,
      errorTips: "8位数字，不能以0开头"
    },
    phone: {
      status: false,
      errorTips: "11位数字，不能以0开头"
    },
    email: {
      status: false,
      errorTips: "请输入正确的邮箱"
    }
  },
  //四个辅助函数
  isUsernameValid: function(username) {
    var UsernameReg = /^[a-zA-Z][a-zA-Z0-9_]{5,17}$/;
    return this.form.username.status = UsernameReg.test(username);
  },

  isStudentidValid: function(studentid) {
    var StudentidReg = /^[1-9]\d{7}$/;
    return this.form.studentid.status = StudentidReg.test(studentid);
  },

  isPhoneValid: function(phone) {
    var PhoneReg = /^[1-9]\d{10}$/;
    return this.form.phone.status = PhoneReg.test(phone);
  },

  isEmailValid: function(email) {
    var EmailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return this.form.email.status = EmailReg.test(email);
  },

  //主要用于判断四个分别是否合法的函数
  isFieldValid: function(fieldname, value) {
    var captureField = fieldname[0].toUpperCase() + fieldname.slice(1, fieldname.length);
    return this["is" + captureField + "Valid"](value);
  },

  //用于检查表单整体是否合法
  isFormValid: function() {
    return this.form.username.status && this.form.studentid.status && this.form.phone.status && this.form.email.status;
  },

  //获取错误提示反馈在界面
  getErrorTips: function(fieldname) {
    return this.form[fieldname].errorTips;
  },

  isInfoUnique: function(user, database, fieldname) {
    for(var key in database) {
      // 找到重复
      console.log(database[key][fieldname]);
      if (database.hasOwnProperty(key) && database[key][fieldname] == user[fieldname])
        return false;
    }

    return true;
  }
}

//share to server
if (typeof module == 'object') {
  module.exports = validator;
}