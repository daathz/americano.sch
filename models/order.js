const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('Order', {
  comment: String,
  quantity: {
    type: Number,
    min: 1
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  _food: {
    type: Schema.Types.ObjectId,
    ref: 'Food'
  }
})