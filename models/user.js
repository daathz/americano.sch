const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('User', Schema({
  name: String,
  room: {
    type: Number,
    min: 1
  },
  email: String,
  password: String,
  admin: {
    type: Boolean,
    //for dev
    default: true
  }
}))