const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('User', {
  name: String,
  room: Number,
  email: String,
  password: String,
  admin: Boolean
})