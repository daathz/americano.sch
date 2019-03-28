const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('User', Schema({
  name: String,
  email: String,
  room: {
    type: Number,
    min: 1
  },
  rank: {
    type: String,
    enum: ['Customer', 'Member', 'Admin'],
    default: 'Customer'
  },
  authSchId: String
}))