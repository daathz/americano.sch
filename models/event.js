const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('Event', Schema({
  deadline: Date,
  eventStart: Date,
  eventEnd: Date,
  capacity: Number,
  foods: [{
    name: String,
    description: String,
    currentOrders: Number,
    maxOrders: Number
  }]
}))