const dateFormat = require('dateformat')

module.exports = (objRepo) => {
  return (req, res, next) => {
    res.tpl.events = [
      {
        _id: 1, start: dateFormat(new Date(2019, 2, 17, 0, 0),
          'yyyy-mm-dd HH:MM'),
        end: dateFormat(new Date(2019, 3, 28, 23, 59),
          'yyyy-mm-dd HH:MM'),
        numberOfOrders: 6
      }
    ]
    return next()
  }
}