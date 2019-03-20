const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/americano', { useNewUrlParser: true })

module.exports = mongoose