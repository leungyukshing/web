var http = require('http');
var fs = require('fs');
var urltool = require('url');
var querystring = require('querystring');
var validator = require('./validator');
var users = {}

var server = http.createServer(function (request, response) {
  //分析http请求的方法
  if (request.method === 'POST')
    registUser(request, response);
  else
    sendHtml(request, response);
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');

function registUser(request, response) {
  request.on('data', function(chunk) {
      //chunk是提交的资料
      var user = parseUser(chunk.toString());
      console.log("当前处理用户：", user);
      console.log("所有用户：", users);
      var info = checkUnique(user);
      
      if (!!info && info.length > 0) {
        console.log("用户注册失败: " + info);
        showSignupPage(request, response, user, info);
      }
      else {
        users[user.username] = user;
        console.log("user parsed is ", user);

        //跳转至新的页面
        response.writeHead(301, {Location: '?username=' + user.username});
        console.log("用户注册成功");
        response.end();
      }
  });
}

function checkUnique(user) {
  var errorMessage = [];
  for (var key in user) {
    if (!validator.isInfoUnique(user, users, key)) {
      var str = key + " is not unique!";
      errorMessage.push(str);
    }
  }
  if (errorMessage.length > 0)
    return errorMessage;
}

//解析chunk信息为数组（名字，学号，电话，邮箱）
function parseUser(chunkstring) {
  params = querystring.parse(chunkstring);
  //console.log(params);
  return params;
}

function sendHtml(request, response) {
  var username = parseUserName(request);
  if (!username || !isRegistedUser(username))
    showSignupPage(request, response);
  else
    showDetials(request, response, users[username].username);
}

function parseUserName(request) {
  return querystring.parse(urltool.parse(request.url).query).username;
}

function isRegistedUser(username) {
  return !!users[username];
}

function showSignupPage(request, response, user, errorMessage) {
  console.log("登陆页面");
  var url = request.url;
  if (url == '/')
    url = "./index.html";
  else
    url = "." + url;

  fs.readFile(url, function(err, data) {
    if (err) {
      response.writeHead(301, {Location: '/'});
      response.end();
    }
    else if(url.indexOf("html") != -1){
      response.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
      response.write(data);
      if(!!errorMessage && errorMessage.length > 0) {
        response.write("<div id=\"uniquemessage\">")
        var i = errorMessage.length;
        while (i != 0) {
          response.write("<span>");
          response.write(errorMessage[i - 1]);
          response.write("</span>");
          response.write("<br />");
          i--;
        }
        response.write("</div>");
        //mark the user info
        response.write("<div id=\"mark\">");
        response.write("<span id=\"usernamemark\">");
        response.write(user.username);
        response.write("</span>");

        response.write("<span id=\"studentidmark\">");
        response.write(user.studentid);
        response.write("</span>");

        response.write("<span id=\"phonemark\">");
        response.write(user.phone);
        response.write("</span>");

        response.write("<span id=\"emailmark\">");
        response.write(user.email);
        response.write("</span>");
        response.write("</div>");
      }
      response.end();
    }
    else if (url.indexOf("css") != -1) {
      response.writeHead(200, {'content-type': 'text/css;charset=utf-8'});
      response.write(data);
      response.end();
    }
    else if (url.indexOf("js") != -1) {
      response.writeHead(200, {'content-type': 'text/javascript;charset=utf-8'});
      response.write(data);
      response.end();
    }
    else if (url.indexOf("png") != -1) {
      response.writeHead(200, {'content-type': 'image/png'});
      response.write(data);
      response.end();
    }
  })
}

function showDetials(request, response, username) {
  console.log("详情页面");
  var url = request.url;
  if (url.indexOf("username") != -1)
    url = "./detail.html";
  else
    url = "." + url;
  //console.log(url);
  //console.log(username);
  fs.readFile(url, function(err, data) {
    if (err) {
      console.log(err);
      response.writeHead(404, {'content-type': 'text/html;charset="utf-8"'});
      response.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
      response.end();
    }
    else if(url.indexOf("html") != -1){
      response.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
      createDHtml(request, response, users, username);
      response.end();
    }
    else if(url.indexOf("css") != -1){
      response.writeHead(200, {'content-type': 'text/css;charset=utf-8'});
      response.write(data);
      response.end();
    }
    else if(url.indexOf("js") != -1){
      response.writeHead(200, {'content-type': 'text/javascript;charset=utf-8'});
      response.write(data);
      response.end();
    }
    else if (url.indexOf("jpeg") != -1) {
      response.writeHead(200, {'content-type': 'image/jpeg'});
      response.write(data);
      response.end();
    }
  });
}

function createDHtml(request, response, users, username) {
  response.write("<!DOCTYPE \"html\">");
  response.write("<html>");
  response.write("<head>");
  response.write("<meta charset=\"UTF-8\">");
  response.write("<title>Detail Page</title>");
  response.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"detail.css\">");
  response.write("</head>");
  response.write("<body>");
  response.write("<h1>详情</h1>");
  response.write("<div>");
  response.write("<h2>用户详情</h2>");
  response.write("<div id=\"wrapper\">")
  response.write("<div class=\"username\"");
  response.write("<span>用户名：");
  response.write(users[username].username);
  response.write("</span>");
  response.write("</div>")

  response.write("<div class=\"studentid\"");
  response.write("<span>学号：");
  response.write(users[username].studentid);
  response.write("</span>");
  response.write("</div>")

  response.write("<div class=\"phone\"");
  response.write("<span>电话：");
  response.write(users[username].phone);
  response.write("</span>");
  response.write("</div>");

  response.write("<div class=\"email\"");
  response.write("<span>邮箱：");
  response.write(users[username].email);
  response.write("</span>");
  response.write("</div>");

  response.write("</div>");
  response.write("</div>");
  response.write("</body>");
  response.write("</html>");
}