var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var mongoURI = process.env.MONGOURI || require('./config.js').mongoURI;
var albumRouter = require('./server/routers/album.router.js');
var mongoose = require('mongoose');
mongoose.connect(mongoURI);


server.use(albumRouter);


server.listen(port, function(){
  console.log('Now listening on port...', port);
