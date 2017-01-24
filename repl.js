#!/usr/bin/env node

'use strict';

require('dotenv').load();

const fs = require('fs');
const repl = require('repl');
const mongoose = require('mongoose');

const ENV = process.env.NODE_ENV;
const APPNAME = require('./package.json').name;
const MONGO_URI = process.env.MONGO_URI;
const MONGO_CERT = process.env.MONGO_CERT;

if (!MONGO_URI) {
  throw new Error('MONGO_URI undefined');
}

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

mongoose.connection.on('connected', function() {
  const r = repl.start({
    prompt: APPNAME + '> '
  });

  r.on('exit', function() {
    mongoose.connection.close(function() {
      process.exit(0);
    });
  });
});
