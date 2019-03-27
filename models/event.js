const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('Event', Schema({
  start: Date,
  end: Date,
  orders: {
    type: Number,
    default: 0
  },
  maxOrders: {
    type: Number,
    min: 1
  }
}))