'use strict';

const auth = require('feathers-authentication');
const local = require('feathers-authentication-local');
const jwt = require('feathers-authentication-jwt');

module.exports = function() {
  const app = this;

  app.configure(auth(app.get('auth')))
    .configure(jwt())
    .configure(local());

  app.service('authentication').hooks({
    before: {
      create: [
        auth.hooks.authenticate(['jwt', 'local']),
      ],
      remove: [
        auth.hooks.authenticate('jwt')
      ]
    }
  });
};
