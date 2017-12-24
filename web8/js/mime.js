"use strict";

const path = require('path');

const mimeTypes = {
  'html': "text/html",
  'css': "text/css",
  'js': "text/javascript",
  'png': "image/png",
};

const lookup = (pathname) => {
  let ext = path.extname(pathname);
  ext = ext.split('.').pop();
  return mimeTypes[ext];
}

// share to server
module.exports = {
  lookup
};