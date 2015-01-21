var assert = require('assert');
var User = require('../models/user');
var r = require('../utils/rethinkdb')({db: 'test'});
require('co-mocha');

describe('User Model testing', function(){
  beforeEach(function *(){
    yield r.table('users')
      .delete()
      .run();
  });

  it('should create a user', function *(){
    var user = new User();
    assert.equal(typeof user, 'object');
  });

  it('should store properties passed when instantiated', function *(){
    var userName = "james";
    var user;
    user = new User({userName: userName});
    assert.equal(user.userName, userName);
  });

  it('should assign an id after being saved', function *(){
    var userName = "james";
    var password = "secret";
    var user = new User({
      userName: userName,
      password: password
    });
    yield user.save();
    assert(user.id);
  });

  it('should find a saved user by user name', function *(){
    var userName = "james";
    var password = "secret";
    var user = new User({
      userName: userName,
      password: password
    });
    yield user.save();
    var foundUser = yield User.findByUserName(userName);
    assert(foundUser.userName, userName);
  });

  it('should have a hashed password after being saved', function *(){
    var userName = "james";
    var password = "secret";
    var user = new User({
      userName: userName,
      password: password
    });
    yield user.save();
    assert.notEqual(user.password, password);
  });

  it('should validate a correct password', function *(){
    var userName = "james";
    var password = "12345";
    var user = new User({
      userName: userName,
      password: password
    });
    yield user.save();
    assert(yield user.isPassword(password));
  });

  it('should validate an incorrect password', function *(){
    var userName = "james";
    var password = "123456";
    var user = new User({
      userName: userName,
      password: password
    });
    yield user.save();
    assert(!(yield user.isPassword('wrongpassword')));
  });
});
