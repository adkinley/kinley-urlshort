'use strict';

var _ = require('lodash');
var New = require('./new.model');
var validUrl = require('valid-url');
// Get list of news
exports.index = function(req, res) {
  New.find(function (err, news) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(news);
  });
};


function stripBaseFromString(base, original) {
  return original.replace(base,"");
}
// Get a single new
exports.show = function(req, res) {
  var baseUrl = req.baseUrl+"/";
  var originalUrl = req.originalUrl;
    var remoteUrl = stripBaseFromString(baseUrl, originalUrl);
    if (validUrl.isWebUri(remoteUrl)) {
      New.create({"baseUrl":remoteUrl}, function(err, item) {
        if (err) {
          return res.status(401).send("Unable to generate shortUrl");
        }
//        return res.status(200).json(item);
     return res.send("<a href='"+remoteUrl+"'' target='_blank'>localhost:9000/" + item.shortUrl+"</a>");
     });
 
    }
    else
      return res.status(401).send("Invalid Url");


};

// Creates a new new in the DB.
exports.create = function(req, res) {
  New.create(req.body, function(err, item) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(item);
  });
};

// Updates an existing new in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  New.findById(req.params.id, function (err, item) {
    if (err) { return handleError(res, err); }
    if(!item) { return res.status(404).send('Not Found'); }
    var updated = _.merge(item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(item);
    });
  });
};

// Deletes a new from the DB.
exports.destroy = function(req, res) {
  New.findById(req.params.id, function (err, item) {
    if(err) { return handleError(res, err); }
    if(!item) { return res.status(404).send('Not Found'); }
    item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}