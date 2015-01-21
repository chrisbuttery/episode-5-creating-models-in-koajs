#[Episode 5 – Creating Models in Koajs](http://knowthen.com/episode-5-creating-models-in-koajs/)

### This code is created from [this screencast](http://knowthen.com/episode-5-creating-models-in-koajs/) from [knowthen.com](http://knowthen.com/ "KnowThen")

In this episode we will learn to **create models** in **koajs**, more **specifically** we’ll create a **user model**.

First we’ll create a _package.json_ file to store our metadata using [npm init](https://docs.npmjs.com/cli/init "npm init").

When coding we will use a **Test First** approach to create our user model, using [mochajs](http://mochajs.org/ "mocha").

Then we’ll use [RethinkDB](http://rethinkdb.com/ "RethinkDB") as we did in the [last episode](http://knowthen.com/episode-4-writing-middleware-in-koajs/ "Last Episode") to _store_ our _user records_.

To **create** our _database_ and _users_ table we’ll create **migrations** using the npm package [migrate](https://github.com/tj/node-migrate "node-migrate").

Then we’ll **avoid** committing a **BIG** developer **SIN** (storing passwords in clear text) by using [bcrypt](http://en.wikipedia.org/wiki/Bcrypt "bycrypt") to properly _hash_ our users _passwords_.

When we implement the password hashing we’ll use the [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty "Object.defineProperty") method a _cool_ way to **create properties** that have “getter” and “setter” methods... except we get to use them with simpler **dot notation**... user.password = ‘mysecret’

Lastly we’ll look at how to **authenticate** a user after hashing their password with bcrypt.

To run this demo, enter:

```bash
$ npm install
```

_Make sure RethinkDB is running_

```bash
$ npm test
```
