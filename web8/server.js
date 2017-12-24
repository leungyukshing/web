var http = require('http');
var url = require('url');
var fs = require('fs');
var mime = require('./js/mime.js');
// Create a server
http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;
  var type = getType(pathname);

  if (!!type)
    handleNormalPage(request, response, pathname, type);
  else
    handleXml(request, response);
}).listen(3000);

console.log("The server is running on 127.0.0.1:3000");

function getType(pathname) {
  return mime.lookup(pathname);
}

function handleNormalPage(request, response, pathname, type) {
  console.log("Request for " + pathname);
  var file = __dirname + pathname;
  if (fs.existsSync(file)) {
    fs.readFile(file, function(err, data) {
      if (err) {
        response.writeHead(404, {'content-type': 'text/html;charset="utf-8"'});
        response.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
        response.end();
      }
      else {
        response.writeHead(200, {'content-type': type});
        response.write(data);
        response.end();
      }
    });
  }
  else {
    response.writeHead(404, {'content-type': 'text/html;charset="utf-8"'});
    response.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
    response.end();
  }
}

function handleXml(request, response) {
  console.log("GET request");
  var randomTime = 1000 + getRandomNumber(2000);
  var randomNumber = 1 + getRandomNumber(9);
  setTimeout(function() {
    console.log("Return data is: " + randomNumber);
    response.writeHead(200, {'content-type': 'text/plain'});
    response.write("" + randomNumber);
    response.end();
  }, randomTime);
}

function getRandomNumber(high) {
  return Math.round(Math.random() * high);
}