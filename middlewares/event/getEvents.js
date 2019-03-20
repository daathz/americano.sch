const moment = require('moment')

module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.events = []
    return next()
  }
}