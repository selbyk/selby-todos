'use strict';
const fs = require('fs');
const user = require('./user');
const authentication = require('./authentication');
const todos = require('./todos');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  const MONGO_URI = app.get('mongodb').uri;
  const MONGO_CERT = app.get('mongodb').cert;

  console.log(MONGO_URI, MONGO_CERT);

  let opts = {
    db: {
      native_parser: true
    },
    mongos: {
      socketOptions: {
        keepAlive: 120,
        connectTimeoutMS: 30000
      }
    }
  };

  if (MONGO_CERT) {
    opts.mongos.ssl = true;
    opts.mongos.sslCA = fs.readFileSync(MONGO_CERT);
  }

  mongoose.connect(MONGO_URI, opts);
  mongoose.Promise = global.Promise;

  app.configure(user);
  app.configure(authentication);
  app.configure(todos);
};
