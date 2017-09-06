'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var LineByLineReader = require('line-by-line');


var app = express();
var server = require("http").Server(app);
var io = require('socket.io')(server);

module.exports = app; // for testing

app.use('/swagger-ui', express.static(__dirname + '/swagger-ui'));
app.use('/swagger', express.static(__dirname + '/api/swagger'));


var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  server.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://localhost:' + port);
  }
});

io.on('connection', function (socket) {

  console.log('connection');
  //

  var timeoutId = null;
  //
  socket.on('unSubLineData', function () {
    if (!timeoutId) {
      return;
    }
    clearTimeout(timeoutId);
  });

  socket.on('subLineData', function (symbol) {

    console.log('this....');

    var lr = new LineByLineReader('./file/file-0.txt');
    
    lr.on('error', function (err) { });
    
    lr.on('line', function (line) {

      var data = {};
      var arr = line.split(',');
      arr.forEach(function (d, i) {
        var arrItem = d.split(':');
        console.log('tem...', arrItem);
        data[arrItem[0]] = /\D/g.test(arrItem[1]) ? arrItem[1] : parseInt(arrItem[1]);
      });

      console.log('data...', data);
  
      socket.emit('updateLineData', JSON.stringify(data));

      lr.pause();
      
      timeoutId = setTimeout(function () {
          lr.resume();
      }, 1000);
    });
    
    lr.on('end', function () { });
  });

  //
  var intervalId = null;
  //
  socket.on('unSubPieData', function () {

    console.log('....', intervalId);
    if (!intervalId) {
      return ;
    }
    clearInterval(intervalId);
  });
  //
  socket.on('subPieData', function (symbol) {
    console.log('subPieData...');
    intervalId = setInterval(function () {
      var data = {
        N1: Math.round(500 * Math.random()),
        N2: Math.round(500 * Math.random()),
        N3: Math.round(500 * Math.random()),
        N4: Math.round(500 * Math.random()),
        NUM: Math.round(600 * Math.random()),
      };

      socket.emit('updatePieData', JSON.stringify(data));
    }, 1000);
  });
});
