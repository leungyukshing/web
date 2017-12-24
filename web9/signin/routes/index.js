var express = require('express');
var validator = require('../public/javascripts/validator');


module.exports = function(db) {
	var router = express.Router();
	var url = require('url');
	var path = require('path');
	var querystring = require('querystring');
	var userController = require('../modules/userController')(db);
	var users = db.collection('users');

	/*处理通过url访问detail的情况*/
	router.get('/', function(req, res, next) {
		console.log(req.session.user);
		// req.session.user是自己
		// username 是试图通过url访问的用户
		var username = querystring.parse(url.parse(req.url).query).username;
		console.log(username);
		// 当前没有已登录用户
		if (!req.session.user) {
			res.redirect('/signin');
		}
		// 用户存在并且是当前用户,跳转到本用户详情页面(6.a)
		else if (username && username == req.session.user.username) {
			res.redirect('/detail');
		}
		// 用户存在但不是当前用户，跳转到本用户详情并给出错误提示(4.ab)
		else if (username && username != req.session.user.username) {
			res.render('detail', { title: '详情',user: req.session.user, error: '只能够访问自己的数据'});
		}
		// 用户不存在,当前用户存在
		else if (!username && req.session.user) {
			res.redirect('/detail');
		}
		else {
			res.redirect('/signin');
		}
	});

	/*GET 登录 page. */
	router.get('/signin', function(req, res, next) {
		// 若已有用户处于登录状态，则显示其详情页面
		if (req.session.user) {
			res.redirect('/detail');
		}
		// 若没有用户处于登录状态，则显示登录页面
		else {
			res.render('signin', { title: '登录'});
		}
	});

	/*POST 登录 page. */
	router.post('/signin', function(req, res, next) {
		var user = req.body;
		// 根据用户姓名及其密码寻找用户
		userController.findUser(req.body.username, req.body.password)
				.then(function(user) {
					// 删除密码，增加安全性
					delete user.password;
					// 成功登陆，跳转至详情页面
					req.session.user = user;
					req.session.cookie.maxAge = 600000;
					res.redirect('/detail');
				}).catch(function(error) {
					// 登录失败，重新填写信息
					res.render('signin', { title: '登录',error: '错误的用户名或者密码'});
				});
	});

	/*GET 退出 page. */
	router.get('/signout', function(req, res, next) {
		delete req.session.user
		res.redirect('/signin');
	});

	/*GET 注册 page. */
	router.get('/regist', function(req, res, next) {
	  res.render('signup', { title: '注册', user: {} });
	});

	/*POST 注册 page. */
	router.post('/regist', function(req, res, next) {
		var user = req.body;
	  userController.validateUser(user).then(function() {
	  	// 删除密码增加安全性
	  	delete user.password;
	  	delete user.repeatpassword;
	  	// 注册成功，将该用户标记为当前用户
	  	req.session.user = user;
	  	req.session.cookie.maxAge = 600000;
	  	res.redirect('/detail');
	  	console.log("注册用户成功");
	  }).catch(function(error) {
	  	console.log("this is user", user);
	  	delete user.password;
	  	delete user.repeatpassword;
	  	res.render('signup', { title: '注册', user: user, error: error});
	  	console.log(error);
	  })
	});

	// 处理登出操作
	router.get('/signout', function(req, res, next) {
		delete req.session.user;
		res.redirect('/signin');
		console.log("登出");
	});
	
	/* GET 详情 page. */
	router.get('/detail', function(req, res, next) {
	  // 若存在当前用户，则展示用户信息
	  if (req.session.user) {
	  	console.log("展示当前用户");
	  	console.log(req.session.user);
	  	res.render('detail', { title: '详情', user: req.session.user});
	  }
	  // 若不存在当前用户，则跳转至注册页面
	  else {
	  	console.log("当前用户不存在");
	  	res.redirect('/signup');
	  }
	});

	return router;
}