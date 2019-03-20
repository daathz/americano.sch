const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('Event', {
  start: Date,
  end: Date,
  orders: {
    type: Number,
    default: 0
  }
})