var dash = require('rethinkdbdash');
var config = require('../config/config');

var r;

module.exports = function(options) {
  if(!r) {
    options = options || config.rethink;
    r = dash(options);
  }
  return r;
};
