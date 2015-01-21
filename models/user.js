var _ = require('lodash');
var r = require('../utils/rethinkdb')();
var bcrypt = require('co-bcryptjs');

var SCHEMA = ['userName', 'password'];
var TABLE = 'users';

var User = function(properties) {
  this.init();
  _.assign(this,properties);
}

module.exports = User;

User.findByUserName = function *(userName){
  var user;
  var criteria = {};
  criteria.userName = userName;

  var result = yield r.table(TABLE)
    .filter(criteria)
    .run();

  if (result && result.length >= 1) {
    user = new User(result[0]);
  }
  return user;
};

User.prototype.save = function *(){
  var result;
  var data = _.pick(this, SCHEMA);
  yield this.hashPassword();

  if (this.id){
    result = yield r.table(TABLE)
      .get(this.id)
      .update(data)
      .run();
  }
  else {
    result = yield r.table(TABLE)
      .insert(data)
      .run();

    if (result && result.inserted === 1){
      this.id = result.generated_keys[0];
    }
  }
};

User.prototype.hashPassword = function *() {
  if (this.newPassword){
    this.newPassword = false;
    var salt = yield bcrypt.genSalt(10);
    this.password = yield bcrypt.hash(this.password, salt);
  }
};

User.prototype.init = function () {
  Object.defineProperty(this, 'password', {
    get: function(){
      return this._password;
    },
    set: function(password){
      this._password = password;
      this.newPassword = true;
    }
  })
};

User.prototype.isPassword = function *(password) {
  return yield bcrypt.compare(password, this.password);
};
