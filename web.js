var express = require('express');

var fs = require('fs');
var Buffer = require('buffer').Buffer;

var buffer = new Buffer(100);

fs.open("index.html", 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer.toString('utf-8', 0, num));
    });


    var app = express.createServer(express.logger());

    app.get('/', function(request, response) {
      response.send(buffer.toString('utf-8', 0, num));
    });

    var port = process.env.PORT || 5000;
    app.listen(port, function() {
      console.log("Listening on " + port);
    });

});
