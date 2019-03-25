const Schema = require('mongoose').Schema
const db = require('../config/db')

const userModel = db.model('User', Schema({
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
    default: false
  }
}))

//Create admin user
userModel.findOne({email: 'super@admin.com'}, (err, user) => {
  if (!user) {
    let admin = new userModel()
    admin.email = 'super@admin.com'
    admin.name = 'Admin'
    admin.password = 'superadmin'
    admin.room = 1004
    admin.admin = true
    admin.save()
  }
})

module.exports = userModel