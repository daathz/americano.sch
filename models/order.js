const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('Order', Schema({
  comment: String,
  customer: String,
  room: Number,
  foods: [],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
}))