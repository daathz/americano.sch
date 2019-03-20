const moment = require('moment')

module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.events = [
      {
        _id: 1, start: moment('2019-02-17').format('YYYY-MM-DD HH:mm'),
        end: moment('2019-03-28').format('YYYY-MM-DD HH:mm'),
        numberOfOrders: 6
      }
    ]
    return next()
  }
}