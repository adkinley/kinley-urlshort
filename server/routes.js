/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');
var DB = require('./api/new/new.model')
module.exports = function(app) {

  // Insert routes below
  app.use('/new', require('./api/new'));
  app.use('/api/things', require('./api/thing'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html

  // all other routes could be a shortened URL
  app.route('/*')
    .get(function(req, res) {
      //console.log(req);
      var url = req.originalUrl;
      url = url.replace("/","");
      DB.findOne({'shortUrl':url}, function (err, item) {
        if (err) {
          res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
        }
        else {

          res.redirect(item.baseUrl);
        }
      });
//      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
