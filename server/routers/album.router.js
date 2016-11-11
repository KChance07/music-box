var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Album = require('../models/album.model.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true}));

router.get('/albums', function(req, res){
  Album.find({}, function(err, foundAlbums){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      albums: foundAlbums
    });
  });
});
router.get('/albums/:id', function(req, res){
  Album.find({ _id: req.params.id }, function(err, foundAlbum){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      album: foundAlbum
    });
  });
});
router.post('/albums', function(req, res){
  var album = new Album({
    title: req.body.title,
    artist: req.body.artist,
    releaseDate: new Date(req.body.releaseDate),
    isGood: new Boolean(req.body.isGood)
  });
  album.save(function(err){
    if(err){
      res.status(500).json({
        err: err
     });
    }
    res.status(201).json({
      msg: 'successfully created new album'
    });
  });
});
router.put('/albums/:id', function(req, res){
  Album.findOneAndUpdate({_id: req.params.id}, req.body, function(err, oldAlbum){
    if(err){
      res.status(500).json({
        err: err
     });
    }
    res.status(200).json({
      oldAlbum: oldAlbum
    });
 });
});
router.delete('/albums/:id', function(req, res){
  Album.findOneAndRemove({_id: req.params.id}, function(err, deletedAlbum){
    if(err){
      res.status(500).json({
        err: err
      });
    }
    res.status(200).json({
      deletedAlbum: deletedAlbum
    });
  });
});

module.exports = router;
