const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('Order', Schema({
  customer: String,
  room: String,
  comment: String,
  foods: [{
    name: String,
    quantity: {
      type: Number,
      min: 1
    }
  }],
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  _event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
}))