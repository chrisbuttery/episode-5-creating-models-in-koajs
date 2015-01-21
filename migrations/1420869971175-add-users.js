var r = require('../utils/rethinkdb')();
var TABLE = 'users';

exports.up = function(next){
  r.tableCreate(TABLE)
  .run(next);
};

exports.down = function(next){
  r.tableDrop(TABLE)
  .run(next);
};
