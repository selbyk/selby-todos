'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const common = require('feathers-hooks-common');
const auth = require('feathers-authentication');
const permissions = require('feathers-permissions');

exports.before = {
  all: [
    auth.hooks.authenticate('jwt'),
    common.populate(),
    permissions.hooks.checkPermissions({ service: 'users' }),
  ],
  find: [
    globalHooks.filterByCurrentUser
  ],
  get: [],
  create: [
    // globalHooks.populateUser,
    globalHooks.addUser
  ],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
