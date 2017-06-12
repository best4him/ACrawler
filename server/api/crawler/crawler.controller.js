/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Link = require('./crawler.model.js');

// Get list of things
exports.index = function(req, res) {
  Link.find(function (err, links) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(links);
  });
};

// Get a single thing
exports.show = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.status(404).send('Not Found'); }
    return res.json(link);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Link.create(req.body, function(err, link) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(link);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Link.findById(req.params.id, function (err, link) {
    if (err) { return handleError(res, err); }
    if(!link) { return res.status(404).send('Not Found'); }
    var updated = _.merge(link, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(link);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Link.findById(req.params.id, function (err, link) {
    if(err) { return handleError(res, err); }
    if(!link) { return res.status(404).send('Not Found'); }
    link.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

exports.searchSocial = function(req, res) {
    console.log("DADADADADADA");


  var casper = require('casper').create({
    verbose: true,
    logLevel: "info",
    pageSettings: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
  });

  var url = 'http://twitter.com/';

  var twitterId = req.body.twitterId;
  var email = req.body.email;
  var auth = req.body.password;
  var searchKey = req.body.query;

  casper.start(url  + twitterId, function() {
    this.echo(this.getTitle());
    console.log('Starting location is ' + this.getCurrentUrl());
  });

  casper.then(function() {
    this.fillSelectors('form.js-front-signin', {
      'input[name="session[username_or_email]"]': email,
      'input[name="session[password]"]': auth
    }, true);
  });

  casper.then(function() {
    console.log('Authentication ok, new location is ' + this.getCurrentUrl());
    // Log Error if we hit the captcha
    if (/captcha/.test(this.getCurrentUrl())) {
      console.log('Please login and confirm your captcha.');
    }
  });

  casper.then(function() {
    this.fill('form#global-nav-search', {
      q: searchKey
    }, true);
  });

  casper.waitForSelector('.trends-inner', function() {
    console.log('.trend.location' + ' is loaded.');
  });

  casper.then(function() {
    this.emit('results.log');
  });

  casper.on('results.log', function() {
    this.captureSelector('/results/twitPic.png', 'div.stream-container');
    res.status(200).send("Success");
  });

};
function handleError(res, err) {
  return res.status(500).send(err);
}
