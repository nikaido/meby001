'use strict';

const request = require('request');

/**
 * Test
 */
var main = function(){
  let http = require('http');
  let connect = require('connect');
  let serveStatic = require('serve-static');
  let app = connect().use(serveStatic('app'));
  http.createServer(app).listen(8080);
}


main();
