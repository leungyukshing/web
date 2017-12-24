var validator = require('../public/javascripts/validator');
var bcrypt = require('bcryptjs');


module.exports = function(db) {
  var users = db.collection('users');
  var userController = {
    // 查询用户函数(根据username和password)
    findUser: function(username, password) {
      return users.findOne({username:username}).then(function(user) {
        if (user) { 
          if (bcrypt.compareSync(password, user.password)) { // 用户存在且密码正确，允许登录
            return Promise.resolve(user);
          }
          else { // 用户存在但密码错误，重新填写表单
            //var error = {username = "", password = "错误"};
            return Promise.reject('错误的用户名或者密码');
          }
        }
        else { // 用户不存在
          //var error = {username = "", password = ""};
          return Promise.reject('用户不存在');
        }
      });
    },


    // 校验用户信息(客户端和服务端)
    validateUser: function(user) {
      // 先校验用户信息的格式是否规范(使用validator的方法)
      var formatErrors = validator.getFortmatErrors(user);
      return new Promise(function(resolve, reject) {
        formatErrors ? reject(formatErrors) : resolve(user);
      }).then(function(user) {
        // 其次校验用户信息是否重复(密码除外)
        return users.findOne({$or : queryItem(user)}).then(function(existedUser){
          return existedUser ? Promise.reject("信息重复") : Promise.resolve(user).then(function() {
            var salt = bcrypt.genSaltSync(10);
            var hash_password = bcrypt.hashSync(user.password, salt);
            var hash_repeatpassword = bcrypt.hashSync(user.repeatpassword, salt);
            user.password = hash_password;
            user.repeatpassword = hash_repeatpassword;
            return users.insert(user);
          });
        });
      });
    }
  };
  return userController;

  // 得到一个用户除密码外的所有信息
  function queryItem(user) {
    var array = [];
    for (item in user) {
      if (item != 'password' && item != 'repeatpassword') {
        var obj = {};
        obj[item] = user[item];
        array.push(obj);
      }
    }
    return array;
  }
}