const Schema = require('mongoose').Schema
const db = require('../config/db')

module.exports = db.model('Food', Schema({
  name: String,
  description: String
}))