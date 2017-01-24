'use strict';

// todos-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todosSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user', required: true, immutable: true },
  text: { type: String, required: true },
  done: { type: Boolean, required: true , 'default': false },
  status: { type: String, required: true, 'default': 'uncomplete' },
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const todosModel = mongoose.model('todo', todosSchema);

module.exports = todosModel;
