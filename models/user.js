const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('User', {
  name: String,
  room: {
    type: Number,
    min: 1
  },
  email: String,
  password: String,
  admin: {
    type: Boolean,
    default: false
  }
})